import test from 'node:test';
import assert from 'node:assert/strict';
import { quizData } from '../src/data/questions.js';
import { emptyState, isUnlocked, quizReducer, questionFor, statistics,
  serializeState, restoreState } from '../src/lib/quiz.js';

function answerCurrent(state, correct = true) {
  const question = questionFor(state.session.ids[state.session.index]);
  if (question.type === 'drag-drop') {
    const target = correct ? question.correctOrder : [...question.correctOrder].reverse();
    for (let index = 0; index < target.length; index++) {
      const from = state.session.orders[question.id].indexOf(target[index]);
      state = quizReducer(state, { type: 'order', from, to: index });
    }
    return quizReducer(state, { type: 'answer' });
  }
  return quizReducer(state, { type: 'answer', answer: correct ? question.correctAnswer :
    question.options.find(option => option !== question.correctAnswer) });
}

function finish(state, level, correctCount) {
  state = quizReducer(state, { type: 'start', level });
  for (let i = 0; i < 10; i++) {
    state = answerCurrent(state, i < correctCount);
    state = quizReducer(state, { type: 'next' });
  }
  return state;
}

test('question bank has 30 unique, answerable questions', () => {
  const all = Object.values(quizData).flat();
  assert.equal(all.length, 30);
  assert.equal(new Set(all.map(q => q.id)).size, 30);
  for (const questions of Object.values(quizData)) {
    assert.equal(questions.length, 10);
    for (const q of questions) {
      if (q.type === 'multiple-choice') {
        assert(q.options.includes(q.correctAnswer));
        assert.equal(new Set(q.options).size, q.options.length);
      } else assert.deepEqual([...q.items].sort(), [...q.correctOrder].sort());
    }
  }
});

test('locked levels cannot be started', () => {
  const state = emptyState();
  assert.equal(quizReducer(state, { type: 'start', level: 'medium' }), state);
  assert.equal(quizReducer(state, { type: 'start', level: 'unknown' }), state);
});

test('six answers fails; seven passes and unlocks the next level', () => {
  const failed = finish(emptyState(), 'easy', 6);
  assert.equal(failed.screen, 'results');
  assert.equal(isUnlocked('medium', failed.completed), false);
  const passed = finish(emptyState(), 'easy', 7);
  assert.equal(statistics(passed.session).score, 7);
  assert.equal(isUnlocked('medium', passed.completed), true);
});

test('returning to Beginner does not relock completed levels or erase best scores', () => {
  let state = finish(emptyState(), 'easy', 10);
  state = finish(state, 'medium', 8);
  state = finish(state, 'easy', 2);
  assert.equal(isUnlocked('impossible', state.completed), true);
  assert.equal(state.bestScores.easy, 10);
  assert.equal(state.bestScores.medium, 8);
});

test('repeated submissions and revisiting questions cannot inflate scores', () => {
  let state = quizReducer(emptyState(), { type: 'start', level: 'easy' });
  state = answerCurrent(state);
  assert.equal(statistics(state.session).score, 1);
  assert.equal(quizReducer(state, { type: 'answer', answer: 'anything' }), state);
  state = quizReducer(state, { type: 'next' });
  state = quizReducer(state, { type: 'previous' });
  assert.equal(statistics(state.session).score, 1);
  assert.equal(answerCurrent(state), state);
});

test('Next is blocked until submission and wrong answers reset the streak', () => {
  let state = quizReducer(emptyState(), { type: 'start', level: 'easy' });
  assert.equal(quizReducer(state, { type: 'next' }), state);
  state = answerCurrent(state);
  state = quizReducer(state, { type: 'next' });
  state = answerCurrent(state);
  assert.equal(statistics(state.session).streak, 2);
  state = quizReducer(state, { type: 'next' });
  state = answerCurrent(state, false);
  assert.equal(statistics(state.session).streak, 0);
});

test('refresh restores active answers, order, position and completed levels', () => {
  let state = finish(emptyState(), 'easy', 8);
  state = quizReducer(state, { type: 'start', level: 'medium' });
  state = answerCurrent(state);
  state = quizReducer(state, { type: 'next' });
  assert.deepEqual(restoreState(serializeState(state)), state);
});

test('corrupted, obsolete, and invalid saved sessions are handled safely', () => {
  assert.deepEqual(restoreState('not json'), emptyState());
  assert.deepEqual(restoreState('{"version":1}'), emptyState());
  const state = quizReducer(emptyState(), { type: 'start', level: 'easy' });
  state.session.ids[0] = 'missing';
  assert.equal(restoreState(serializeState(state)).session, null);
});

test('ordering rejects out-of-bounds moves and stays fixed after submission', () => {
  let state = quizReducer(emptyState(), { type: 'start', level: 'easy' });
  const index = state.session.ids.findIndex(id => questionFor(id).type === 'drag-drop');
  state.session.index = index;
  assert.equal(quizReducer(state, { type: 'order', from: -1, to: 0 }), state);
  state = answerCurrent(state);
  assert.equal(quizReducer(state, { type: 'order', from: 0, to: 1 }), state);
});

test('all levels can be passed; reset clears saved progress', () => {
  let state = emptyState();
  for (const level of ['easy', 'medium', 'impossible']) state = finish(state, level, 10);
  assert.deepEqual(state.completed, ['easy', 'medium', 'impossible']);
  assert.deepEqual(restoreState(serializeState(state)), state);
  assert.deepEqual(quizReducer(state, { type: 'reset' }), emptyState());
});

test('saving after the last answer still allows resuming and finishing', () => {
  let state = quizReducer(emptyState(), { type: 'start', level: 'easy' });
  for (let i = 0; i < 10; i++) {
    state = answerCurrent(state);
    if (i < 9) state = quizReducer(state, { type: 'next' });
  }
  state = quizReducer(state, { type: 'levels' });
  state = restoreState(serializeState(state));
  state = quizReducer(state, { type: 'resume' });
  assert.equal(state.screen, 'quiz');
  state = quizReducer(state, { type: 'next' });
  assert.equal(state.screen, 'results');
  assert(state.completed.includes('easy'));
});

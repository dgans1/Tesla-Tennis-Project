import { quizData } from '../data/questions.js';

export const LEVELS = [
  { id: 'easy', name: 'Beginner', description: 'Scoring, serving, and court basics' },
  { id: 'medium', name: 'Intermediate', description: 'Deuce, tiebreaks, and doubles' },
  { id: 'impossible', name: 'Pro Level', description: 'Advanced rules and match situations' },
];
export const PASS_SCORE = 7;
export const STORAGE_KEY = 'tennis-rules-progress-v2';

export function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function isUnlocked(level, completed) {
  const index = LEVELS.findIndex(item => item.id === level);
  return index === 0 || (index > 0 && completed.includes(LEVELS[index - 1].id));
}

export function emptyState() {
  return { screen: 'levels', completed: [], bestScores: {}, session: null };
}

export function questionFor(id) {
  return Object.values(quizData).flat().find(question => question.id === id);
}

export function isCorrect(question, answer) {
  if (question.type === 'multiple-choice') return answer === question.correctAnswer;
  return Array.isArray(answer) && answer.length === question.correctOrder.length &&
    answer.every((item, index) => item === question.correctOrder[index]);
}

export function statistics(session) {
  if (!session) return { score: 0, streak: 0, answered: 0 };
  let score = 0;
  let streak = 0;
  let answered = 0;
  for (const id of session.ids) {
    if (!Object.hasOwn(session.answers, id)) continue;
    answered++;
    if (isCorrect(questionFor(id), session.answers[id])) { score++; streak++; }
    else streak = 0;
  }
  return { score, streak, answered };
}

export function quizReducer(state, action) {
  const session = state.session;
  switch (action.type) {
    case 'start': {
      if (!isUnlocked(action.level, state.completed)) return state;
      const questions = quizData[action.level];
      return { ...state, screen: 'quiz', session: {
        level: action.level, ids: shuffle(questions.map(q => q.id)),
        index: 0, finished: false, answers: {}, orders: Object.fromEntries(questions
          .filter(q => q.type === 'drag-drop').map(q => [q.id, shuffle(q.items)])),
      } };
    }
    case 'order': {
      if (state.screen !== 'quiz' || !session) return state;
      const id = session.ids[session.index];
      if (Object.hasOwn(session.answers, id) || questionFor(id).type !== 'drag-drop') return state;
      const order = [...session.orders[id]];
      if (!Number.isInteger(action.from) || !Number.isInteger(action.to) ||
          action.from < 0 || action.to < 0 || action.from >= order.length || action.to >= order.length) return state;
      const [item] = order.splice(action.from, 1);
      order.splice(action.to, 0, item);
      return { ...state, session: { ...session, orders: { ...session.orders, [id]: order } } };
    }
    case 'answer': {
      if (state.screen !== 'quiz' || !session) return state;
      const id = session.ids[session.index];
      if (Object.hasOwn(session.answers, id)) return state;
      const question = questionFor(id);
      const answer = question.type === 'drag-drop' ? [...session.orders[id]] : action.answer;
      if (question.type === 'multiple-choice' && !question.options.includes(answer)) return state;
      return { ...state, session: { ...session, answers: { ...session.answers, [id]: answer } } };
    }
    case 'previous':
      return state.screen === 'quiz' && session && session.index > 0
        ? { ...state, session: { ...session, index: session.index - 1 } } : state;
    case 'next': {
      if (state.screen !== 'quiz' || !session || !Object.hasOwn(session.answers, session.ids[session.index])) return state;
      if (session.index < session.ids.length - 1)
        return { ...state, session: { ...session, index: session.index + 1 } };
      const { score, answered } = statistics(session);
      if (answered !== session.ids.length) return state;
      return { ...state, screen: 'results', session: { ...session, finished: true },
        completed: score >= PASS_SCORE ? [...new Set([...state.completed, session.level])] : state.completed,
        bestScores: { ...state.bestScores, [session.level]: Math.max(state.bestScores[session.level] || 0, score) },
      };
    }
    case 'levels': return { ...state, screen: 'levels' };
    case 'resume': return session && !session.finished ? { ...state, screen: 'quiz' } : state;
    case 'reset': return emptyState();
    default: return state;
  }
}

// Reject obsolete or malformed saves instead of crashing the learning screen.
export function restoreState(raw) {
  try {
    const saved = JSON.parse(raw);
    if (saved?.version !== 2) return emptyState();
    const state = saved.state;
    if (!['levels', 'quiz', 'results'].includes(state.screen) ||
        !Array.isArray(state.completed) || !state.bestScores || typeof state.bestScores !== 'object') return emptyState();
    const completed = [];
    for (const level of LEVELS) {
      if (!state.completed.includes(level.id)) break;
      completed.push(level.id);
    }
    const bestScores = {};
    for (const level of LEVELS) {
      const score = state.bestScores[level.id];
      if (Number.isInteger(score) && score >= 0 && score <= quizData[level.id].length) bestScores[level.id] = score;
    }
    const session = state.session;
    const base = { screen: 'levels', completed, bestScores, session: null };
    if (!session) return base;
    const expected = quizData[session.level];
    if (!expected || typeof session.finished !== 'boolean' || !isUnlocked(session.level, completed) || !Array.isArray(session.ids) ||
        session.ids.length !== expected.length || new Set(session.ids).size !== expected.length ||
        session.ids.some(id => !expected.some(q => q.id === id)) ||
        !Number.isInteger(session.index) || session.index < 0 || session.index >= expected.length ||
        !session.answers || !session.orders) return base;
    for (const question of expected) {
      const order = session.orders[question.id];
      if (question.type === 'drag-drop' && (!Array.isArray(order) ||
          order.length !== question.items.length || new Set(order).size !== question.items.length ||
          order.some(item => !question.items.includes(item)))) return base;
      if (Object.hasOwn(session.answers, question.id)) {
        const answer = session.answers[question.id];
        if (question.type === 'multiple-choice' ? !question.options.includes(answer) :
          !Array.isArray(answer) || answer.length !== question.items.length ||
          new Set(answer).size !== question.items.length || answer.some(item => !question.items.includes(item))) return base;
      }
    }
    if (Object.keys(session.answers).some(id => !session.ids.includes(id))) return base;
    // Navigation permits only an answered prefix followed by the current question.
    let gap = false;
    for (const id of session.ids) {
      if (!Object.hasOwn(session.answers, id)) gap = true;
      else if (gap) return base;
    }
    if (session.ids.slice(0, session.index).some(id => !Object.hasOwn(session.answers, id))) return base;
    if (session.finished && statistics(session).answered !== session.ids.length) return base;
    if (state.screen === 'results' && !session.finished) return base;
    if (state.screen === 'quiz' && session.finished) return base;
    return { ...base, screen: state.screen, session };
  } catch { return emptyState(); }
}

export function serializeState(state) {
  return JSON.stringify({ version: 2, state });
}

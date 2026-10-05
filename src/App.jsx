import React, { useEffect, useReducer, useRef, useState } from 'react';
import QuestionCard from './components/QuestionCard';
import { LEVELS, PASS_SCORE, STORAGE_KEY, emptyState, isUnlocked, questionFor,
  quizReducer, restoreState, serializeState, statistics, isCorrect } from './lib/quiz';
import './App.css';

function loadProgress() {
  try { return restoreState(localStorage.getItem(STORAGE_KEY)); }
  catch { return emptyState(); }
}

export default function App() {
  const [state, dispatch] = useReducer(quizReducer, undefined, loadProgress);
  const [saveError, setSaveError] = useState(false);
  const heading = useRef(null);
  const { session } = state;
  const stats = statistics(session);
  const levelIndex = session ? LEVELS.findIndex(level => level.id === session.level) : -1;
  const nextLevel = LEVELS[levelIndex + 1];
  const current = session ? questionFor(session.ids[session.index]) : null;
  const answered = current && Object.hasOwn(session.answers, current.id);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, serializeState(state)); setSaveError(false); }
    catch { setSaveError(true); }
  }, [state]);

  useEffect(() => { heading.current?.focus(); }, [state.screen, session?.index, session?.level]);

  const start = level => dispatch({ type: 'start', level });
  return <main className="quiz-container">
    <header>
      <p className="eyebrow">Learn • Practice • Improve</p>
      <h1 ref={heading} tabIndex={-1}>Tennis Rules Challenge 🎾</h1>
      <p>Three levels. Ten questions each. Score {PASS_SCORE}/10 to advance.</p>
    </header>
    {saveError && <p role="status">Progress cannot be saved in this browser. You can still play this session.</p>}

    {state.screen === 'levels' && <>
      {session && !session.finished && <button className="primary" onClick={() => dispatch({ type: 'resume' })}>Resume {LEVELS[levelIndex].name} quiz</button>}
      <div className="level-grid">{LEVELS.map(level => {
        const unlocked = isUnlocked(level.id, state.completed);
        return <button className="level-card" key={level.id} disabled={!unlocked} onClick={() => start(level.id)}>
          <strong>{level.name} {state.completed.includes(level.id) ? '✓ Completed' : !unlocked ? '🔒 Locked' : ''}</strong>
          <span>{level.description}</span>
          <span>{unlocked ? '10 questions · Start quiz' : 'Pass the previous level to unlock'}</span>
          {Object.hasOwn(state.bestScores, level.id) && <span>Best score: {state.bestScores[level.id]}/10</span>}
        </button>;
      })}</div>
      <p className="muted">Progress is saved on this browser. Streaks count consecutive correct answers within a quiz.</p>
      <button className="secondary" onClick={() => {
        if (window.confirm('Reset all saved progress, best scores, and unlocked levels?')) dispatch({ type: 'reset' });
      }}>Reset progress</button>
    </>}

    {state.screen === 'quiz' && current && <>
      <div className="quiz-meta">
        <strong>{LEVELS[levelIndex].name}</strong>
        <span>Question {session.index + 1} of {session.ids.length}</span>
        <span>Score: {stats.score} · Streak: {stats.streak}</span>
      </div>
      <label className="progress-label">Answered: {stats.answered}/{session.ids.length}
        <progress max={session.ids.length} value={stats.answered} />
      </label>
      {stats.streak >= 5 && <p className="streak">🔥 {stats.streak} correct in a row!</p>}
      <QuestionCard key={current.id} question={current} answer={session.answers[current.id]} answered={Boolean(answered)}
        order={session.orders[current.id] || []}
        onAnswer={answer => dispatch({ type: 'answer', answer })}
        onMove={(from, to) => dispatch({ type: 'order', from, to })} />
      <nav className="actions" aria-label="Quiz navigation">
        <button disabled={session.index === 0} onClick={() => dispatch({ type: 'previous' })}>Previous</button>
        <button className="primary" disabled={!answered} onClick={() => dispatch({ type: 'next' })}>
          {session.index === session.ids.length - 1 ? 'Finish Quiz' : 'Next'}
        </button>
        <button onClick={() => dispatch({ type: 'levels' })}>Save & exit</button>
      </nav>
    </>}

    {state.screen === 'results' && session && <>
      <h2>{LEVELS[levelIndex].name}: {stats.score >= PASS_SCORE ? 'Level passed! 🏆' : 'Keep practicing'}</h2>
      <p>You scored <strong>{stats.score}/{session.ids.length}</strong>. Best score: {state.bestScores[session.level]}/10.</p>
      {stats.score >= PASS_SCORE && !nextLevel && <p>You completed all three levels. Great work!</p>}
      <div className="actions">
        {stats.score >= PASS_SCORE && nextLevel && <button className="primary" onClick={() => start(nextLevel.id)}>Next Level: {nextLevel.name}</button>}
        <button onClick={() => start(session.level)}>Try Again</button>
        <button onClick={() => dispatch({ type: 'levels' })}>Level Selection</button>
      </div>
      <h2>Review your answers</h2>
      {session.ids.map((id, index) => {
        const q = questionFor(id);
        const answer = session.answers[id];
        return <article className="review-card" key={id}>
          <h3>{index + 1}. {q.question}</h3>
          <p><strong>{isCorrect(q, answer) ? '✓ Correct' : '✗ Incorrect'}</strong></p>
          <p>Your answer: {Array.isArray(answer) ? answer.join(' → ') : answer}</p>
          <p>Correct answer: {q.type === 'drag-drop' ? q.correctOrder.join(' → ') : q.correctAnswer}</p>
          <p>{q.explanation}</p>
        </article>;
      })}
    </>}
    <footer><a href="https://www.itftennis.com/en/about-us/governance/rules-and-regulations/?type=rules" target="_blank" rel="noreferrer">Explore official tennis rules</a></footer>
  </main>;
}


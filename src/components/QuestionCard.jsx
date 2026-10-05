import React from 'react';
import OrderingQuestion from './OrderingQuestion';
import { isCorrect } from '../lib/quiz';

export default function QuestionCard({ question, answer, answered, order, onAnswer, onMove }) {
  const correct = answered && isCorrect(question, answer);
  return <section aria-labelledby="question-title">
    <h2 id="question-title">{question.question}</h2>
    {question.type === 'multiple-choice'
      ? <div className="answers">{question.options.map(option => <button type="button" key={option}
          disabled={answered} onClick={() => onAnswer(option)}
          className={answered && option === question.correctAnswer ? 'answer-correct' : answered && option === answer ? 'answer-wrong' : ''}>
          {option}{answered && option === question.correctAnswer ? ' ✓ Correct answer' : answered && option === answer ? ' — Your answer' : ''}
        </button>)}</div>
      : <OrderingQuestion items={order} disabled={answered} onMove={onMove} onSubmit={() => onAnswer()}
          correctOrder={answered ? question.correctOrder : null} />}
    {answered && <div className="feedback" role="status">
      <strong>{correct ? 'Correct!' : 'Not quite. Review the explanation below.'}</strong>
      <p>{question.explanation}</p>
      {question.sourceRule && <a href="https://www.itftennis.com/media/7221/2026-rules-of-tennis-english.pdf" target="_blank" rel="noreferrer">ITF Rules: {question.sourceRule}</a>}
    </div>}
  </section>;
}

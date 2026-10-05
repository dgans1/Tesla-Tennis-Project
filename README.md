# Tennis Rules Challenge 🎾

An interactive React application that helps users learn tennis rules through multi-level quizzes, instant feedback, progress tracking, and consecutive-answer streaks.

From basic scoring to tournament scenarios, Tennis Rules Challenge makes learning engaging through multiple-choice questions, drag-and-drop exercises, and detailed answer explanations.

## Features

- **Three difficulty levels:** Beginner, Intermediate, and Pro Level.
- **30 questions:** 10 questions per level, shuffled on each attempt.
- **Interactive exercises:** Multiple-choice and drag-and-drop ordering questions.
- **Instant feedback:** Answer explanations appear immediately after submission.
- **Score-based progression:** Score at least **7/10** to advance.
- **Streak tracking:** Build a streak with consecutive correct answers.
- **Question navigation:** Revisit previously answered questions.
- **Answer review:** Review your responses, correct answers, and explanations after each quiz.
- **Tennis-themed interface:** Custom styling, animations, and level-completion celebrations.

## Quiz Levels

| Level | Focus | Questions | Passing Score |
| --- | --- | --- | --- |
| Beginner | Basic scoring, serving, court terminology, and equipment | 10 | 7/10 |
| Intermediate | Deuce, advantage, tiebreaks, doubles, and match scenarios | 10 | 7/10 |
| Pro Level | Tournament scenarios, hindrance, line calling, and wheelchair tennis | 10 | 7/10 |

## How It Works

1. Select **Beginner** to start.
2. Choose an answer or arrange items and select **Check Answer**.
3. Read the explanation and select **Next**.
4. Select **Finish Quiz** after the final question.
5. Review your results.
6. Score at least **7/10** and select **Next Level** to advance, or retry to improve your score.

Correct answers increase your streak, while incorrect answers reset it. A special message appears after five consecutive correct answers.

Progress, best scores, completed levels, and the active quiz are saved on this browser using localStorage. Use Save & exit to return later, or Reset progress to start over. Saving may be unavailable when a browser blocks local storage.

## Tech Stack

| Technology | Purpose |
| --- | --- |
| React 18 | Component-based UI and state management |
| JavaScript / JSX | Quiz logic and interactive rendering |
| Vite 6 | Development server and production builds |
| CSS | Layout, styling, and animations |
| HTML Drag and Drop API | Ordering exercises |

Ordering exercises support native drag events plus Move up and Move down buttons for keyboard and touch interaction.

## Getting Started

### Prerequisites

- Node.js 22.x
- npm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/dgans1/Tesla-Tennis-Project.git
cd Tesla-Tennis-Project
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal.

### Production Build

```bash
npm run build
```

The production files are generated in `dist/`.

Preview the production build locally:

```bash
npm run preview
```

### Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |
| `npm test` | Run the quiz logic tests |

The application does not require a backend, API keys, or environment variables. Styling uses system fonts and local CSS.

## Project Structure

| Path | Description |
| --- | --- |
| `src/App.jsx` | Application screens, persistence, and reducer integration |
| `src/data/questions.js` | 30 questions organized by level |
| `src/lib/quiz.js` | Scoring, progression, state transitions, and save validation |
| `src/components/QuestionCard.jsx` | Answer controls and explanations |
| `src/components/OrderingQuestion.jsx` | Drag, keyboard, and touch ordering controls |
| `tests/quiz.test.js` | Node tests for quiz logic and persistence |
| `src/App.css` | Application styles and animations |
| `src/index.jsx` | React entry point |
| `public/` | Static SVG assets |
| `index.html` | HTML shell |
| `vite.config.js` | Vite configuration |
| `package.json` | Dependencies and scripts |

## Implementation Highlights

- A React reducer owns scoring, progression, answer submission, and navigation.
- Completed levels are stored separately from the active level.
- Structured saves are validated before restoration.
- Reusable components live outside App.
- Scores are derived from submitted answers, preventing double-counting.
- Ordering exercises include named buttons, announcements, and focus management.
- Styles adapt to small screens and respect reduced-motion preferences.

## Testing

Run `npm test` and `npm run build`. Tests cover pass/fail boundaries, retained unlocks, duplicate submissions, streak resets, save restoration, invalid saves, ordering bounds, reset, and completion.

## Rules Reference

Selected ambiguous questions were replaced or clarified using the [ITF Rules of Tennis 2026](https://www.itftennis.com/media/7221/2026-rules-of-tennis-english.pdf). Tournament-specific formats can differ.

## Potential Improvements

- Add a live demo and screenshots.
- Add browser-level interaction tests.
- Expand question coverage and document event-specific formats.

## Author

**Devyn Gans**

[GitHub Profile](https://github.com/dgans1)


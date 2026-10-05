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

Progress is tracked during the current session. Refreshing the page resets scores, streaks, and level state.

## Tech Stack

| Technology | Purpose |
| --- | --- |
| React 18 | Component-based UI and state management |
| JavaScript / JSX | Quiz logic and interactive rendering |
| Vite 6 | Development server and production builds |
| CSS | Layout, styling, and animations |
| HTML Drag and Drop API | Ordering exercises |

The ordering interface uses custom components and native browser drag events. Although `react-beautiful-dnd` is included in the dependencies, it is not used by the rendered ordering exercises.

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

The current application does not require a backend, API keys, or environment variables. Its stylesheet loads a Google Font and an external background texture.

## Project Structure

| Path | Description |
| --- | --- |
| `src/App.jsx` | Quiz data, application state, scoring, navigation, and drag-and-drop components |
| `src/App.css` | Application styles and animations |
| `src/index.jsx` | React entry point |
| `public/` | Static SVG assets |
| `index.html` | HTML shell |
| `vite.config.js` | Vite configuration |
| `package.json` | Dependencies and scripts |

## Implementation Highlights

- Uses React's `useState` to manage quiz levels, scores, streaks, answers, and navigation.
- Uses `useEffect` to update streak messages and initialize ordering exercises.
- Organizes questions by difficulty in a structured question bank.
- Shuffles question order when a quiz starts.
- Uses custom `DraggableItem` and `DroppableArea` components for ordering interactions.
- Prevents previously submitted answers from being answered again.

The quiz data, screens, and custom components currently live together in `src/App.jsx`.

## Potential Improvements

- Extract reusable components and quiz data into separate modules.
- Save progress between visits.
- Track completed levels independently of the currently selected level.
- Add keyboard and touch controls for ordering questions.
- Add automated tests for scoring and level progression.
- Review question accuracy and tournament-specific rules.
- Update introductory wording to match the implemented 7/10 passing requirement.

## Author

**Devyn Gans**

[GitHub Profile](https://github.com/dgans1)

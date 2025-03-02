
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';

// Tennis quiz data organized by level
const quizData = {
  easy: [
    {
      id: "e1",
      question: "What does 'Love' mean in tennis scoring?",
      options: ["Zero points", "One point", "Game point", "Match point"],
      correctAnswer: "Zero points",
      explanation: "In tennis, 'Love' is the term used for a score of zero. The origin is believed to come from the French word 'l'oeuf' (the egg), which looks like a zero.",
      type: "multiple-choice"
    },
    {
      id: "e2",
      question: "You're playing your first tennis match. What is the correct sequence of points in a standard game?",
      options: ["0, 15, 30, 40, Game", "1, 2, 3, 4, Game", "Love, 15, 30, 45, Game", "0, 10, 20, 30, Game"],
      correctAnswer: "0, 15, 30, 40, Game",
      explanation: "Tennis has a unique scoring system where points increase from 0 (love) to 15, then 30, then 40, and finally game point.",
      type: "multiple-choice"
    },
    {
      id: "e3",
      question: "You and your opponent each have won 3 games in a set. What's the current score?",
      options: ["3-3", "30-30", "Deuce", "Tie"],
      correctAnswer: "3-3",
      explanation: "Game scores are counted separately from points. When both players have won 3 games, the score is simply 3-3.",
      type: "multiple-choice"
    },
    {
      id: "e4",
      question: "What happens when a served ball hits the net but still lands in the service box?",
      options: ["It's a 'let' and the server serves again", "The receiver gets the point", "The server loses the point", "The point is split"],
      correctAnswer: "It's a 'let' and the server serves again",
      explanation: "This is called a 'let' serve. The serve doesn't count and is replayed, with no penalty to either player.",
      type: "multiple-choice"
    },
    {
      id: "e5",
      question: "Place the following tennis court lines in order from the net to the back of the court:",
      items: ["Service line", "Center mark", "Net", "Baseline"],
      type: "drag-drop",
      correctOrder: ["Net", "Center mark", "Service line", "Baseline"],
      explanation: "The net divides the court, followed by the center mark (on the service line), then the service line, and finally the baseline at the back of the court."
    },
    {
      id: "e6",
      question: "How many sets must you win to win a standard tennis match?",
      options: ["1 set", "2 sets", "3 sets", "5 sets"],
      correctAnswer: "2 sets",
      explanation: "In a standard tennis match, you need to win 2 out of 3 sets to win the match. In Grand Slam men's matches, it's 3 out of 5 sets.",
      type: "multiple-choice"
    },
    {
      id: "e7",
      question: "What is the area called where the server stands to serve?",
      options: ["Service box", "Baseline", "Deuce court", "Service area"],
      correctAnswer: "Service area",
      explanation: "The server stands in what's called the service area, behind the baseline, to serve the ball.",
      type: "multiple-choice"
    },
    {
      id: "e8",
      question: "When serving, where must the ball land to be considered 'in'?",
      options: ["Anywhere in the opponent's court", "In the service box diagonally opposite", "On the center line", "Beyond the baseline"],
      correctAnswer: "In the service box diagonally opposite",
      explanation: "When serving, the ball must land in the service box that is diagonally opposite from where the server is standing.",
      type: "multiple-choice"
    },
    {
      id: "e9",
      question: "What happens if a player touches the net with their racket during play?",
      options: ["The point continues", "The player loses the point", "The point is replayed", "The player gets a warning"],
      correctAnswer: "The player loses the point",
      explanation: "If a player touches the net with any part of their body or racket during a point, they automatically lose that point.",
      type: "multiple-choice"
    },
    {
      id: "e10",
      question: "Place these tennis equipment items in order of their typical introduction to beginners:",
      items: ["Tennis shoes", "Tennis racket", "Tennis ball", "Tennis strings"],
      type: "drag-drop",
      correctOrder: ["Tennis shoes", "Tennis racket", "Tennis ball", "Tennis strings"],
      explanation: "Typically, beginners start with proper footwear (tennis shoes), then get a suitable racket, learn to handle the ball, and only later worry about string types."
    }
  ],
  medium: [
    {
      id: "m1",
      question: "You're serving at deuce (40-40). Your opponent wins the next point. What happens?",
      options: ["They win the game", "It goes to Advantage Receiver", "The point must be replayed", "You win the game"],
      correctAnswer: "It goes to Advantage Receiver",
      explanation: "At deuce (40-40), a player must win two consecutive points to win the game. When the receiver wins the first point after deuce, they have 'Advantage' (Ad-in).",
      type: "multiple-choice"
    },
    {
      id: "m2",
      question: "You're in a tiebreak at 6-6. You win the next point. What's the situation?",
      options: ["You win the tiebreak", "The score is now 7-6", "The tiebreak continues", "The match is over"],
      correctAnswer: "The score is now 7-6",
      explanation: "In a tiebreak, you need to reach at least 7 points AND have a 2-point lead to win. At 7-6, you have match point but need one more point to win.",
      type: "multiple-choice"
    },
    {
      id: "m3",
      question: "During a rally, your shot hits the net cord and bounces over, landing in your opponent's court. What happens?",
      options: ["The point continues", "It's a let and is replayed", "You lose the point", "Your opponent loses the point"],
      correctAnswer: "The point continues",
      explanation: "Unlike with serves, if a shot during a rally hits the net and goes over, the point continues. This is called a 'net cord' shot and is perfectly legal.",
      type: "multiple-choice"
    },
    {
      id: "m4",
      question: "You're playing a match and the score is 5-3 in your favor. You win the next game. What happens?",
      options: ["You win the set", "The score becomes 6-3", "You win the match", "A tiebreak starts"],
      correctAnswer: "You win the set",
      explanation: "To win a standard set, you need to win 6 games with at least a 2-game advantage. When the score is 5-3 and you win the next game (making it 6-3), you win the set.",
      type: "multiple-choice"
    },
    {
      id: "m5",
      question: "Arrange these tennis scoring terms in the correct sequence within a game:",
      items: ["Game point", "Deuce", "30-15", "Advantage"],
      type: "drag-drop",
      correctOrder: ["30-15", "Deuce", "Advantage", "Game point"],
      explanation: "In a typical progression, 30-15 would come first, then potentially deuce (40-40), followed by advantage for one player, and finally game point."
    },
    {
      id: "m6",
      question: "You're playing a match where it's 6-6 in the first set. What happens next in a standard tournament?",
      options: ["The match is a draw", "You play a tiebreak", "You play until someone leads by 2 games", "The set is replayed"],
      correctAnswer: "You play a tiebreak",
      explanation: "In most modern tennis formats, when a set reaches 6-6, players compete in a tiebreak to decide the set winner, typically the first to reach 7 points with a 2-point lead.",
      type: "multiple-choice"
    },
    {
      id: "m7",
      question: "Your opponent hits a ball that lands on the line. You call it out, but the umpire overrules. What happens?",
      options: ["The point is awarded to your opponent", "The point is replayed", "You lose a point penalty", "The call stands"],
      correctAnswer: "The point is awarded to your opponent",
      explanation: "If an umpire overrules an 'out' call and determines the ball was actually 'in', then the point is awarded to your opponent.",
      type: "multiple-choice"
    },
    {
      id: "m8",
      question: "What is the minimum number of points needed to win a standard tiebreak game?",
      options: ["6 points", "7 points", "10 points", "12 points"],
      correctAnswer: "7 points",
      explanation: "To win a standard tiebreak, a player needs to reach at least 7 points AND have a 2-point lead over their opponent.",
      type: "multiple-choice"
    },
    {
      id: "m9",
      question: "In doubles, where should the server's partner stand during a serve?",
      options: ["At the net", "Behind the baseline", "Anywhere they want", "Outside the court"],
      correctAnswer: "Anywhere they want",
      explanation: "In doubles, the server's partner can stand anywhere they want on their side of the court, though they typically position themselves at the net.",
      type: "multiple-choice"
    },
    {
      id: "m10",
      question: "Order these tennis match scenarios from earliest to latest in a typical tournament match:",
      items: ["Match point", "Break point", "Set point", "Deuce"],
      type: "drag-drop",
      correctOrder: ["Deuce", "Break point", "Set point", "Match point"],
      explanation: "In a typical progression, a game might reach deuce first, then potentially a break point (chance to win the opponent's service game), then set point (chance to win the set), and finally match point (chance to win the entire match)."
    }
  ],
  impossible: [
    {
      id: "i1",
      question: "In the ATP Tour Finals, if the round-robin standings show two players with equal match wins and equal sets, what's the next tiebreaker?",
      options: ["Head-to-head result", "Percentage of games won", "Number of aces served", "Coin toss"],
      correctAnswer: "Head-to-head result",
      explanation: "In the ATP Tour Finals round-robin format, if two players have equal match wins and equal sets won/lost, the head-to-head result between those players becomes the next tiebreaker.",
      type: "multiple-choice"
    },
    {
      id: "i2",
      question: "What is the 'Hawkeye' system's statistical margin of error in professional tennis?",
      options: ["1-3 mm", "3-5 mm", "5-10 mm", "More than 10 mm"],
      correctAnswer: "3-5 mm",
      explanation: "The Hawkeye line-calling system used in professional tennis has an average margin of error of approximately 3.6 mm, generally stated as 3-5 mm in technical specifications.",
      type: "multiple-choice"
    },
    {
      id: "i3",
      question: "Under ITF rules, what's the maximum time allowed between points in a standard match?",
      options: ["20 seconds", "25 seconds", "30 seconds", "35 seconds"],
      correctAnswer: "20 seconds",
      explanation: "According to International Tennis Federation (ITF) rules, players have a maximum of 20 seconds between points. (ATP uses 25 seconds, but ITF standard is 20.)",
      type: "multiple-choice"
    },
    {
      id: "i4",
      question: "What happens if a player's mobile phone rings during a point at Wimbledon?",
      options: ["The point continues", "The point is replayed", "The player loses the point", "The player receives a warning"],
      correctAnswer: "The player loses the point",
      explanation: "At Wimbledon (and under ITF rules), if a player's phone rings during a point, it's considered a deliberate hindrance, and the player loses the point immediately.",
      type: "multiple-choice"
    },
    {
      id: "i5",
      question: "Put these Grand Slam tiebreak rules in order from most traditional to most recently changed:",
      items: ["US Open final set tiebreak", "Australian Open final set tiebreak", "Wimbledon final set tiebreak", "French Open final set tiebreak"],
      type: "drag-drop",
      correctOrder: ["US Open final set tiebreak", "Australian Open final set tiebreak", "Wimbledon final set tiebreak", "French Open final set tiebreak"],
      explanation: "The US Open has used final set tiebreaks since 1970, Australia adopted it in 2019, Wimbledon in 2019 (at 12-12), and the French Open was the last to adopt it in 2022."
    },
    {
      id: "i6",
      question: "In Davis Cup doubles, when is the only time players can change the nominated team after the draw?",
      options: ["Up to one hour before the match", "If a player is injured", "After the first set", "Teams cannot be changed"],
      correctAnswer: "If a player is injured",
      explanation: "In Davis Cup, once teams are nominated, they can only be changed if a player is injured or ill, as verified by an independent medical officer, and the substitution must be made before the doubles match begins.",
      type: "multiple-choice"
    },
    {
      id: "i7",
      question: "What is the rarely invoked 'hindrance rule' when a player shouts during a rally?",
      options: ["Point is always replayed", "Player who shouted loses the point", "Depends if it was deliberate", "Warning is issued first"],
      correctAnswer: "Depends if it was deliberate",
      explanation: "Under the hindrance rule, if a player shouts during a rally, they lose the point if the umpire determines it was deliberate or intentionally timed to distract. If unintentional, the point is replayed.",
      type: "multiple-choice"
    },
    {
      id: "i8",
      question: "What is the strict interpretation of the 'double bounce rule' in wheelchair tennis?",
      options: ["The ball can bounce twice", "The ball must bounce once only", "The ball may bounce unlimited times", "The rule doesn't exist"],
      correctAnswer: "The ball can bounce twice",
      explanation: "In wheelchair tennis, the 'two-bounce rule' allows the ball to bounce twice before being returned, with the second bounce permitted either in or out of the court boundaries.",
      type: "multiple-choice"
    },
    {
      id: "i9",
      question: "Under what specific circumstance can a player legally reach over the net to hit a ball?",
      options: ["Only when the ball has already bounced on their side", "Only in doubles matches", "It's never allowed", "Only on match point"],
      correctAnswer: "Only when the ball has already bounced on their side",
      explanation: "A player can legally reach over the net to hit the ball only if it has first bounced on their side and then spun or blown back over the net due to wind or backspin.",
      type: "multiple-choice"
    },
    {
      id: "i10",
      question: "Order these events in a Grand Slam tournament from earliest to final decision:",
      items: ["Hawk-Eye challenge", "Linesperson call", "Umpire overrule", "Tournament referee intervention"],
      type: "drag-drop",
      correctOrder: ["Linesperson call", "Umpire overrule", "Hawk-Eye challenge", "Tournament referee intervention"],
      explanation: "First, a linesperson makes a call, then the chair umpire may overrule it, a player can then challenge using Hawk-Eye, and only in exceptional circumstances would the tournament referee make the final decision."
    }
  ]
};

// Shuffle array utility function
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function App() {
  // Main state variables
  const [level, setLevel] = useState('easy');
  const [currentLevelComplete, setCurrentLevelComplete] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showLevelScreen, setShowLevelScreen] = useState(true);
  const [questionQueue, setQuestionQueue] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [streakMessage, setStreakMessage] = useState('');
  const [dragItems, setDragItems] = useState([]);
  const [dragOrder, setDragOrder] = useState([]);
  const [dragAnswer, setDragAnswer] = useState(null);
  
  // Set streak message when streak changes
  useEffect(() => {
    if (streak === 0) {
      setStreakMessage('');
    } else if (streak === 5) {
      setStreakMessage("You're on fire! 🔥");
    } else if (streak > 0) {
      setStreakMessage(`${streak} correct in a row!`);
    } else {
      setStreakMessage("Keep going! 💪");
    }
  }, [streak]);

  // Initialize drag items when question type is drag-drop
  useEffect(() => {
    if (questionQueue.length > 0 && currentQuestion < questionQueue.length) {
      const question = questionQueue[currentQuestion];
      if (question.type === 'drag-drop') {
        const shuffledItems = shuffleArray([...question.items]);
        setDragItems(shuffledItems);
        setDragOrder(Array.from({ length: shuffledItems.length }, (_, i) => i));
        setDragAnswer(null);
      }
    }
  }, [currentQuestion, questionQueue]);

  // Initialize or reset the quiz for a specific level
  const initializeLevel = (selectedLevel) => {
    // Get questions for the selected level
    const levelQuestions = shuffleArray([...quizData[selectedLevel]]).slice(0, 10);
    
    setLevel(selectedLevel);
    setQuestionQueue(levelQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setShowScore(false);
    setShowLevelScreen(false);
    setAnsweredQuestions([]);
    setCurrentLevelComplete(false);
  };

  // Check drag and drop answer
  const handleDragDrop = () => {
    const currentQ = questionQueue[currentQuestion];
    const userOrder = dragOrder.map(index => dragItems[index]);
    
    // Check if the order is correct
    const isCorrect = JSON.stringify(userOrder) === JSON.stringify(currentQ.correctOrder);
    
    setDragAnswer(isCorrect);
    
    // Update score and streak
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      setStreak(prevStreak => prevStreak + 1);
      
      // Trigger correct answer animation
      const dragContainer = document.querySelector('.drag-container');
      if (dragContainer) {
        dragContainer.classList.add('correct-animation');
        setTimeout(() => {
          dragContainer.classList.remove('correct-animation');
        }, 1000);
      }
    } else {
      setStreak(0);
    }
    
    // Add to answered questions
    setAnsweredQuestions(prev => [...prev, {
      ...currentQ,
      userAnswer: userOrder,
      isCorrect
    }]);
  };

  // Handle multiple choice answer selection
  const handleAnswerClick = (selectedOption) => {
    const currentQ = questionQueue[currentQuestion];
    const selectedAnswer = currentQ.options[selectedOption];
    const isCorrect = selectedAnswer === currentQ.correctAnswer;
    
    // Update score and streak
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      setStreak(prevStreak => prevStreak + 1);
      
      // Trigger correct answer animation
      const answerButton = document.querySelectorAll('.answer-button')[selectedOption];
      if (answerButton) {
        answerButton.classList.add('correct-animation');
        setTimeout(() => {
          answerButton.classList.remove('correct-animation');
        }, 1000);
      }
    } else {
      setStreak(0);
    }
    
    // Add to answered questions
    setAnsweredQuestions(prev => [...prev, {
      ...currentQ,
      userAnswer: selectedAnswer,
      isCorrect
    }]);
  };

  // Handle next question navigation
  const handleNextClick = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questionQueue.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      // Level completed - check if player passed (need 7/10 to advance)
      const levelComplete = score >= 7; 
      setCurrentLevelComplete(levelComplete);
      setShowScore(true);
    }
  };

  // Handle going back to level selection
  const handleBackToLevels = () => {
    setShowLevelScreen(true);
    setShowScore(false);
  };

  // Try the current level again
  const retryLevel = () => {
    initializeLevel(level);
  };

  // Advance to the next level
  const advanceToNextLevel = () => {
    let nextLevel;
    if (level === 'easy') nextLevel = 'medium';
    else if (level === 'medium') nextLevel = 'impossible';
    else return; // No level after impossible
    
    initializeLevel(nextLevel);
  };

  // Get current question info
  const getCurrentQuestion = () => {
    if (questionQueue.length > 0 && currentQuestion < questionQueue.length) {
      return questionQueue[currentQuestion];
    }
    return null;
  };

  // Check if the current question has been answered
  const isCurrentQuestionAnswered = () => {
    if (questionQueue.length > 0 && currentQuestion < questionQueue.length) {
      const currentId = questionQueue[currentQuestion].id;
      return answeredQuestions.some(q => q.id === currentId);
    }
    return false;
  };

  // Get the answer for the current question
  const getCurrentAnswer = () => {
    if (questionQueue.length > 0 && currentQuestion < questionQueue.length) {
      const currentId = questionQueue[currentQuestion].id;
      return answeredQuestions.find(q => q.id === currentId);
    }
    return null;
  };

  // References to current state
  const currentQ = getCurrentQuestion();
  const currentAnswer = getCurrentAnswer();
  const isAnswered = isCurrentQuestionAnswered();

  // Get display name for level
  const getLevelDisplayName = (levelKey) => {
    if (levelKey === 'easy') return 'Beginner';
    if (levelKey === 'medium') return 'Intermediate';
    if (levelKey === 'impossible') return 'Pro Level';
    return levelKey;
  };

  // Get badge color class for level
  const getLevelBadgeClass = (levelKey) => {
    if (levelKey === 'easy') return 'easy';
    if (levelKey === 'medium') return 'medium';
    if (levelKey === 'impossible') return 'hard';
    return '';
  };

  // Simple Drag and Drop component to replace react-beautiful-dnd
  const DraggableItem = ({ item, index, isAnswered, isDragDisabled, moveItem, correctItem }) => {
    const [isDragging, setIsDragging] = useState(false);
    
    const handleDragStart = (e) => {
      setIsDragging(true);
      e.dataTransfer.setData('text/plain', index);
      e.dataTransfer.effectAllowed = 'move';
    };
    
    const handleDragEnd = () => {
      setIsDragging(false);
    };
    
    const handleDragOver = (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    };
    
    const handleDrop = (e) => {
      e.preventDefault();
      const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'));
      moveItem(sourceIndex, index);
    };
    
    let className = `drag-item ${isDragging ? 'dragging' : ''}`;
    if (isAnswered) {
      if (item === correctItem) {
        className += ' correct';
      } else {
        className += ' incorrect';
      }
    }
    
    return (
      <div
        className={className}
        draggable={!isDragDisabled}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {item}
        <span className="drag-handle">☰</span>
      </div>
    );
  };
  
  // Custom Droppable area component
  const DroppableArea = ({ children }) => {
    return (
      <div className="droppable-area">
        {children}
      </div>
    );
  };
  
  // Render level selection screen
  if (showLevelScreen) {
    return (
      <div className="quiz-container">
        <h1>Tennis Rules Challenge</h1>
        <p className="level-description">
          Master the rules of tennis by completing each level with a perfect score!
        </p>
        
        <div className="level-grid">
          <div className="level-card" onClick={() => initializeLevel('easy')}>
            <div className="level-badge easy">Beginner</div>
            <h3>Tennis Basics</h3>
            <p>Learn the fundamental rules and scoring of tennis</p>
            <div className="level-footer">10 questions</div>
          </div>
          
          <div className={`level-card ${level !== 'medium' && level !== 'impossible' ? 'locked' : ''}`} 
               onClick={() => level === 'medium' || level === 'impossible' ? initializeLevel('medium') : null}>
            <div className="level-badge medium">Intermediate</div>
            <h3>Advanced Rules</h3>
            <p>Tackle more complex situations and scoring scenarios</p>
            <div className="level-footer">
              {level === 'medium' || level === 'impossible' ? '10 questions' : 'Complete Beginner level first'}
            </div>
          </div>
          
          <div className={`level-card ${level !== 'impossible' ? 'locked' : ''}`} 
               onClick={() => level === 'impossible' ? initializeLevel('impossible') : null}>
            <div className="level-badge hard">Pro Level</div>
            <h3>Tournament Rules</h3>
            <p>Expert-level rules that even seasoned players might not know</p>
            <div className="level-footer">
              {level === 'impossible' ? '10 questions' : 'Complete Intermediate level first'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render score screen
  if (showScore) {
    return (
      <div className="quiz-container">
        <div className="score-section">
          <h2>{getLevelDisplayName(level)} Level {currentLevelComplete ? 'Completed!' : 'Results'}</h2>
          
          {score >= 7 ? (
            <div className="perfect-score">
              <div className="trophy">🏆</div>
              <p className="congrats-message">{score === 10 ? "PERFECT SCORE!" : "LEVEL PASSED!"}</p>
              <p>You answered {score} out of 10 questions correctly!</p>
              
              {level !== 'impossible' && (
                <div className="level-unlocked unlock-animation">
                  <div className="unlock-icon">🔓</div>
                  <p>You've unlocked the next level!</p>
                  <div className="level-badge-next">
                    {level === 'easy' ? 'INTERMEDIATE UNLOCKED' : 'PRO LEVEL UNLOCKED'}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <p className="score-result">You scored {score} out of 10</p>
              <p className="score-message">
                {score >= 7 ? "Great job! You're getting there!" : "Keep practicing to improve your knowledge!"}
              </p>
              <p className="score-requirement">You need at least 7/10 correct answers to advance to the next level.</p>
            </div>
          )}
          
          <div className="answer-review">
            <h3>Your Answers:</h3>
            {answeredQuestions.map((item, index) => (
              <div key={index} className={`answer-item ${item.isCorrect ? 'selected-correct' : 'selected-incorrect'}`}>
                <p><strong>Question {index + 1}:</strong> {item.question}</p>
                {item.type === 'multiple-choice' ? (
                  <p><strong>Correct answer:</strong> {item.correctAnswer} 
                    {item.userAnswer && <span> (Your answer: {item.userAnswer})</span>}
                  </p>
                ) : (
                  <p><strong>Correct order:</strong> {item.correctOrder.join(' → ')}
                    {item.userAnswer && <span> (Your order: {item.userAnswer.join(' → ')})</span>}
                  </p>
                )}
                <div className="explanation"><strong>Explanation:</strong> {item.explanation}</div>
              </div>
            ))}
          </div>
          
          <div className="score-actions">
            {currentLevelComplete && level !== 'impossible' ? (
              <button className="score-button next-level" onClick={advanceToNextLevel}>
                Next Level
              </button>
            ) : (
              <button className="score-button retry" onClick={retryLevel}>
                Try Again
              </button>
            )}
            
            <button className="score-button back" onClick={handleBackToLevels}>
              Level Selection
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main quiz interface
  return (
    <main className="quiz-container">
      <div className="question-section">
        <h2>
          {getLevelDisplayName(level)} Level
          <span className={`difficulty-badge ${getLevelBadgeClass(level)}`}>
            {getLevelDisplayName(level)}
          </span>
        </h2>
        
        {streak > 0 && (
          <div className={`streak-counter ${streak >= 5 ? 'streak-pulse' : ''}`}>
            <span>Streak: {streak}</span>
            {streakMessage && <div className="streak-message">{streakMessage}</div>}
          </div>
        )}
        
        <div className="question-count">
          Question {currentQuestion + 1}/10
        </div>
        
        <div className="question-text">
          {currentQ.question}
        </div>
        
        {currentQ.type === 'multiple-choice' ? (
          // Multiple choice question
          <div className="answer-options">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !isAnswered && handleAnswerClick(index)}
                className={`answer-button ${currentAnswer?.userAnswer === option ? 'selected' : ''}`}
                disabled={isAnswered}
                aria-label={`Answer option ${index + 1}: ${option}`}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          // Custom drag and drop implementation
          <div className="drag-container">
            <p>Arrange these items in the correct order by dragging and dropping:</p>
            
            <DroppableArea>
              {dragItems.length > 0 && dragOrder.map((itemIndex, orderIndex) => (
                <DraggableItem
                  key={orderIndex}
                  item={dragItems[itemIndex]}
                  index={orderIndex}
                  isAnswered={isAnswered}
                  isDragDisabled={isAnswered}
                  moveItem={(from, to) => {
                    if (isAnswered) return;
                    const newOrder = [...dragOrder];
                    const [removed] = newOrder.splice(from, 1);
                    newOrder.splice(to, 0, removed);
                    setDragOrder(newOrder);
                  }}
                  correctItem={isAnswered ? currentQ.correctOrder[orderIndex] : null}
                />
              ))}
            </DroppableArea>
            
            {!isAnswered && (
              <button 
                className="check-submission"
                onClick={handleDragDrop}
              >
                Check Answer
              </button>
            )}
          </div>
        )}
        
        {isAnswered && (
          <div className="explanation">
            <strong>Explanation:</strong> {currentQ.explanation}
          </div>
        )}
        
        <div className="navigation-buttons">
          <button 
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            disabled={currentQuestion === 0}
            className="nav-button"
          >
            Previous
          </button>
          <button 
            onClick={handleNextClick}
            disabled={!isAnswered}
            className="nav-button"
          >
            {currentQuestion === questionQueue.length - 1 ? 'Finish Quiz' : 'Next'}
          </button>
        </div>
      </div>
    </main>
  );
}

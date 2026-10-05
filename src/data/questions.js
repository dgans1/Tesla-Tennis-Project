// Reviewed against ITF Rules of Tennis 2026.
// Source: https://www.itftennis.com/media/7221/2026-rules-of-tennis-english.pdf
export const quizData = {
  "easy": [
    {
      "id": "e1",
      "question": "What does 'Love' mean in tennis scoring?",
      "options": [
        "Zero points",
        "One point",
        "Game point",
        "Match point"
      ],
      "correctAnswer": "Zero points",
      "explanation": "Love means zero points.",
      "type": "multiple-choice"
    },
    {
      "id": "e2",
      "question": "In a standard advantage game, order the scores when one player wins four straight points.",
      "options": [
        "0, 15, 30, 40, Game",
        "1, 2, 3, 4, Game",
        "Love, 15, 30, 45, Game",
        "0, 10, 20, 30, Game"
      ],
      "correctAnswer": "0, 15, 30, 40, Game",
      "explanation": "From love, the scores progress through 15, 30, 40, then game.",
      "type": "multiple-choice"
    },
    {
      "id": "e3",
      "question": "You and your opponent each have won 3 games in a set. What's the current score?",
      "options": [
        "3-3",
        "30-30",
        "Deuce",
        "Tie"
      ],
      "correctAnswer": "3-3",
      "explanation": "Game scores are counted separately from points. When both players have won 3 games, the score is simply 3-3.",
      "type": "multiple-choice"
    },
    {
      "id": "e4",
      "question": "Under standard service-let rules, a serve touches the net and lands in the correct service court. What happens?",
      "options": [
        "It's a 'let' and the server serves again",
        "The receiver gets the point",
        "The server loses the point",
        "The point is split"
      ],
      "correctAnswer": "It's a 'let' and the server serves again",
      "explanation": "This is called a 'let' serve. The serve doesn't count and is replayed, with no penalty to either player.",
      "type": "multiple-choice"
    },
    {
      "id": "e5",
      "question": "Order these positions from the net toward the back of your court:",
      "items": [
        "Net",
        "Service line",
        "Baseline",
        "Area behind the baseline"
      ],
      "correctOrder": [
        "Net",
        "Service line",
        "Baseline",
        "Area behind the baseline"
      ],
      "explanation": "Moving away from the net, you reach the service line, then the baseline, then the area behind the baseline.",
      "sourceRule": "1",
      "type": "drag-drop"
    },
    {
      "id": "e6",
      "question": "How many sets must you win in a best-of-three match?",
      "options": [
        "1 set",
        "2 sets",
        "3 sets",
        "5 sets"
      ],
      "correctAnswer": "2 sets",
      "explanation": "Two sets win a best-of-three match.",
      "type": "multiple-choice"
    },
    {
      "id": "e7",
      "question": "Where must the server stand before starting a singles service motion?",
      "options": [
        "Behind the baseline, between the centre-mark and singles-sideline extensions",
        "Inside the service box",
        "On the baseline",
        "Anywhere behind the doubles alley"
      ],
      "correctAnswer": "Behind the baseline, between the centre-mark and singles-sideline extensions",
      "explanation": "Both feet start behind the baseline within the stated boundaries.",
      "sourceRule": "16",
      "type": "multiple-choice"
    },
    {
      "id": "e8",
      "question": "When serving, where must the ball land to be considered 'in'?",
      "options": [
        "Anywhere in the opponent's court",
        "In the service box diagonally opposite",
        "In the service box directly opposite",
        "Beyond the baseline"
      ],
      "correctAnswer": "In the service box diagonally opposite",
      "explanation": "When serving, the ball must land in the service box that is diagonally opposite from where the server is standing.",
      "type": "multiple-choice"
    },
    {
      "id": "e9",
      "question": "What happens if a player touches the net with their racket during play?",
      "options": [
        "The point continues",
        "The player loses the point",
        "The point is replayed",
        "The player gets a warning"
      ],
      "correctAnswer": "The player loses the point",
      "explanation": "If a player touches the net with any part of their body or racket during a point, they automatically lose that point.",
      "type": "multiple-choice"
    },
    {
      "id": "e10",
      "question": "Starting at love-love, one player wins four straight points. Order their scores:",
      "items": [
        "15-love",
        "30-love",
        "40-love",
        "Game"
      ],
      "correctOrder": [
        "15-love",
        "30-love",
        "40-love",
        "Game"
      ],
      "explanation": "Four straight points win this standard advantage game.",
      "sourceRule": "5",
      "type": "drag-drop"
    }
  ],
  "medium": [
    {
      "id": "m1",
      "question": "You're serving at deuce (40-40). Your opponent wins the next point. What happens?",
      "options": [
        "They win the game",
        "It goes to Advantage Receiver",
        "The point must be replayed",
        "You win the game"
      ],
      "correctAnswer": "It goes to Advantage Receiver",
      "explanation": "The receiver has advantage; winning the next point wins the game. Ad-out describes receiver advantage.",
      "type": "multiple-choice"
    },
    {
      "id": "m2",
      "question": "In a seven-point tiebreak at 6-6, you win the next point. What is the score?",
      "options": [
        "7-6; play continues",
        "The tiebreak ends immediately",
        "6-6; replay the point",
        "8-6"
      ],
      "correctAnswer": "7-6; play continues",
      "explanation": "A two-point margin is required; one more point would make it 8-6.",
      "sourceRule": "5",
      "type": "multiple-choice"
    },
    {
      "id": "m3",
      "question": "During a rally, your shot hits the net cord and bounces over, landing in your opponent's court. What happens?",
      "options": [
        "The point continues",
        "It's a let and is replayed",
        "You lose the point",
        "Your opponent loses the point"
      ],
      "correctAnswer": "The point continues",
      "explanation": "Unlike with serves, if a shot during a rally hits the net and goes over, the point continues. This is called a 'net cord' shot and is perfectly legal.",
      "type": "multiple-choice"
    },
    {
      "id": "m4",
      "question": "You're playing a match and the score is 5-3 in your favor. You win the next game. What happens?",
      "options": [
        "You win the set, 6-3",
        "The set continues at 6-3",
        "A tiebreak starts",
        "You automatically win the match"
      ],
      "correctAnswer": "You win the set, 6-3",
      "explanation": "To win a standard set, you need to win 6 games with at least a 2-game advantage. When the score is 5-3 and you win the next game (making it 6-3), you win the set.",
      "type": "multiple-choice"
    },
    {
      "id": "m5",
      "question": "From deuce, you win a point, lose a point, then win two points. Order the resulting scores:",
      "items": [
        "Your advantage (first time)",
        "Back to deuce",
        "Your advantage (second time)",
        "You win the game"
      ],
      "correctOrder": [
        "Your advantage (first time)",
        "Back to deuce",
        "Your advantage (second time)",
        "You win the game"
      ],
      "explanation": "Losing an advantage returns the score to deuce.",
      "sourceRule": "5",
      "type": "drag-drop"
    },
    {
      "id": "m6",
      "question": "In a standard tiebreak set, the game score reaches 6-6. What happens?",
      "options": [
        "The match is a draw",
        "You play a tiebreak",
        "You play until someone leads by 2 games",
        "The set is replayed"
      ],
      "correctAnswer": "You play a tiebreak",
      "explanation": "A tiebreak decides this tiebreak set; advantage sets use a different format.",
      "type": "multiple-choice"
    },
    {
      "id": "m7",
      "question": "A rally ball touches a court boundary line. Is it in or out?",
      "options": [
        "In",
        "Out",
        "Always a let",
        "Only in doubles"
      ],
      "correctAnswer": "In",
      "explanation": "A ball touching the relevant boundary line is in.",
      "sourceRule": "12",
      "type": "multiple-choice"
    },
    {
      "id": "m8",
      "question": "What is the minimum number of points needed to win a standard tiebreak game?",
      "options": [
        "6 points",
        "7 points",
        "10 points",
        "12 points"
      ],
      "correctAnswer": "7 points",
      "explanation": "To win a standard tiebreak, a player needs to reach at least 7 points AND have a 2-point lead over their opponent.",
      "type": "multiple-choice"
    },
    {
      "id": "m9",
      "question": "In doubles, where should the server's partner stand during a serve?",
      "options": [
        "Only at the net",
        "Only behind the baseline",
        "Anywhere on their own side, without hindering opponents",
        "On the opponents' side"
      ],
      "correctAnswer": "Anywhere on their own side, without hindering opponents",
      "explanation": "The partner may stand inside or outside the court on their own side, without hindrance.",
      "type": "multiple-choice",
      "sourceRule": "26"
    },
    {
      "id": "m10",
      "question": "Order these milestones as the server wins the game from 15-30 and the next game begins:",
      "items": [
        "30-30",
        "40-30",
        "Game won",
        "Next game starts at love-love"
      ],
      "correctOrder": [
        "30-30",
        "40-30",
        "Game won",
        "Next game starts at love-love"
      ],
      "explanation": "Games restart at love-love.",
      "sourceRule": "5",
      "type": "drag-drop"
    }
  ],
  "impossible": [
    {
      "id": "i1",
      "question": "A rally return travels outside a net post and lands in the correct court without other violations. What happens?",
      "options": [
        "Play continues",
        "The hitter always loses",
        "A let is mandatory",
        "It counts only above net height"
      ],
      "correctAnswer": "Play continues",
      "explanation": "A legal return can pass outside a net post.",
      "sourceRule": "25",
      "type": "multiple-choice"
    },
    {
      "id": "i2",
      "question": "You catch a rally ball before it bounces because it looks out. What happens?",
      "options": [
        "You lose the point",
        "You win the point",
        "Replay the point",
        "An automatic warning"
      ],
      "correctAnswer": "You lose the point",
      "explanation": "Let the ball bounce; catching it loses the point.",
      "sourceRule": "24",
      "type": "multiple-choice"
    },
    {
      "id": "i3",
      "question": "Under ITF rules, what's the maximum time allowed between points in a standard match?",
      "options": [
        "20 seconds",
        "25 seconds",
        "30 seconds",
        "35 seconds"
      ],
      "correctAnswer": "25 seconds",
      "explanation": "ITF Rule 29 allows up to 25 seconds between points.",
      "type": "multiple-choice",
      "sourceRule": "29"
    },
    {
      "id": "i4",
      "question": "An opponent deliberately hinders you while you are playing a point. What is the ruling?",
      "options": [
        "You win the point",
        "Always replay",
        "Opponent wins",
        "No action is possible"
      ],
      "correctAnswer": "You win the point",
      "explanation": "Deliberate hindrance costs the offender the point.",
      "sourceRule": "26",
      "type": "multiple-choice"
    },
    {
      "id": "i5",
      "question": "Order these standard maximum time allowances from shortest to longest:",
      "items": [
        "Between points: 25 seconds",
        "Changeover rest: 90 seconds",
        "Set break: 120 seconds",
        "Warm-up: 5 minutes"
      ],
      "correctOrder": [
        "Between points: 25 seconds",
        "Changeover rest: 90 seconds",
        "Set break: 120 seconds",
        "Warm-up: 5 minutes"
      ],
      "explanation": "There is no changeover rest after the first game or during a tiebreak; event exceptions apply.",
      "sourceRule": "29",
      "type": "drag-drop"
    },
    {
      "id": "i6",
      "question": "Both doubles partners touch the ball while returning the same shot. What happens?",
      "options": [
        "Their team loses the point",
        "Play continues",
        "They win the point",
        "The point is always replayed"
      ],
      "correctAnswer": "Their team loses the point",
      "explanation": "Both partners cannot touch one return.",
      "sourceRule": "24",
      "type": "multiple-choice"
    },
    {
      "id": "i7",
      "question": "What is the rarely invoked 'hindrance rule' when a player shouts during a rally?",
      "options": [
        "Point is always replayed",
        "Player who shouted loses the point",
        "Depends if it was deliberate",
        "Warning is issued first"
      ],
      "correctAnswer": "Depends if it was deliberate",
      "explanation": "Deliberate hindrance awards the opponent the point; unintentional hindrance generally means a replay.",
      "type": "multiple-choice",
      "sourceRule": "26"
    },
    {
      "id": "i8",
      "question": "What is the strict interpretation of the 'double bounce rule' in wheelchair tennis?",
      "options": [
        "The ball can bounce twice",
        "The ball must bounce once only",
        "The ball may bounce unlimited times",
        "The rule doesn't exist"
      ],
      "correctAnswer": "The ball can bounce twice",
      "explanation": "Two bounces are allowed; the second may land outside the court.",
      "type": "multiple-choice",
      "sourceRule": "Wheelchair tennis"
    },
    {
      "id": "i9",
      "question": "A ball bounces in your court, then spins back over the net. May you reach over to return it?",
      "options": [
        "Yes, without touching the net or opponents' court",
        "Only in doubles",
        "Never",
        "Only on match point"
      ],
      "correctAnswer": "Yes, without touching the net or opponents' court",
      "explanation": "This exception permits reaching over, subject to the other point-loss rules.",
      "type": "multiple-choice",
      "sourceRule": "25"
    },
    {
      "id": "i10",
      "question": "Player A serves first in a standard singles tiebreak. Order who serves each group:",
      "items": [
        "Point 1: A",
        "Points 2–3: B",
        "Points 4–5: A",
        "Points 6–7: B"
      ],
      "correctOrder": [
        "Point 1: A",
        "Points 2–3: B",
        "Points 4–5: A",
        "Points 6–7: B"
      ],
      "explanation": "One initial serve is followed by alternating two-point turns.",
      "sourceRule": "5",
      "type": "drag-drop"
    }
  ]
};

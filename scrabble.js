const LETTER_VALUES = {
  'A': 1,
  'E': 1,
  'I': 1,
  'O': 1,
  'U': 1,
  'L': 1,
  'N': 1,
  'R': 1,
  'S': 1,
  'T': 1,
  'D': 2,
  'G': 2,
  'B': 3,
  'C': 3,
  'M': 3,
  'P': 3,
  'F': 4,
  'H': 4,
  'V': 4,
  'W': 4,
  'Y': 4,
  'K': 5,
  'J': 8,
  'X': 8,
  'Q': 10,
  'Z': 10
};
const BONUS = 50;

const Scrabble = {
  score(word) {
    if (!word || typeof word !== 'string' || word.length > 7) {
      throw new Error('Invalid input');
    }

    const letters = word.toUpperCase().split('');

    let score = 0;

    letters.forEach((letter) => {
      if (!LETTER_VALUES[letter]) {
        throw new Error('Invalid input: word may only contain letters');
      }
      score += LETTER_VALUES[letter];
    });

    if (letters.length === 7) {
      score += BONUS;
    }
    return score;
  },

  highestScoreFrom(arrayOfWords) {
    if (!arrayOfWords || typeof arrayOfWords !== 'object' || arrayOfWords.length === 0) {
      throw new Error('Invalid input');
    }

    let maxWord = arrayOfWords[0]

    arrayOfWords.forEach((word) => {
      if (this.score(word) > this.score(maxWord)) {
        maxWord = word;
      }
      else if (this.score(word) === this.score(maxWord)) {
        maxWord = this.tieBreaker(maxWord, word);
      }
    });
    return maxWord;
  },

  tieBreaker(first, second) {
    if (first.length === 7) {
      return first
    } else if (second.length === 7) {
      return second;
    } else if (second.length < first.length) {
      return second;
    } else {
      return first;
    }
  }
};

Scrabble.Player = class {
  constructor(name) {
    if (!name) {
      throw new Error('A name must be provided for each player.');
    }

    this.name = name;
    this.plays = [];
  }

  play(word) {
    if (typeof Scrabble.score(word) !== 'number') {
      throw new Error('Invalid word play');
    } else if (this.hasWon()) {
      return false;
    }

    return this.plays.push(word);
  }

  totalScore() {
    let totalScore = 0;
    this.plays.forEach((word) => {
      totalScore += Scrabble.score(word)
    });

    return totalScore;
  }

  hasWon() {
    return (this.totalScore() >= 100);
  }

  highestScoringWord() {
    if (this.plays.length === 0) {
      throw new Error('Player has not played any words yet');
    }

    let maxWord = this.plays[0];

    this.plays.forEach((word) => {
      if (Scrabble.score(word) > Scrabble.score(maxWord)) {
        maxWord = word;
      }
      else if (Scrabble.score(word) === Scrabble.score(maxWord)) {
        maxWord = Scrabble.tieBreaker(word, maxWord);
      }
    });

    return maxWord;
  }

  highestWordScore() {
    if (this.plays.length === 0) {
      throw new Error('Player has not played any words yet');
    }
    
    return Scrabble.score(this.highestScoringWord());
  }
};

module.exports = Scrabble;

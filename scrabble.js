const Scrabble = {
  A: 1,
  B: 3,
  C: 3,
  D: 2,
  E: 1,
  F: 4,
  G: 2,
  H: 4,
  I: 1,
  J: 8,
  K: 5,
  L: 1,
  M: 3,
  N: 1,
  O: 1,
  P: 3,
  Q: 10,
  R: 1,
  S: 1,
  T: 1,
  U: 1,
  V: 4,
  W: 4,
  X: 8,
  Y: 4,
  Z: 10,

  score(word) {
    let total = 0;

    if (typeof word != 'string' || word.length < 1 || word.length > 7) {
      throw "Word must be a non-empty string less than 8 chars.";
    } else if (word.length === 7) {
      total += 50;
    }

    for (let letter of word) {
      let capLetter = letter.toUpperCase();
      if (this[capLetter]) {
        total += this[capLetter];
      } else {
        throw "Word includes an invalid letter.";
      }
    }
    return total;
  },

  highestScoreFrom(arrayOfWords) {
    let highestScore = ["", 0]

    if (arrayOfWords.length < 1 || !Array.isArray(arrayOfWords)) {
      throw "Must contain an array.";
    } else if (arrayOfWords.length === 1) {
      return arrayOfWords[0];
    }

    for (let i = 0; i < arrayOfWords.length; i++) {
      if (this.score(arrayOfWords[i]) === highestScore[1]) {
        if (arrayOfWords[i].length === 7 || highestScore[0].length === 7) {
          return (arrayOfWords[i].length === 7 ? arrayOfWords[i] : highestScore[0]);
        } else {
          return (arrayOfWords[i].length < highestScore[0].length ? arrayOfWords[i] : highestScore[0]);
        }
      } else if (this.score(arrayOfWords[i]) >= highestScore[1]) {
        highestScore[0] = arrayOfWords[i];
        highestScore[1] = this.score(arrayOfWords[i]);
      }
    }
    return highestScore[0]
  },

};


Scrabble.Player = class {
  constructor(name) {
    this.name = name;
    if (this.name.length < 1) {
      throw "Player name cannot be empty."
    }
    this.plays = [];
  }

  play(word) {
    if (word.length < 1 || typeof word != 'string') {
      throw "Word is invalid."
    } else if (this.hasWon()) {
      return false;
    } else {
      this.plays.push(word);
      return this.plays;
    }
  }

  totalScore() {
    let playerScore = 0;

    this.plays.forEach((word) => {
      playerScore += Scrabble.score(word)
    });

    return playerScore;
  }

  hasWon() {
    if (this.totalScore() > 100) {
      return true;
    } else {
      return false;
    }

  }

};


module.exports = Scrabble;

const tilescores = {
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
};

const Scrabble = {
  valid(word) {
    if (word.match(/[^a-zA-Z]/i)) {
      throw new Error('Bad character entered');
    }

    if (word.length < 1 || word.length > 7) {
      throw new Error('Word must be 1-7 letters.');
    }

    if (word.length === 0) {
      throw new Error('Word is empty');
    }
  },

  score(word) {
    this.valid(word)
    word = word.toUpperCase();
    let sum = 0;
    for (let letter of word) {
      sum += tilescores[letter]
    }
    if (word.length === 7) {
      sum += 50;
    }
    return sum;
  },

  // breakTie(tiedWords) {
  //   for (let word of tiedWords) {
  //     if (word.length === 7) {
  //       return word;
  //     }
  //   }
  // }

  highestScoreFrom(arrayOfWords) {

    if (arrayOfWords.length === 0) {
      throw Error('No words Played');
    } else if (arrayOfWords.length === 1) {
      return arrayOfWords[0];
    }

    let hiScore = 0;
    let bestScore = 0;
    let hiWord = arrayOfWords[0];
    for (let word of arrayOfWords) {
      hiScore = Scrabble.score(word)
      if (hiScore > bestScore) {
        hiWord = word;
        bestScore = hiScore;
      } else if (hiScore === bestScore) {
        if (hiWord.length != 7) {
          if (word.length === 7 || word.length < hiWord.length) {
            hiWord = word;
            bestScore = hiScore
          }
        }
      }
    }
    return hiWord
  },
};



Scrabble.Player = class {
  constructor(name) {
    this.name = name;
    this.plays = [];
    this._totalScore = 0;
    this._hasWon = false;
    this._highestScoringWord;
    this._highestWordScore = 0;
  }
};



module.exports = Scrabble;

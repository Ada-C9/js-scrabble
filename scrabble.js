const SCORECHART = {
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
}

const REGEX = /[A-Z]/

const Scrabble = {
  score(word) {
    let wordUp = word.toUpperCase()
    let wordSplits = wordUp.split('');

    let totalScore = 0;
    if (wordSplits.length > 7 || wordSplits.length === 0) {
      throw 'Invalid word';
    }

    if (wordSplits.length === 7) {
      totalScore += 50;
    }

    wordSplits.forEach(function(letter) {
      if (REGEX.test(letter)) {
        totalScore += SCORECHART[letter];
      } else {
        throw 'Not a valid word';
      }

    });

    return totalScore
  },

  highestScoreFrom(arrayOfWords) {
    if (arrayOfWords.length === 0) {
      throw 'Unable to calculate highest score without any words.';
    }
    if (Array.isArray(arrayOfWords) !== true) {
      throw 'Unable to calculate highest score without an array of words';
    }
    if (arrayOfWords.length === 1){
      return arrayOfWords[0];
    } else {
      let word_score = {};
      arrayOfWords.forEach(function(word) {
        word_score[word] = Scrabble.score(word);
      });

      let highest_score = 0;
      let winWord = null;
      for(const word in word_score) {
        if (word_score[word] > highest_score) {
          highest_score = word_score[word];
          winWord = word;
        } if (word_score[word] === highest_score && winWord.length === 7) {
          return winWord;
        } if (word_score[word] === highest_score && word.length === 7) {
            return word;
        } if (word_score[word] === highest_score && winWord.length < word.length) {
          return winWord;
        } if (word_score[word] === highest_score && winWord.length > word.length) {
          return word;
        }
      } //for loop
      return winWord;
    }
  },
};

Scrabble.Player = class {
  constructor(name) {
    this.name = name;
    this.plays = [];
    if (name === undefined) {
      throw 'Player must have a name';
    }
  }

  play(word) {
    if (this.hasWon()){
      return false;
    } else {
      if (word === undefined) {
        throw 'Must play a word';
      }
      if (REGEX.test(word.toUpperCase)!== true){
        throw 'Must play a real word';
      }
      this.plays.push(word);
    }
    return this.plays;

  }

  totalScore() {
    let points = 0;
    this.plays.forEach(function(word) {
      let wScore = Scrabble.score(word);
      points += wScore;
    });
    return points;
  }

  hasWon(){
    if (this.totalScore() >= 100) {
      return true;
    } else {
      return false;
    }
  }

};


module.exports = Scrabble;

// let pry = require('pryjs');

const scores = {
  a: 1, e: 1, i: 1, o: 1, u: 1, l: 1, n: 1, r: 1, s: 1,
  t: 1, d: 2, g: 2, b: 3, c: 3, m: 3, p: 3, f: 4, h: 4, v: 4, w: 4, y: 4, k: 5, j: 8, x: 8, q: 10, z: 10
}

const Scrabble = {

  score(word) {
    if (word === '') {
      throw 'Must play a word with at least one letter.';
    }
    if (word.length > 7) {
      throw 'Cannot accept word longer than seven letters.';
    }
    word = word.toLowerCase();
    let wordArray = word.split('');
    let totalScore = 0;
    wordArray.forEach(function(char) {
      if (scores[char] == undefined) {
        throw `${char} is not a valid character.`
      }
      let charValue = scores[char];
      totalScore += charValue;
    });
    if (word.length == 7) {
      totalScore += 50;
    }
    return totalScore;
  }, // score

  highestScoreFrom(arrayOfWords) {
    if (!Array.isArray(arrayOfWords) || arrayOfWords.length == 0) {
      throw 'Must enter a valid array of words.'
    }

    let wordsAndScores = {};

    let highestScore = this.score(arrayOfWords[0]);
    for (let word of arrayOfWords) {
      let score = this.score(word);
      wordsAndScores[word] = score;
      if (score > highestScore) {
        highestScore = score;
      }
    }

    let possibleWinners = {};
    for (let word in wordsAndScores) {
      let score = this.score(word);
      if (score == highestScore) {
        possibleWinners[word] = score;
      }
    }

    let winner;
    let shortestLength = 7;
    for (let possibleWinner in possibleWinners) {
      let length = possibleWinner.length
      if (length == 7) {
        winner = possibleWinner;
        return winner;
      } else if (length < shortestLength) {
        shortestLength = length;
        winner = possibleWinner;
      }
    }

    return winner;
  } // highestScoreFrom

};

Scrabble.Player = class {

  constructor(name) {
    if (name.null) {
      throw 'A name is required.';
    }
    this.name = name;
    this.plays = [];
  }

  totalScore() {
    let words = this.plays;
    let total = 0;
    for (let word of words) {
      total += Scrabble.score(word);
    }
    return total;
  }

  hasWon() {
    let total = this.totalScore();
    if (total >= 100) {
      return true;
    } else {
      return false;
    }
  }

  play(word) {
    if (typeof word != 'string') {
      throw 'Must play a valid word.';
    }
    let won = this.hasWon();
    if (won) {
      return false;
    } else {
      this.plays.push(word);
      return true;
    }
  }
};

module.exports = Scrabble;

const scoreTable = {
  'a': { 'points':  1, 'tiles':  9 },
  'b': { 'points':  3, 'tiles':  2 },
  'c': { 'points':  3, 'tiles':  2 },
  'd': { 'points':  2, 'tiles':  4 },
  'e': { 'points':  1, 'tiles': 12 },
  'f': { 'points':  4, 'tiles':  2 },
  'g': { 'points':  2, 'tiles':  3 },
  'h': { 'points':  4, 'tiles':  2 },
  'i': { 'points':  1, 'tiles':  9 },
  'j': { 'points':  8, 'tiles':  1 },
  'k': { 'points':  5, 'tiles':  1 },
  'l': { 'points':  1, 'tiles':  4 },
  'm': { 'points':  3, 'tiles':  2 },
  'n': { 'points':  1, 'tiles':  6 },
  'o': { 'points':  1, 'tiles':  8 },
  'p': { 'points':  3, 'tiles':  2 },
  'q': { 'points': 10, 'tiles':  1 },
  'r': { 'points':  1, 'tiles':  6 },
  's': { 'points':  1, 'tiles':  4 },
  't': { 'points':  1, 'tiles':  6 },
  'u': { 'points':  1, 'tiles':  4 },
  'v': { 'points':  4, 'tiles':  2 },
  'w': { 'points':  4, 'tiles':  2 },
  'x': { 'points':  8, 'tiles':  1 },
  'y': { 'points':  4, 'tiles':  2 },
  'z': { 'points': 10, 'tiles':  1 },
  'blank': { 'tiles': 2}
}


const findPoints = function findPoints(letter) {
  let tileInfo = scoreTable[letter];
  let points = tileInfo['points'];
  return points;
}


const Scrabble = {
  score(word) {
    let score = 0;
    if (word.length === 7) {
      score = 50;
      return score;
    }
    for (let i = 0; i < word.length; i++) {
      let points = findPoints(word[i]);
      score += points;
    }
    return score;
  },

  highestScoreFrom(arrayOfWords) {
    let maxWord = null;
    let maxPoints = null;
    arrayOfWords.forEach(function (word) {
      let score = Scrabble.score(word);
      if (maxPoints < score) {
        maxWord = word;
        maxPoints = score;
      }
    });
    return maxWord;
  }
}


Scrabble.Player = class {
  constructor(name, plays = []) {
    this.name = name;
    this.plays = plays;
  }

  play(word) {
    return (this.hasWon ? this.plays.push(word) : false);
  }

  totalScore() {
    let wordsPlayed = this.plays;
    let total = 0;
    wordsPlayed.forEach(function (word) {
      total += Scrabble.score(word);
    })
    return total;
  }

  hasWon() {
    let total = this.totalScore;
    return (total >= 100);
  }

  highestScoringWord() {
    let plays = this.plays;
    return Scrabble.highestScoreFrom(plays);
  }

  highestWordScore() {
    let word = this.highestScoringWord();
    return Scrabble.score(word);
  }
};



// let jill = new Scrabble.Player('jill');
//
// console.log(jill);
//
// jill.play('mom');
// jill.play('text');
//
// console.log(jill.plays);
//
// let total = jill.totalScore();
//
// console.log(total);
//
// console.log(jill.hasWon());
// console.log(jill.highestScoringWord());
// console.log(jill.highestWordScore());




module.exports = Scrabble;

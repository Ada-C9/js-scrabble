
const scrabbleTiles = {
  a: 1,
  e: 1,
  i: 1,
  o: 1,
  u: 1,
  l: 1,
  n: 1,
  r: 1,
  s: 1,
  t: 1,
  d: 2,
  g: 2,
  b: 3,
  c: 3,
  m: 3,
  p: 3,
  f: 4,
  h: 4,
  v: 4,
  w: 4,
  y: 4,
  k: 5,
  j: 8,
  x: 8,
  q: 10,
  z: 10,
};

const Scrabble = {
  score(word) {
    word = word.toLowerCase();
    let scrabbleWord = word.split('');
    let totalScore = 0;

    if (scrabbleWord.length > 7) {
      throw 'Invalid word: too many tiles.';
    } else if (scrabbleWord.length === 0) {
      throw 'Invalid word: must provide tiles.';
    } else if (scrabbleWord.length === 7) {
      totalScore += 50;
    }

    // output the score of each letter in a word
    // find the total score of the word
    scrabbleWord.forEach((letter) => {
      if (scrabbleTiles[letter] > 0) {
        totalScore += scrabbleTiles[letter];
      } else {
        throw 'Invalid word: word must include letters only.';
      }
    });

    return totalScore;
  },

  highestScoreFrom(arrayOfWords) {
    let topWord = arrayOfWords[0];

    if (typeof arrayOfWords !== 'object' || arrayOfWords.length === 0) {
      throw 'Invalid array.';
    }

    arrayOfWords.forEach((word) => {
      if (this.score(word) > this.score(topWord)) {
        topWord = word;
      } else if (this.score(word) === this.score(topWord)) {
        topWord = this.breakTie(topWord, word);
      }
    });

    return topWord;
  },


  breakTie(originWinner, challenger) {
    if (originWinner.length === 7) {
      return originWinner;
    } else if (challenger.length === 7) {
      return challenger;
    } else if (challenger.length < originWinner.length){
      return challenger;
    } else {
      return originWinner;
    }
  },
};

Scrabble.Player = class {

};


module.exports = Scrabble;


let myWord = Scrabble.score('pig');
console.log(myWord); // "Ada says: 'Try again later.'"
let myArray = Scrabble.highestScoreFrom(['cat', 'pig']);
console.log(myArray)

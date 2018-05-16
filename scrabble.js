
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
    scrabbleWord.forEach(function(letter) {
      if (scrabbleTiles[letter] > 0) {
        totalScore += scrabbleTiles[letter];
      } else {
        throw 'Invalid word: word must include letters only.';
      }
    });

    return totalScore;
  },

  highestScoreFrom(arrayOfWords) {
    let topScore = 0;
    let topWord = [];

    if (typeof arrayOfWords !== 'object' || arrayOfWords.length === 0) {
      throw 'Invalid array.';
    } else if (arrayOfWords.length === 1) {
      topWord = arrayOfWords[0];
      return topWord;
    }

    arrayOfWords.forEach( function(word) {
      if (Scrabble.score(word) > topScore) {
        topScore = Scrabble.score(word);
        topWord.push(word);
      } else if (Scrabble.score(word) === topScore) {
        topWord.push(word);
      }
    });

    return topWord[0]


  },
};

Scrabble.Player = class {

};


module.exports = Scrabble;


let myWord = Scrabble.score('apple');
console.log(myWord); // "Ada says: 'Try again later.'"

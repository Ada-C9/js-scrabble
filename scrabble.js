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
  }

  // TODO: add the highestScoreFrom method

};

Scrabble.Player = class {
  // TODO: implement the Player class
};

module.exports = Scrabble;

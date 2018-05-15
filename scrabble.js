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
      throw "Word must be a non-empty string less than 8 chars."
    }

    if (word.length === 7) {
      total += 50;
    }

    for (let letter of word) {
      let capLetter = letter.toUpperCase();
      if (this[capLetter]) {
        total += this[capLetter];
      } else {
        throw "Word includes an invalid letter."
      }
    }

    return total;
  },

  // highestScoreFrom(arrayOfWords) {
  //
  // },

};

// Scrabble.Player = class {
//
// };


module.exports = Scrabble;

////

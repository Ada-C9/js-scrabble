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
      throw new Error('only letters can be played');
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

  highestScoreFrom(arrayOfWords) {

  },
};



Scrabble.Player = class {

};



module.exports = Scrabble;

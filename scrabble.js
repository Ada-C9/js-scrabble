let scoreChart = {
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
  Z: 10
};


const Scrabble = {
  score: function(word) {
    let total = 0;
    let letters = word.toUpperCase().split(``);

    if (word.match(/^[a-zA-Z]{1,7}$/) == null) {
      throw `How'd you get a non-letter tile, even?`;
    } else if ((word.length > 7)|| (word.length < 0)) {
      throw `Words must be between 1 and 7 letters`;
    } else {
      for (let letter of letters) {
        let scrabble_value = scoreChart[letter];
        total = scrabble_value + total;
      }
    }

    if (word.length === 7) {
      total = total + 50;
    }

    return total;
  },


  highestScoreFrom(arrayOfWords) {

  },
};

Scrabble.Player = class {

};


module.exports = Scrabble;

// Scratch paper
let myword = Scrabble.score(`Pickles`);
console.log(myword);

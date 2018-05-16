const LETTERVALUES = {
  A: 1,
  E: 1,
  I: 1,
  O: 1,
  U: 1,
  L: 1,
  N: 1,
  R: 1,
  S: 1,
  T: 1,
  D: 2,
  G: 2,
  B: 3,
  C: 3,
  M: 3,
  P: 3,
  F: 4,
  H: 4,
  V: 4,
  W: 4,
  Y: 4,
  K: 5,
  J: 8,
  X: 8,
  Q: 10,
  Z: 10,
};

const Scrabble = {
  score(word) {
    let score = 0;
    if (word.length > 7 || word.length < 1) {
      throw ('Word must be between 1 and 7 letters!');
    } else if (word.length === 7) { score = 50;
    } else if (!word.match(/^[a-zA-Z]+$/)) {
      throw ('not a Letter');
    }

    const wordArray = word.toUpperCase().split('');

    wordArray.forEach(function (value) {
      score += LETTERVALUES[value];
    });

    return score;
  },

  highestScoreFrom(arrayofWords) {
    if (arrayofWords.length === 0) {
      throw ('no words to compare');
    }

    let maxWord = ['', 0];
    arrayofWords.forEach(function (word) {
      let wordScore = Scrabble.score(word);

      if (wordScore > maxWord[1]) {
        maxWord[0] = word;
        maxWord[1] = wordScore;
      } else if (wordScore === maxWord[1]) {
        if (word.length === 7 || (word.length < maxWord[0].length && maxWord[0].length !== 7)) {
          maxWord[0] = word;
          maxWord[1] = wordScore;
        }
      }

    });

    return maxWord[0];
  },
};

// console.log(Scrabble.score('nicolet'));
//
// Scrabble.Player = class {
//   constructor(name) {
//     if (!name) {
//       throw ('player must have a name');
//     }
//
//     this.name = name;
//     this.plays = [];
//   }

// };
module.exports = Scrabble;

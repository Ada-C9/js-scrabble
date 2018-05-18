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
    // scores = {}

    if ((arrayOfWords.length == 0) || (Array.isArray(arrayOfWords) == false)) {
      throw `No words were passed`;
    }
    // } else {
    //   for (word of arrayOfWords) {
    //     scores[word] = Scrabble.score(word);
    //   }
    // }
    //
    // let maxScore = Math.max(...Object.values(scores));

    let winningWord = arrayOfWords[0];
    for (word of arrayOfWords) {
      if (this.score(winningWord) < this.score(word)) {
        winningWord = word;
      } else if (this.score(winningWord) === this.score(word)){
        if (winningWord.length === 7) {
          winningWord;
        } else if ((word.length === 7) || (winningWord.length > word.length)) {
          winningWord = word;
        }
      }
    }

    return winningWord
  },
};

Scrabble.Player = class {

};

// Don't touch!
module.exports = Scrabble;
let myWordz = Scrabble.score(`zzzzzz`);
let myWordid = Scrabble.score(`iiiiddd`);
console.log(myWordz);
console.log(myWordid);
// Scratch paper
// let myWord = Scrabble.score(`Pickles`);
// console.log(myWord);
//
// let arrayOfWords = [`Petunia`, `Pete`, `Pickles`];
// let scores = {};
//
// for (word of arrayOfWords) {
//   scores[word] = Scrabble.score(word);
// }
//
// console.log(arrayOfWords);
// // console.log(scores);
//
// let myWords = [`Petunia`, `Pete`, `Pickles`];
// console.log(myWords);
// console.log((myWords));
// let winningWord = arrayOfWords[0];
// console.log(winningWord);
// for (word of arrayOfWords) {
//   console.log(word);
//   if (Scrabble.score(winningWord) < Scrabble.score(word)) {
//     winningWord = word;
//   }
//
// }
//
// console.log((Scrabble.score(winningWord)));
// console.log(winningWord);
// let myWordsScores = Scrabble.highestScoreFrom(myWords);
// console.log((myWordsScores));
//
// let maxScore = Math.max(...Object.values(myWordsScores));
// console.log((maxScore));
//
// let winningWord = arrayOfWords[0];
// for (word of arrayOfWords) {
//   scores[word] = Scrabble.score(word);
// }
//
// console.log((myWordsScores[winningWord]));

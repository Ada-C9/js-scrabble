
const Scrabble =  {

  score(word) {
    const letterValues = { "A": 1, "B":3, "C":3, "D": 2, "E": 1, "F":4, "G":2, "H":4, "I":1, "J":8, "K":5, "L":1,
    "M": 3, "N": 1, "O": 1, "P": 3, "Q": 10, "R": 1, "S": 1, "T": 1, "U": 1, "V": 4, "W": 4, "X": 8,
    "Y": 4, "Z": 10 };

    if (/^[a-zA-Z]+$/.test(word) && word.length <= 7) {

      word = word.toUpperCase();

      let wordScore = (word.length == 7)? 50 : 0;

      for (let i = 0; i < word.length; i+=1) {

        wordScore += letterValues[word.charAt(i)];
      }

      return wordScore;

    } else {
      throw "Please enter a valid input. Word must only contain letters from A-Z";
    }
  },

  // highestScoreFrom(arrayOfWords) {
  //   if (arrayOfWords.length === 0 || arrayOfWords.constructor !== Array) {
  //     throw new Error('Array of words must not be empty');
  //   } else if (arrayOfWords.length === 1) {
  //     return arrayOfWords[0];
  //   } else {
  //     const winningWord = arrayOfWords.reduce((leftWord, rightWord) => {
  //       const scoreLeft = Scrabble.score(leftWord);
  //       const scoreRight = Scrabble.score(rightWord);
  //
  //       if (scoreLeft > scoreRight) {
  //         return leftWord;
  //       } else if (scoreRight > scoreLeft) {
  //         return rightWord;
  //       }
  //
  //       if (rightWord.length === 7) {
  //         return rightWord;
  //       } else if (leftWord.length === 7) {
  //         return leftWord;
  //       }
  //
  //       if (leftWord.length < rightWord.length || leftWord.length === rightWord.length) {
  //         return leftWord;
  //       } // else
  //       return rightWord;
  //     });
  //     return winningWord;
  //   }
  // },
};

// Scrabble.Player = class {
//
// };


module.exports = Scrabble;


console.log(Scrabble.score("ZZzzZZ"));

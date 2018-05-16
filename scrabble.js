
const WORDVALUES = {
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
}

const LETTERS = /[A-Z]/

const Scrabble = {

  score(word) {
    const upWord = word.toUpperCase()
    let score = 0
    let wordLetters = this.splitString(upWord)

    if (wordLetters.length > 7) {
      throw "Character is not a letter!";
    } else if (wordLetters.length === 0) {
      throw "Oops! This word is empty!";
    }

    wordLetters.forEach(function(letter) {
      if (LETTERS.test(letter)) {
        score += WORDVALUES[letter]
      } else {
        throw "Character is not a letter!";
      }
    });

    if (wordLetters.length === 7) {
      score += 50
    }
    return score;
  },

  splitString(upWord) {
    let wordLetters = upWord.split('');
    return wordLetters;
  },

  highestScoreFrom(arrayOfWords) {
    if (Array.isArray(arrayOfWords)) {
      if (arrayOfWords.length === 0) {
        throw "Oops! No words were given!";
      } else if (arrayOfWords.length === 1) {
        return arrayOfWords[0]
      } else {
        let topWord = arrayOfWords[0]
        for (let i = 1; i < arrayOfWords.length; i += 1) {
          if (this.score(arrayOfWords[i]) > this.score(topWord)) {
            topWord = arrayOfWords[i]
          } else if (this.score(arrayOfWords[i]) === this.score(topWord)) {
            if (arrayOfWords[i].length === 7  && topWord.length < 7 ) {
              topWord = arrayOfWords[i]
            }
            else if ( topWord.length < 7 && topWord.length > arrayOfWords[i].length) {
              topWord = arrayOfWords[i]
            }
          }
          return topWord
        }
      }
    } else {
      throw "No array of words given!";
    }
  },

};

Scrabble.Player = class {

};


module.exports = Scrabble;


// switch (letter) {
//   case 'A':
//     return 1;
//   case 'B':
//     return 3;
//   case 'C':
//     return 3;
//   case 'D':
//     return 2;
//   case 'O':
//     return 1;
//   case 'G':
//     return 2;
//   case 'T':
//     return 1;
//   case 'P':
//     return 3;
//   case 'I':
//     return 1;
// }

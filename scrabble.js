
const scoreChart = {
  'A' : 1,
  'B' : 3,
  'C' : 3,
  'D' : 2,
  'E' : 1,
  'F' : 4,
  'G' : 2,
  'H' : 4,
  'I' : 1,
  'J' : 8,
  'K' : 5,
  'L' : 1,
  'M' : 3,
  'N' : 1,
  'O' : 1,
  'P' : 3,
  'Q' : 10,
  'R' : 1,
  'S' : 1,
  'T' : 1,
  'U' : 1,
  'V' : 4,
  'W' : 4,
  'X' : 8,
  'Y' : 4,
  'Z' : 10
};


const Scrabble = {
  score(word) {
    word = word.toUpperCase();

    // check to see if word is a string then raise error if not


    if (typeof word !== 'string' || word.length > 7 || word.length < 1) {
      throw 'Error! You must enter a word that is 1-7 letters long'
    }

    let regex = /^[a-zA-Z]+$/;
    if (!regex.test(word)) {
      throw 'Invalid characters';
    }

    let wordScore = 0

    // adds 50 points to words that are 7 letters
    if (word.length === 7) {
      wordScore += 50;
    }

    let letterArray = word.split('');


    for (let letter of letterArray) {
      for (let key in scoreChart) {
        if (letter === key) {
          wordScore += scoreChart[key]
        }
      }
    }
    return wordScore
  },


  highestScoreFrom(arrayOfWords) {
    if (!Array.isArray(arrayOfWords) || arrayOfWords.length === 0) {
      throw 'No words have been given';
    }
    else if (arrayOfWords.length === 1) {
      return arrayOfWords[0];
    }

    let max = 0;
    let highestWord = '';

    for (let i = 0; i < arrayOfWords.length; i++) {
      let score = this.score(arrayOfWords[i]);

      if (score > max) {
        max = score;
        highestWord = arrayOfWords[i];
      }
      else if (score === max) {
        if (highestWord.length !== 7 &&
          (arrayOfWords[i].length === 7 || (arrayOfWords[i].length < highestWord.length))) {
            highestWord = arrayOfWords[i];
          }
        }
      }

      return highestWord;

    }


  }

  // Scrabble.Player = class {
  //
  // };

  // do not comment me out.
  module.exports = Scrabble;

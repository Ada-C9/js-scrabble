
const letterValues = {
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
    let letters = word.split('');

    let wordScore = 0

    for (let letter of letters) {
      for (let value in letterValues) {
        if (letter === value) {
          wordScore += letterValues[value]
        }
      }
    }
    return wordScore
  },
  highestScoreFrom(arrayOfWords) {

  },
};

Scrabble.Player = class {

};


module.exports = Scrabble;

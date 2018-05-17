const SCORECHART = {
  "A": 1,
  "E": 1,
  "I": 1,
  "O": 1,
  "U": 1,
  "L": 1,
  "N": 1,
  "R": 1,
  "S": 1,
  "T": 1,
  "D": 2,
  "G": 2,
  "B": 3,
  "C": 3,
  "M": 3,
  "P": 3,
  "F": 4,
  "H": 4,
  "V": 4,
  "W": 4,
  "Y": 4,
  "K": 5,
  "J": 8,
  "X": 8,
  "Q": 10,
  "Z": 10
};

const Scrabble = {
  score(word) {
    this.word = word;

    // Need to check input to be consistent to uppercase
    // Then need to increment through each letter to tally score.
    // if statement for when word is 7 characters exact long
    // else statement for >7 that word cannot be that long

    let uppercaseWord = word.toUpperCase();
    let wordArray = uppercaseWord.split("");
    let score = 0

    for (let i = 0; i < uppercaseWord.length; i++) {
      if (SCORECHART.hasOwnProperty(wordArray[i])) {
        score += SCORECHART[wordArray[i]];
      }
    }

  if (wordArray.length ===7) {
    score += 50;
  }
    return score
  },
  
  // highestScoreFrom(arrayOfWords) {
  //   if (this.word) {
  //     return true;
  //   }
  //
  // },
};

Scrabble.Player = class {
  constructor(name) {
    this.name = name;
  }

};

console.log(Scrabble.highestWordFrom);


module.exports = Scrabble;

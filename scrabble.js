// const BOARD = ['J', 'K', 'Q', 'X', 'Z', 'B', 'B', 'C', 'C', 'F', 'F', 'H', 'H', 'M', 'M', 'P', 'P', 'V', 'V', 'W', 'W', 'Y', 'Y', 'G', 'G', 'G', 'D', 'D', 'D', 'D', 'L', 'L', 'L', 'L', 'S', 'S', 'S', 'S', 'U', 'U', 'U', 'U', 'N', 'N', 'N', 'N', 'N', 'N', 'R', 'R', 'R', 'R', 'R', 'R', 'T', 'T', 'T', 'T', 'T', 'T', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E']

const SCORES = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
}

const WORDS = []

const Scrabble = {

  score(word) {
    word = word.toUpperCase()

    if (!/^[A-Z]+$/.test(word)) {
      throw "Not a valid word";
    }

    if (word.length > 7) {
      throw "How many tiles do you even have?";
    }

    let total = 0;

    word.split('').forEach(function(letter) {
      for (let score in SCORES) {
        if (SCORES[score].includes(letter)) {
          total += (parseInt(score));
        }
      }
    })
    if (word.length === 7) {
      total += 50;
    }
    return total
  },

  highestScoreFrom(arrayOfWords) {
    if (arrayOfWords.length < 1) {
      throw "No words to compare";
    }

    if (arrayOfWords.length === 1) {
      return arrayOfWords[0];
    }

    let max = {}

    arrayOfWords.forEach(function(word) {

      let wordScore = Scrabble.score(word);

      if (!max[wordScore]) {
        max[wordScore] = [word];
      }
      else {
        max[wordScore].push(word);
      }
    })
  },
};

Scrabble.Player = class {

};


module.exports = Scrabble;

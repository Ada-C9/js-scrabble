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

    let allScores = {}

    arrayOfWords.forEach(function(word) {

      let wordScore = Scrabble.score(word);

      if (!allScores[wordScore]) {
        allScores[wordScore] = [word];
      }
      else {
        allScores[wordScore].push(word);
      }
    })

    let keys = Object.keys(allScores);
    let max = Math.max(...keys);

    if (allScores[max].length === 1) {
      return allScores[max][0];
    }
    else {
      let min = allScores[max][0];

      allScores[max].forEach(function(maxWord) {
        if ( maxWord.length === 7 ) {
          return maxWord
        }
        else if ( maxWord.length < min.length) {
          min = maxWord;
        }
      })
      return min
    }
  }
};

Scrabble.Player = class {
  constructor(name) {
    if (!name) {
      throw "Player needs a name";
    }
    this.name = name;
    this.plays = [];
  }

  play(word) {

    if (!/^[A-Z]+$/.test(word.toUpperCase())) {
      throw "Not a valid word";
    }

    else {
      return this.plays.push(word)
    }
  }

  totalScore() {
    let total = 0

    this.plays.forEach(function(play) {
      total += Scrabble.score(play)
    })
    return total
  }

  hasWon() {
    let scores = [];

  }
};


module.exports = Scrabble;

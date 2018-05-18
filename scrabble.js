let BOARD = ['J', 'K', 'Q', 'X', 'Z', 'B', 'B', 'C', 'C', 'F', 'F', 'H', 'H', 'M', 'M', 'P', 'P', 'V', 'V', 'W', 'W', 'Y', 'Y', 'G', 'G', 'G', 'D', 'D', 'D', 'D', 'L', 'L', 'L', 'L', 'S', 'S', 'S', 'S', 'U', 'U', 'U', 'U', 'N', 'N', 'N', 'N', 'N', 'N', 'R', 'R', 'R', 'R', 'R', 'R', 'T', 'T', 'T', 'T', 'T', 'T', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E']
console.log(BOARD.length);
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
  board: BOARD,

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
      let seven = null

      allScores[max].forEach(function(maxWord) {
        if ( maxWord.length === 7 ) {
          seven = maxWord;
        }
        else if ( maxWord.length < min.length) {
          min = maxWord;
        }
      })
      if (seven) {
        return seven
      }
      else {
        return min
      }
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
    this.hand = [];
  }

  play(word) {

    if (!/^[A-Z]+$/.test(word.toUpperCase())) {
      throw "Not a valid word";
    }

    else if (this.hasWon()) {
      return false
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
    if (this.totalScore() >= 100) {
      return true;
    }
    else {
      return false
    }
  }

  highestScoringWord() {
    if (this.plays.length < 1) {
      throw "No plays yet";
    }
    return Scrabble.highestScoreFrom(this.plays)
  }

  highestWordScore() {
    if (this.plays.length < 1) {
      throw "No plays yet";
    }
    return Scrabble.score(Scrabble.highestScoreFrom(this.plays));
  }

  drawTiles() {
    if (this.hand.length === 7 ) {
      throw "Full hand";
    }

    let hand = this.hand.length

    for (let i = hand; i < 7; i++) {
      let index = Math.floor(Math.random() * Scrabble.board.length);
      let tile = Scrabble.board[index];
      this.hand.push(tile);
      Scrabble.board.splice(index, 1);
    }
  }
};


module.exports = Scrabble;

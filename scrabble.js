const checkWord = require('check-word'),
    words = checkWord('en');

const TILEBAG = {
  'a': { 'points':  1, 'qty':  9, },
  'b': { 'points':  3, 'qty':  2, },
  'c': { 'points':  3, 'qty':  2, },
  'd': { 'points':  2, 'qty':  4, },
  'e': { 'points':  1, 'qty': 12, },
  'f': { 'points':  4, 'qty':  2, },
  'g': { 'points':  2, 'qty':  3, },
  'h': { 'points':  4, 'qty':  2, },
  'i': { 'points':  1, 'qty':  9, },
  'j': { 'points':  8, 'qty':  1, },
  'k': { 'points':  5, 'qty':  1, },
  'l': { 'points':  1, 'qty':  4, },
  'm': { 'points':  3, 'qty':  2, },
  'n': { 'points':  1, 'qty':  6, },
  'o': { 'points':  1, 'qty':  8, },
  'p': { 'points':  3, 'qty':  2, },
  'q': { 'points': 10, 'qty':  1, },
  'r': { 'points':  1, 'qty':  6, },
  's': { 'points':  1, 'qty':  4, },
  't': { 'points':  1, 'qty':  6, },
  'u': { 'points':  1, 'qty':  4, },
  'v': { 'points':  4, 'qty':  2, },
  'w': { 'points':  4, 'qty':  2, },
  'x': { 'points':  8, 'qty':  1, },
  'y': { 'points':  4, 'qty':  2, },
  'z': { 'points': 10, 'qty':  1, },
}

const Scrabble = {
  validate(word) {
    let valid = /^[A-Za-z]+$/;
    let match = word.match(valid) && word.length <= 7 ? true : false;
    return match
  },

  score(word) {
    let score = 0;
    if (this.validate(word)) {
      word = word.toLowerCase();
      if (this.wordCheck(word)) {
      for (let letter of word) {
        let current_score = TILEBAG[letter].points;
        score += current_score;
      }
      word.length === 7 ? score += 50 : '';
    }
      return score;
    } else {
      throw 'Word contains invalid character';
    }
  },

  breakTie(incumbent, challenger) {
    if (incumbent.length == 7) {
      return incumbent
    } else if (challenger.length == 7) {
      return challenger
    }
    else if (challenger.length < incumbent.length) {
      return challenger
    } else {
      return incumbent
    }
  },

  highestScoreFrom(arrayOfWords) {
    if (arrayOfWords.length === 0) {
      throw 'No words to score';
    } else if (arrayOfWords.length === 1) {
      return arrayOfWords[0];
    } else {
      let max = arrayOfWords[0]
      for (let word of arrayOfWords) {
        let word_score = this.score(word);
        let max_score = this.score(max);
        if (max_score < word_score) {
          max = word;
        } else if (max_score === word_score) {
          max = this.breakTie(max, word);
        }
      }
      return max;
    }
  },

  wordCheck(word) {
    return words.check(word);
    // it is passing tests, but won't implement it because then all the provided tests will break
  }
};

Scrabble.TileBag = class {
  constructor() {
    this.tiles = JSON.parse(JSON.stringify(TILEBAG));
  }

  tilesCount() {
    let count = 0
    Object.keys(this.tiles).forEach((letter) => {
      count += this.tiles[letter].qty;
    });
    return count
  }

}

Scrabble.Player = class {
  constructor(name) {
    if (name) {
      this.name = name;
      this.plays = [];
      this.hand = [];
      this.tileBag = new Scrabble.TileBag;
    } else {
      throw 'Player requires a name.'
    }
  }

  play(word) {
    if (this.hasWon()) {
      return false;
    } else if (Scrabble.validate(word) && this.lettersInHand(word)) {
      this.plays.push(word);
      return (`${this.name} played the word ${word}`);
    } else {
      throw `${word} is not a valid play.`;
    }
  }

  lettersInHand(word) {
    let currentHand = this.hand;
    let letters = {}
    for (let tile of currentHand) {
      letters[tile] ? letters[tile] += 1 : letters[tile] = 1;
    }

    let hasTiles = true
    for (let letter of word) {
      letters[letter] >= 1 ? letters[letter] -= 1 : hasTiles = false;
    }
    return hasTiles;
  }

  totalScore() {
    let total = 0
    if (this.plays.length === 0) {
      return total;
    } else {
    for (let play of  this.plays) {
        let score = Scrabble.score(play);
        total += score;
      }
    }
    return total;
  }

  highestScoringWord() {
    let plays = this.plays;
    let max = Scrabble.highestScoreFrom(plays);
    return max;
  }

  highestWordScore() {
    let max = this.highestScoringWord();
    return Scrabble.score(max);
  }

  hasWon() {
    let score = this.totalScore();
    return score >= 100
  }

  rageQuit() {
    let tileBag = this.tileBag.tiles
    let keys = Object.keys(tileBag);
    for (let key of keys) {
      let count = tileBag[key].qty;
      tileBag[key].qty -= count;
    }
  }

  drawTiles() {
    let tileBag = this.tileBag.tiles
    let available = this.tileBag.tilesCount();
    if (available > 0) {
      let draw = 7 - this.hand.length;
      let letters = Object.keys(tileBag)

      let i = 0;
      while (i < draw ) {
        let letter = letters[Math.floor(Math.random() * letters.length)]
        if (tileBag[letter].qty > 0) {
          this.hand.push(letter);
          tileBag[letter].qty -= 1;
          i += 1;
        }
        if (available == 0) {
          break;
        }
      }
    }
  }
};

module.exports = Scrabble;

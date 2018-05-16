const LETTER_VALUES =
{
  "a": { "points":  1, "tiles":  9 },
  "b": { "points":  3, "tiles":  2 },
  "c": { "points":  3, "tiles":  2 },
  "d": { "points":  2, "tiles":  4 },
  "e": { "points":  1, "tiles": 12 },
  "f": { "points":  4, "tiles":  2 },
  "g": { "points":  2, "tiles":  3 },
  "h": { "points":  4, "tiles":  2 },
  "i": { "points":  1, "tiles":  9 },
  "j": { "points":  8, "tiles":  1 },
  "k": { "points":  5, "tiles":  1 },
  "l": { "points":  1, "tiles":  4 },
  "m": { "points":  3, "tiles":  2 },
  "n": { "points":  1, "tiles":  6 },
  "o": { "points":  1, "tiles":  8 },
  "p": { "points":  3, "tiles":  2 },
  "q": { "points": 10, "tiles":  1 },
  "r": { "points":  1, "tiles":  6 },
  "s": { "points":  1, "tiles":  4 },
  "t": { "points":  1, "tiles":  6 },
  "u": { "points":  1, "tiles":  4 },
  "v": { "points":  4, "tiles":  2 },
  "w": { "points":  4, "tiles":  2 },
  "x": { "points":  8, "tiles":  1 },
  "y": { "points":  4, "tiles":  2 },
  "z": { "points": 10, "tiles":  1 },
  "blank": { "tiles": 2 }
}
const MAX_LENGTH = 7;

const Scrabble = {
  score(word) {

    if (!word.match(/^[a-zA-Z]+$/)) {
      throw "Not a valid word";
    } else if (word.length === 0) {
      throw "No word given";
    } else if (word.length > MAX_LENGTH) {
      throw "Scrabble words can only be 7 letters!";
    }

    word = word.toLowerCase().split("");
    let wordScore = 0;

    word.forEach (function (letter) {
      let points = LETTER_VALUES[letter]["points"];
      wordScore += points;
    });

    if (word.length === 7) {
      wordScore += 50;
    }

    return wordScore;
  },

  highestScoreFrom(arrayOfWords) {

    if (arrayOfWords.length === 0) {
      throw "No words given";
    }

    let topWord = arrayOfWords[0];

    arrayOfWords.forEach (function (word) {
      if ( Scrabble.score(word) > Scrabble.score(topWord)) {
        topWord = word;
      } else if ( Scrabble.score(word) == Scrabble.score(topWord))


    });
    return topWord;
  }
}

Scrabble.Player = class {

  constructor(name) {
    if (name == null) {
      throw("The player needs a name!");
    }
    this.name = name;
    this.plays = [];
  }

  play(word) {
    if ( this.hasWon ) {
      return false;
    } else {
      this.plays.push(word);
    }
  }

  totalScore() {
    let score = 0;
    this.plays.forEach (function (word){
      let wordScore = Scrabble.score(word);
      score += wordScore;
    });
    return score;
  }

  hasWon() {
    let score = this.totalScore();
    if (score > 100) {
      return true;
    } else {
      return false;
    }
  }

  highestScoringWord() {
    let max_word = "";
    this.plays.forEach (function(word) {
      if ( Scrabble.score(word) > max_word ) {
        max_word = word;
      }
    });
    return max_word;
  }

  highestWordScore() {
    let word = this.highestScoringWord();
    let wordScore = Scrabble.score(word);

    return wordScore;
  }
};


module.exports = Scrabble;

const LETTERS = {
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
  "blank": { "tiles": 2}
}


const Scrabble = {

  checkForValidWord(word) {
    let downWord = word.toLowerCase()

    if (!downWord.match(/^[a-z]+$/) || downWord.length > 7 || downWord.length < 1) {
      throw "Invalid Word";
    } else {
      return downWord;
    }
  },

  score(word) {
    let checkedWord = this.checkForValidWord(word);
    let splitWord = checkedWord.split('');
    let total = 0;

    splitWord.forEach(function(letter) {
      total += LETTERS[letter]['points'];
    });

    if (splitWord.length == 7) {
      total += 50;
    }

    return total
  },

  breakTie(word1, word2) {
    switch(true) {
      case (word1.length === 7):
        return word1;
      case (word2.length === 7):
        return word2;
      case (word2.length < word1.length):
        return word2;
      default:
        return word1;
    }
  },


  highestScoreFrom(arrayOfWords) {
    if (arrayOfWords.length < 1) {
      throw "Not enough words for comparison";
    }

    if (arrayOfWords.length === 1) {
      return arrayOfWords[0];
    }

    let highestWord = arrayOfWords[0];

    arrayOfWords.forEach(function(word){

      if (Scrabble.score(word) > Scrabble.score(highestWord)) {
        highestWord = word;
      } else if (Scrabble.score(word) === Scrabble.score(highestWord)) {
        highestWord = Scrabble.breakTie(highestWord, word);
      }

    });

    return highestWord;
  }

};

Scrabble.Player = class {
  constructor(name) {
    if (name == null) {
      throw 'Must have a name';
    }

    this.name = name;
    this.plays= [];
  }

  totalScore() {
    let total = 0;
    this.plays.forEach(function(word) {
      total += Scrabble.score(word);
    });

    return total;
  }

  hasWon() {
    let total = this.totalScore();

    return total >= 100;
  }

  play(word) {
    let checkedWord = Scrabble.checkForValidWord(word);
    if (this.hasWon()) {
      return false;
    } else {
      this.plays.push(checkedWord);
      return checkedWord; // not sure if this is the functionality wanted
    }
  }


};


module.exports = Scrabble;

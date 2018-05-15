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
      total += LETTERS[letter]['points']
    });

    if (splitWord.length == 7) {
      total += 50
    }

    return total
  },


  highestScoreFrom(arrayOfWords) {
    // TODO: implement
  }
};

Scrabble.Player = class {

};


module.exports = Scrabble;

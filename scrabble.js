

const Scrabble = {
  score(word) {
    if (word === null || !word.match(/^[a-zA-Z]+$/)) {
      return null;
    }

    word = word.toLowerCase().split("");
    let word_score = 0;

    word.forEach (function (letter) {
      let points = LETTER_VALUES[letter]["points"];
      word_score += points;
    });
    return word_score;
  },

  highestScoreFrom(arrayOfWords) {

  }
};

Scrabble.Player = class {

};


module.exports = Scrabble;

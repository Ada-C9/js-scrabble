const scoreChart = {
  'A' : 1, 'B' : 3, 'C' : 3, 'D' : 2, 'E' : 1, 'F' :4, 'G' : 2, 'H' : 4, 'I' : 1, 'J' : 8, 'K' : 5, 'L' : 1, 'M' : 3, 'N' : 1, 'O' : 1, 'P' : 3, 'Q' : 10, 'R' : 1, 'S' : 1, 'T' : 1, 'U' : 1, 'V' : 4, 'W' : 4, 'X' : 8, 'Y' : 4, 'Z' : 10};


const Scrabble = {
  score: function(word) {
    let total = 0;
    let playedWord = word.toUpperCase();

    if (!playedWord.match(/^[a-zA-Z]{0,7}$/) || playedWord === '') {
      throw 'Invalid parameter!';
    }

    word.toUpperCase().split('').forEach(function(letter) {
      total += scoreChart[letter];
    });

    if (word.length == 7 && total > 0) {
      total += 50;
    }
    return total;
  },

  highestScoreFrom(arrayOfWords) {

  },
};

Scrabble.Player = class {

};


module.exports = Scrabble;

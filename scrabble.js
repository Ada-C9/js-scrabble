

const Scrabble = {
  score(word) {
    const scoreChart = {
      "A" : 1, "E" : 1, "I" : 1, "O" : 1 , "U" : 1, "L" : 1, "N" : 1, "R" : 1, "S" : 1, "T" : 1,
      "D" : 2, "G" : 2,
      "B" : 3, "C" : 3 , "M" : 3, "P" : 3,
      "F" : 4, "H" : 4, "V" : 4, "W" : 4, "Y" : 4,
      "K" : 5,
      "J" : 8, "X" : 8,
      "Q" : 10, "Z" : 10
    };

    if (word.length === 0) {
      throw 'Error: word cannot be empty!';
    }

    if (word.length > 7) {
      throw 'Error: word cannot have > 7 letters!';
    }

    let letters = word.toUpperCase().split('');
    let score = 0;

    for (let letter of letters) {
      if (!Object.keys(scoreChart).includes(letter)) {
        throw 'Error: word has bad character(s)';
      }
      for (let char in scoreChart) {
        if (letter === char) {
          score += scoreChart[char];
        }
      }
    }

    if (letters.length === 7) {
      score += 50;
    }

    return score;
  },

  highestScoreFrom(arrayOfWords) {
    if (!Array.isArray(arrayOfWords) || arrayOfWords.length === 0) {
      throw 'Error: no words were passed!';
    }

    let scores = {};

    for (let word of arrayOfWords) {
      let score = Scrabble.score(word);
      if (!scores[score]) {
        scores[score] = [word];
      }
      else {
        scores[score].push(word);
      }
    }

    let max_score = Math.max(...Object.keys(scores));
    let winner = scores[max_score][0];
    for (let word of scores[max_score]) {
      if (winner.length < 7 && (word.length == 7 || word.length < winner.length)) {
        winner = word;
      }
    }

    return winner;
  },
};

Scrabble.Player = class {

};


module.exports = Scrabble;

const LETTERVALUES = {
  A: 1, E: 1, I: 1, O: 1, U: 1, L: 1, N: 1, R: 1, S: 1, T: 1, D: 2, G: 2, B: 3, C: 3, M: 3, P: 3, F: 4, H: 4, V: 4, W: 4, Y: 4, K: 5, J: 8, X: 8, Q: 10, Z: 10
};

const Scrabble = {
  score(word) {
    if (word.length > 7) {
      throw "InvalidWord";
    }
    let wordPlayed = word.toUpperCase();
    let pattern = /[A-Z]/
    if (pattern.test(wordPlayed)) {
      let letters = wordPlayed.split("");
      let letterScores = [];
      letters.forEach(function(letter) {
        let num = LETTERVALUES[letter];
        if (num === undefined) {
          throw "InvalidWord";
        }
        letterScores.push(num);
        if (letterScores.length === 7) {
          letterScores.push(50);
        }
      });
      let wordScore = letterScores.reduce(function(acc, val) { return acc + val; });
      return wordScore
    } else {
      throw "InvalidWord";
    }
  },
  highestScoreFrom(arrayOfWords) {

  },
};



Scrabble.Player = class {

};

module.exports = Scrabble;


// TESTING
// let word = "HELLO";
// console.log(LETTERVALUES.(word.charAt(0)));
// console.log(LETTERVALUES.Z + LETTERVALUES.X);
// console.log(Object.keys(LETTERVALUES));

// console.log(Scrabble.score("hello"));
// console.log(Scrabble.score(""));
// console.log(Scrabble.score("!$%^&"));




//

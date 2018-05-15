const LETTERVALUES = {
  A: 1, E: 1, I: 1, O: 1, U: 1, L: 1, N: 1, R: 1, S: 1, T: 1, D: 2, G: 2, B: 3, C: 3, M: 3, P: 3, F: 4, H: 4, V: 4, W: 4, Y: 4, K: 5, J: 8, X: 8, Q: 10, Z: 10
};

const Scrabble = {
  score(word) {
    let wordPlayed = word.toUpperCase();
    let letters = wordPlayed.split("");
    let letterScores = [];
    letters.forEach(function(letter) {
      let num = LETTERVALUES[letter];
      letterScores.push(num);
    });
    let wordScore = letterScores.reduce(function(acc, val) { return acc + val; });
    return wordScore
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

console.log(Scrabble.score("hello"));



//

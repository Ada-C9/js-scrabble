const scores = {
  'A': 1,
  'E': 1,
  'I': 1,
  'O': 1,
  'U': 1,
  'L': 1,
  'N': 1,
  'R': 1,
  'S': 1,
  'T': 1,
  'D': 2,
  'G': 2,
  'B': 3,
  'C': 3,
  'M': 3,
  'P': 3,
  'F': 4,
  'H': 4,
  'V': 4,
  'W': 4,
  'Y': 4,
  'K': 5,
  'J': 8,
  'X': 8,
  'Q': 10,
  'Z': 10
}
const Scrabble = {
  score(word) {
    // add error reporting here to check that word is valid
    word = word.toUpperCase();
    let word_score = [];

    for (let i = 0; i < word.length; i += 1) {
      word_score.push(scores[word[i]]);
    }

    return word_score.reduce(function(acc, val) { return acc + val; });
  },
  // highestScoreFrom(arrayOfWords) {
  //
  // },
};

Scrabble.Player = class {

};


module.exports = Scrabble;
console.log(Scrabble.score("word"));

//A, E, I, O, U, L, N, R, S, T	1
// D, G	2
// B, C, M, P	3
// F, H, V, W, Y	4
// K	5
// J, X	8
// Q, Z	10
const Scrabble = {
  const scoreBoard = {
    'A': 1, 'E': 1, 'I': 1, 'O': 1, 'U': 1, 'L': 1, 'N': 1, 'R': 1, 'S': 1, 'T': 1,
    'D': 2, 'G': 2,
    'B': 3, 'C': 3, 'M': 3, 'P': 3,
    'F': 4, 'H': 4, 'V': 4, 'W': 4, 'Y': 4,
    'K': 5,
    'J': 8, 'X': 8,
    'Q': 10, 'Z': 10
  };

  score(word) {
    // split our word into an array of characters
    let wordArray = word.split("");
    // if the word <= 7 in length proceed
    while (wordArray.length <= 7) {
      // look at each letter in the array and scoreboard and then reassign value at index to value from scoreBoard wordArray[i] = scoreBoard[wordArray[i]]
      for (let i = 0; i < wordArray.length; i++;) {
        wordArray[i] = scoreBoard[wordArray[i]]
        // TODO: return a sum of this array now that values have been assigned

      }
    });
  },


  highestScoreFrom(arrayOfWords) {

  },
};

Scrabble.Player = class {

};


module.exports = Scrabble;

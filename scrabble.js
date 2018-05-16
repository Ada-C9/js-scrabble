
const scoringRubrik = {
  'a': 1,
  'e': 1,
  'i': 1,
  'o': 1,
  'u': 1,
  'l': 1,
  'n': 1,
  'r': 1,
  's': 1,
  't': 1,
  'd': 2,
  'g': 2,
  'b': 3,
  'c': 3,
  'm': 3,
  'p': 3,
  'f': 4,
  'h': 4,
  'v': 4,
  'w': 4,
  'y': 4,
  'k': 5,
  'j': 8,
  'x': 8,
  'q': 10,
  'z': 10
};

const Scrabble = {
  score(w) {
    if (w == "" || w == null || typeof(w) !== 'string') {
      throw 'Must provide a sentence with valid characters'
    }

    let word = w.toLowerCase();

    let wordScore = 0;
    for (let letter of word) {
      if (Object.keys(scoringRubrik).includes(letter)) {
        wordScore += scoringRubrik[letter]
      } else {
        throw new Error('Enter valid letter.')
      }
      // console.log(`letter is ${letter} and value is ${scoringRubrik[letter]}`)
    }
    switch(true) {
      case (word.length == 7):
      return wordScore + 50;
      case (word.length == 0):
      return null;
      case (word.length <= 6 && word.length >= 1):
      return wordScore;
      case (word.length > 7):
      throw 'Must be less than or equal to 7 letters';
    }
    // console.log('Length is ' + typeof(length) + ' and it is ' + length)
  },

  highestScoreFrom(arrayOfWords) {

    //TODO:
  }
}

Scrabble.Player = class {
};

module.exports = Scrabble;

console.log(Scrabble.score('qfc'));
// console.log(Scrabble.score(999));
// word.split().forEach(function(letter){
//   if (Object.keys(scoringRubrik).includes(letter)) {
//     wordScore += scoringRubrik[letter]
//   }
// });
// console.log(word);

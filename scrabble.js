
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
    // if(!w) { return null}
    // if(typeof(w) !== String) { throw new Error('Enter valid letter.'); }
    // new Error('Name cannot be blank.')

    let word = w.toLowerCase();

    let wordScore = 0;
    for (let letter of word) {
      if (Object.keys(scoringRubrik).includes(letter)) {
        wordScore += scoringRubrik[letter]

        console.log(`letter is ${letter} and value is ${scoringRubrik[letter]}`)
      }
      // else {
      //   throw new Error('Enter valid letter.')
      // }

      switch(true) {
        case (word.length == 7):
        return wordScore + 50;
        case (word.length == 0):
        return null;
        case (word.length <= 6 && word.length >= 1):
        return wordScore;
      }
      // console.log('Length is ' + typeof(length) + ' and it is ' + length)


      return wordScore;
    }
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

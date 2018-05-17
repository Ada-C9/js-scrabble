
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
    // return word in the array with the highest score.
    // if the top score is tied between multiple words, pick the one with the fewest letters.
    // Note that there is a bonus (50 points) for using all seven letters. If the top score is tied between multiple words and one used all seven letters, choose the one with seven letters over the one with fewer tiles.
    // If the there are multiple words that are the same score and same length, pick the first one in supplied list.
    // if (arrayOfWords === undefined || arrayOfWords.length == 0) {
    //   throw 'No words passed!';
    // }
      let max = arrayOfWords[0];

      arrayOfWords.forEach(function(challengerScore) {
        if (challengerScore > max) {
          max = challengerScore;
        }
      });
    return max
  }
}

// breakTie(incumbent, challenger) {
//   if (incumbent.length == 7) {
//     return incumbent;
//   } else if (challenger.length == 7) {
//     return challenger;
//   }
//
//   if (challenger.length > incumbent.length) {
//     return incumbent;
//   } else if (challenger.length < incumbent.length) {
//     return  challenger
//   } else if (incumbent.length == challenger.length) {
//     return incumbent
//   }
// }

Scrabble.Player = class {
};

module.exports = Scrabble;

// console.log(Scrabble.score('qfc'));
// console.log(Scrabble.score(999));
console.log(Scrabble.highestScoreFrom([7,13,2]));

// word.split().forEach(function(letter){
//   if (Object.keys(scoringRubrik).includes(letter)) {
//     wordScore += scoringRubrik[letter]
//   }
// });
// console.log(word);

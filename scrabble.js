const tileBag =
{
  a: {'quantity': 9, 'value': 1 },
  b: {'quantity': 2, 'value': 3 },
  c: {'quantity': 2, 'value': 3 },
  d: {'quantity': 4, 'value': 2 },
  e: {'quantity': 12, 'value': 1 },
  f: {'quantity': 2, 'value': 4 },
  g: {'quantity': 3, 'value': 2 },
  h: {'quantity': 2, 'value': 4 },
  i: {'quantity': 9, 'value': 1 },
  j: {'quantity': 1, 'value': 8 },
  k: {'quantity': 1, 'value': 5 },
  l: {'quantity': 4, 'value': 1 },
  m: {'quantity': 2, 'value': 3 },
  n: {'quantity': 6, 'value': 1 },
  o: {'quantity': 8, 'value': 1 },
  p: {'quantity': 2, 'value': 3 },
  q: {'quantity': 1, 'value': 10 },
  r: {'quantity': 6, 'value': 1 },
  s: {'quantity': 4, 'value': 1 },
  t: {'quantity': 6, 'value': 1 },
  u: {'quantity': 4, 'value': 1 },
  v: {'quantity': 2, 'value': 4 },
  w: {'quantity': 2, 'value': 4 },
  x: {'quantity': 1, 'value': 8 },
  y: {'quantity': 2, 'value': 4 },
  z: {'quantity': 1, 'value': 10 }
} // ends 'let tileBag'

const Scrabble = {
  score: function (word) {
    // set total to 0
    let total = 0;

    word = word.toLowerCase();
    let testWord = /^[a-z]+$/;
    if ( (word === undefined) || (word === "")  || (!testWord.test(word)) ) {
      throw "Invalid entry!";
    } else if (word.length > 7) {
      throw "Word is too long! It must be less than 7 characters";
    } // ends if/else if

    // SPLIT WORD
    let splitWord = word.split('');

    if (splitWord.length === 7) {
      total += 50;
    }

    // SCORE THE INDIVIDUAL LETTERS IN THE WORD - USING A LOOP -- example: forEach (function (letter) {<...>})
    splitWord.forEach (function(letter) {
      // INSIDE OF LOOP: CHECK THE VALUE OF THE LETTER
      total += tileBag[letter].value;
    });
    return total

  }, // ends 'score: function (word)'

  ////////////////////////////////////////////////////////////

  highestScoreFrom(arrayOfWords) {
    if (arrayOfWords.length === 0) {
      throw "It's empty! Why????";
    }

    let scoredWordsHash = {}
    let winnerHash = {}
    let highestScore = 0

    arrayOfWords.forEach(function(providedWord) {
      highestScore = Scrabble.highestScore(providedWord);
      scoredWordsHash[providedWord] = highestScore;
    });

  }, // ends 'highestScoreFrom'

};// const Scrabble








Scrabble.Player = class {

}; // ends 'const Scrabble'


module.exports = Scrabble;


// initialize the letter values

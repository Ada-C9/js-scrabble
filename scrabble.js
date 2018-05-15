
const scrabbleTiles = {
  a: 1,
  e: 1,
  i: 1,
  o: 1,
  u: 1,
  l: 1,
  n: 1,
  r: 1,
  s: 1,
  t: 1,
  d: 2,
  g: 2,
  b: 3,
  c: 3,
  m: 3,
  p: 3,
  f: 4,
  h: 4,
  v: 4,
  w: 4,
  y: 4,
  k: 5,
  j: 8,
  x: 8,
  q: 10,
  z: 10,
};

const Scrabble = {
  score(word) {

    word = word.toLowerCase()
    let totalScore = 0

    // if statement to check if the word has bad characters and space
    if (/[[\W][\s]+?]/.match(word)) {
      consol.log('invalid word');
    }

    // if word only has good character then the below will execute
    let scrabbleWord = word.split('')

    if (scrabbleWord.length > 7 || scrabbleWord.length == 0) {
      console.log('null')
    } else if (scrabbleWord.length == 7) {
      console.log(totalScore += 50)
    }

    // output the score of each letter in a word
    scrabbleWord.forEach( function(letter) {


    }

    return totalScore


  },

  highestScoreFrom(arrayOfWords) {

  },
};

Scrabble.Player = class {

};


module.exports = Scrabble;

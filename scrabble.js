const LETTERVALUES = {
  A: 1, E: 1, I: 1, O: 1, U: 1, L: 1, N: 1, R: 1, S: 1, T: 1, D: 2, G: 2, B: 3, C: 3, M: 3, P: 3, F: 4, H: 4, V: 4, W: 4, Y: 4, K: 5, J: 8, X: 8, Q: 10, Z: 10
};

const sortWordsByLength = function sortWordsByLength(arr){
  return arr.sort((a, b) => a.length - b.length);
}

const Scrabble = {
  score(word) {
    // if word played is more than 7 tiles or 0 tiles, it is invalid.
    if (word.length > 7 || word.length === 0) {
      throw "Invalid word";
    }
    // convert input to all uppercase
    let wordPlayed = word.toUpperCase();
    // establish a regex pattern and test input against it
    let pattern = /[A-Z]/
    if (pattern.test(wordPlayed)) {
      // split input into an array of letters
      let letters = wordPlayed.split("");
      let letterScores = [];
      // iterate through letters array and check if it exists as a key in the LETTERVALUES object (note: dot notation (LETTERVALUES.letter) does NOT work.)
      letters.forEach(function(letter) {
        let num = LETTERVALUES[letter];
        if (num === undefined) {
          throw "Invalid word";
        }
        // if it exists, push the num (aka value from hash) to letterScores array
        letterScores.push(num);
        if (letterScores.length === 7) {
          letterScores.push(50);
        }
      });
      // sum up the values in the lettersScores array using arrow function
      let wordScore = letterScores.reduce((acc, val) => acc + val);
      return wordScore
    } else {
      throw "Invalid word";
    }
  },
  highestScoreFrom(arrayOfWords) {
    // instantiate open array to hold word scores and max score variable
    let scores = []
    let maxScore = 0
    // check if input array is empty
    if (arrayOfWords.length === 0) {
      throw "Input empty";
    // if array has only one word, return that word
    } else if (arrayOfWords.length === 1) {
      return arrayOfWords[0];
    } else {
      // iterate through array of words, score each one, and store each score in scores array
      for (let word of arrayOfWords) {
        scores.push(this.score(word));
      }
      // find the max value in the scores array
      maxScore = scores.reduce((a, b) => Math.max(a, b));
    }
    // find how many times the max score appears in the scores array, return indices
    let indices = [];
    scores.forEach(function(score, i) {
      if (score === maxScore) {
        indices.push(i);
      }
    });
    // map the indices to the corresponding indices in the original arrayOfWords, and handle the words at those indices...
    let winning_words = [];
    indices.forEach(function(i) {
      winning_words.push(arrayOfWords[i]);
    });
    // if winning words array contains only one element, return corresponding element in arrayOfWords
    if (winning_words.length === 1) {
      return winning_words[0];
    // if winning words array has more than one element, return one where word length is 7
    } else if (winning_words.length > 1) {
      if (winning_words.some(function(word) { return word.length === 7; })) {
        return winning_words.find(word => word.length === 7);
      } else {
        let sorted_words = sortWordsByLength(winning_words);
        return sorted_words[0];
      }
    }
  },
};

Scrabble.Player = class {
  constructor(name) {
    if (typeof name === 'undefined') {
      throw new Error('You must provide a name.');
    }
    this.name = name;
    this.plays = [];
  }
  hasWon() {
    if (this.totalScore() >= 100) {
      return true;
    } else {
      return false;
    }
  }
  totalScore() {
    let sum = 0;
    for (let i = 0; i < this.plays.length; i++) {
      sum += Scrabble.score(this.plays[i]);
    }
    return sum;
  }
  play(word) {
    if (typeof word !== "string" || word.length === 0) {
      throw new Error('Invalid word.');
    }
    if (this.hasWon()) {
      return false;
    } else {
      this.plays.push(word);
      return true;
    }
  }
};

module.exports = Scrabble;


// TESTING
// words = ['i', 'dog', 'cat']
// console.log(Scrabble.highestScoreFrom(words));
const word = 'dog';
const player = new Scrabble.Player('test player');
player.play(word);
//

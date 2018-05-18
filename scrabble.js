const scoreTable = {
  'a': { 'points':  1, 'tiles':  9 },
  'b': { 'points':  3, 'tiles':  2 },
  'c': { 'points':  3, 'tiles':  2 },
  'd': { 'points':  2, 'tiles':  4 },
  'e': { 'points':  1, 'tiles': 12 },
  'f': { 'points':  4, 'tiles':  2 },
  'g': { 'points':  2, 'tiles':  3 },
  'h': { 'points':  4, 'tiles':  2 },
  'i': { 'points':  1, 'tiles':  9 },
  'j': { 'points':  8, 'tiles':  1 },
  'k': { 'points':  5, 'tiles':  1 },
  'l': { 'points':  1, 'tiles':  4 },
  'm': { 'points':  3, 'tiles':  2 },
  'n': { 'points':  1, 'tiles':  6 },
  'o': { 'points':  1, 'tiles':  8 },
  'p': { 'points':  3, 'tiles':  2 },
  'q': { 'points': 10, 'tiles':  1 },
  'r': { 'points':  1, 'tiles':  6 },
  's': { 'points':  1, 'tiles':  4 },
  't': { 'points':  1, 'tiles':  6 },
  'u': { 'points':  1, 'tiles':  4 },
  'v': { 'points':  4, 'tiles':  2 },
  'w': { 'points':  4, 'tiles':  2 },
  'x': { 'points':  8, 'tiles':  1 },
  'y': { 'points':  4, 'tiles':  2 },
  'z': { 'points': 10, 'tiles':  1 },
  'blank': { 'tiles': 2}
}


const findPoints = function findPoints(letter) {
  let lowercase_letter = letter.toLowerCase();
  let points = scoreTable[lowercase_letter]['points'];

  return points;
}

const checkWord = function permissableWord(word) {
  let pattern = /[^a-zA-Z]/;

  if (word === '') {
    throw "Word cannot be empty";
  } else if (pattern.test(word)) {
    throw "Must be a real word";
  } else if (word.length > 7) {
    throw "More than 7 letters not allowed";
  }
}

const checkArrayOfWords = function checkArrayofWords(arrayOfWords) {
  if (arrayOfWords.length === 0) {
    throw "List of words cannot be empty";
  }
}

// const highestScoreTieBreaker = function highestScoreTieBreaker(maxWord, word) {
//   if (maxWord.length != 7 && word.length == 7) {
//     maxWord = word
//   }
//
//   if (maxWord.length != 7 && word.length != 7 && maxWord.length > word.length) {
//     maxWord = word;
//   }
// }

const Scrabble = {
  score(word) {
    checkWord(word);

    let score = 0;
    if (word.length === 7) {
      score += 50;
    }
    for (let i = 0; i < word.length; i++) {
      let points = findPoints(word[i]);
      score += points;
    }
    return score;
  },

  highestScoreFrom(arrayOfWords) {
    checkArrayOfWords(arrayOfWords);

    let maxWord = null;
    let maxPoints = null;

    arrayOfWords.forEach(function (word) {
      let score = Scrabble.score(word);


      if (maxPoints === score) {

        // highestScoreTieBreaker(maxWord, word);

        if (maxWord.length != 7 && word.length == 7) {
          maxWord = word
        }
        if (maxWord.length != 7 && word.length != 7 && maxWord.length > word.length) {
          maxWord = word;
        }

      } else if (maxPoints < score) {
        maxWord = word;
        maxPoints = score;
      }

    });
    return maxWord;
  }
}


Scrabble.Player = class {
  constructor(name, plays = []) {
    if (name === undefined ) {
      throw "Player must have a name"
    }

    this.name = name;
    this.plays = plays;
  }

  play(word) {
    checkWord(word);
    return (this.hasWon() ? false : this.plays.push(word));
  }

  totalScore() {
    let wordsPlayed = this.plays;
    let total = 0;
    wordsPlayed.forEach(function (word) {
      total += Scrabble.score(word);
    })
    return total;
  }

  hasWon() {
    let total = this.totalScore();
    return (total >= 100);
  }

  highestScoringWord() {
    let plays = this.plays;
    return Scrabble.highestScoreFrom(plays);
  }

  highestWordScore() {
    let word = this.highestScoringWord();
    return Scrabble.score(word);
  }
};


module.exports = Scrabble;

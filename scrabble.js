
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
  isLetter(letter) {
    return /[a-z]/.test(letter);
  },

  score(word) {
    word = word.toLowerCase();
    let totalScore = 0;

    if (word.length > 7) {
      throw 'Invalid word: too many tiles.';
    } else if (word.length === 0) {
      throw 'Invalid word: must provide tiles.';
    } else if (word.length === 7) {
      totalScore += 50;
    }

    for (let letter of word) {
      if (this.isLetter(letter)) {
        totalScore += scrabbleTiles[letter];
      } else {
        throw 'Invalid word: must include letters that are acceptable.';
      }
    }

    return totalScore;
  },

  highestScoreFrom(arrayOfWords) {
    let topWord = arrayOfWords[0];

    if (typeof arrayOfWords !== 'object' || arrayOfWords.length === 0) {
      throw 'Invalid array.';
    }

    arrayOfWords.forEach((word) => {
      if (this.score(word) > this.score(topWord)) {
        topWord = word;
      } else if (this.score(word) === this.score(topWord)) {
        topWord = this.breakTie(topWord, word);
      }
    });

    return topWord;
  },

  breakTie(originWinner, challenger) {
    if (originWinner.length === 7) {
      return originWinner;
    } else if (challenger.length === 7) {
      return challenger;
    } else if (challenger.length < originWinner.length){
      return challenger;
    } else {
      return originWinner;
    }
  },
};

Scrabble.Player = class {
  constructor(name) {
    if (!name) {
      throw 'Invalid name: must provide a name';
    }

    this.name = name;
    this.playsArray = [];
  }

  plays() {
    return this.playsArray;
  }

  play(word) {
    if (word === '') {
      throw 'Invalid word, can\'t be empty.';
    }

    for (let letter of word) {
      if (!Scrabble.isLetter(letter)) {
        throw 'Invalid word: must include letters that are acceptable.';
      }
    }

    if (this.hasWon()) {
      return false;
    } else {
      this.playsArray.push(word);
      return Scrabble.score(word);
    }
  }

  totalScore() {
    let playerScore = 0;

    this.plays().forEach((word) => {
      playerScore += Scrabble.score(word);
    });

    return playerScore;
  }

  hasWon() {
    return this.totalScore() >= 100
  }

  highestScoringWord() {
    return Scrabble.highestScoreFrom(this.plays());
  }

  highestWordScore() {
    return Scrabble.score(this.highestScoringWord());
  }
};


module.exports = Scrabble;


// // test the methods manually to ensure they work properly.
// let myWord = Scrabble.score('pig');
// console.log(myWord);
// let myArray = Scrabble.highestScoreFrom(['cat', 'pig']);
// console.log(myArray)
//
// let player = new Scrabble.Player('test name');
// let word = 'dog';
//
// console.log(player.play(word));

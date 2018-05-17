// Start Scores Object
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

const letters = [
  'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A',
  'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
  'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I',
  'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',
  'U', 'U', 'U', 'U',
  'L', 'L', 'L', 'L',
  'N', 'N', 'N', 'N', 'N', 'N',
  'R', 'R', 'R', 'R', 'R', 'R',
  'S', 'S', 'S', 'S',
  'T', 'T', 'T', 'T', 'T', 'T',
  'D', 'D', 'D', 'D',
  'G', 'G', 'G',
  'B', 'B',
  'C', 'C',
  'M', 'M',
  'P', 'P',
  'F', 'F',
  'H', 'H',
  'V', 'V',
  'W', 'W',
  'Y', 'Y',
  'K',
  'J',
  'X',
  'Q',
  'Z'
];

// Start Scrabble Object
const Scrabble = {
  // helper method will return true if input word is valid
  isValid(word) {
    if (typeof word !== 'string') {
      return false;
    }

    if ( /^[a-zA-Z]+$/.test(word) ) {
      return true;
    }
  },

  score(word) {
    // validations on word input
    if ( !Scrabble.isValid(word) ) {
      throw new Error('Please enter valid letters.');
    }

    if (word.length > 7 || word.length < 1) {
      throw new Error('Word must be no more than 7 letters.');
    }

    // begin scoring word functionality
    word = word.toUpperCase();
    let wordScore = [];

    for (let i = 0; i < word.length; i += 1) {
      wordScore.push(scores[word[i]]);
    }

    let totalScore = wordScore.reduce(function(acc, val) { return acc + val; });

    if (word.length == 7) {
      totalScore += 50;
    }

    return totalScore;
  },

  highestScoreFrom(arrayOfWords) {
    // validation on array of words
    if (arrayOfWords.length === 0) {
      throw new Error('No words were passed.');
    }

    // begin highest score functionality
    let topScores = [];
    let maxScore = 0;

    for (let word of arrayOfWords) {
      let wordScore = this.score(word);
      if (wordScore == maxScore) {
        topScores.push(word);
      }
      if (wordScore > maxScore) {
        maxScore = wordScore;
        topScores = [];
        topScores.push(word);
      }
    }
    let lengthToBeat = 6;
    let shortestWord = null;

    if (topScores.length > 1) {
      for (let word of topScores) {
        if ( word.length === 7 ) {
          return word;
        }
        else if (word.length < lengthToBeat) {
          lengthToBeat = word.length
          shortestWord = word;
        }
      }
      return shortestWord;
    }
    return topScores[0]
  }

};

// Begin player Class
Scrabble.Player = class {
  constructor(name) {
    if (name == null) {
      throw new Error('Name cannot be blank.');
    }
    this.name = name;
    this.plays = [];
    this.tiles = [];
  }

  drawTiles(num) {
    // check num of tiles
    for (let i = 1; i <= num; i++) {
      let randomNum = Math.floor(Math.random() * letters.length) + 1;
      this.tiles.push(letters[randomNum]);
      letters.splice(randomNum, 1);
    }
    return this.tiles;
  }

  play(word) {
    if (this.hasWon()) {
      return false;
    }
    if ( !Scrabble.isValid(word) ) {
      throw new Error('Invalid word.');
    }

    this.plays.push(word);
    return this.plays;
  }

  totalScore() {
    let playerScores = 0

    for (let word of this.plays) {
      playerScores += Scrabble.score(word);
    }
    return playerScores;
  }

  hasWon() {
    let totalScore = this.totalScore();
    if (totalScore >= 100) {
      return true;
    }
    else {
      return false;
    }
  }

  highestScoringWord() {
    let highestScoredWord = Scrabble.highestScoreFrom(this.plays);

    return highestScoredWord;
  }

  highestWordScore() {
    let highestScoredWord = Scrabble.highestScoreFrom(this.plays);

    let highScore = Scrabble.score(highestScoredWord);

    return highScore;
  }

};



module.exports = Scrabble;
console.log(Scrabble.scores);
let sam = new Scrabble.Player('Sam');
console.log(sam.name);
// sam.play('cat');
// sam.play('octopus');
// console.log(sam.highestScoringWord());
// console.log(sam.hasWon());
console.log(sam.drawTiles(2));


const Scrabble =  {

  score(word) {
    const letterValues = { "A": 1, "B":3, "C":3, "D": 2, "E": 1, "F":4, "G":2, "H":4, "I":1, "J":8, "K":5, "L":1,
    "M": 3, "N": 1, "O": 1, "P": 3, "Q": 10, "R": 1, "S": 1, "T": 1, "U": 1, "V": 4, "W": 4, "X": 8,
    "Y": 4, "Z": 10 };

    if (/^[a-zA-Z]+$/.test(word) && word.length <= 7) {

      word = word.toUpperCase();

      let wordScore = (word.length == 7)? 50 : 0;

      for (let i = 0; i < word.length; i+=1) {

        wordScore += letterValues[word.charAt(i)];
      }

      return wordScore;

    } else {
      throw "Word must only contain letters from A-Z and have less than or equal to 7 characters";
    }
  },

  highestScoreFrom(arrayOfWords) {

    if (arrayOfWords.length === 0) {

      throw new Error('Array of words can not be empty');

    } else if (arrayOfWords.length === 1) {

      return arrayOfWords[0];

    } else {

      const winningWord = arrayOfWords.reduce((word1, word2) => {
        const scoreWord1 = Scrabble.score(word1);
        const scoreWord2 = Scrabble.score(word2);

        if (scoreWord1 > scoreWord2 || word1.length === 7) {
          return word1;

        } else if (scoreWord2 > scoreWord1 || word2.length === 7) {
          return word2;
        }

        if (word1.length === word2.length || word1.length < word2.length) {
          return word1;
        }

        return word2;

      });

      return winningWord;
    }
  },
};

Scrabble.Player = class {
  constructor(name) {
    if (name.length > 0 || typeof name === 'string') {
      this.name = name;
    }
    else {
      throw new Error('Please enter name of the player');
    }

    this.plays =[];

  }

  play(word) {

    if (word === " "|| typeof word !== 'string') {
      throw new Error('Please enter a valid word');
    }
    if (this.hasWon()) {
      return false;
    }
    this.plays.push(word);
    return true;
  }


  totalScore() {

    let total = 0;
    for (let word of this.plays) {
      total += Scrabble.score(word);
    }
    return total;
  }

  hasWon() {

    let won = (this.totalScore() >= 100) ? true:false;
    return won;
  }

  highestScoringWord() {

    return Scrabble.highestScoreFrom(this.plays);
  }

  highestWordScore() {

    return Scrabble.score(this.highestScoringWord());
  }

};

// Optional Enhancements

// TODO: I need to improve the TilesBag. The way I made the tiles in the constructor
// I know is not the best way.

Scrabble.TilesBag = class {
  constructor() {
    this.tiles = ['A','A','A','A','A','A','A','A','A','B','B','C','C','D','D','D','D',
    'E','E','E','E','E','E','E','E','E','E','E','E','F','F','G','G','G','H','H','I','I','I','I','I','I',
    'I','I','I','J','K','L','L','L','L','M','M','N','N','N','N','N','N,','O','O','O','O','O','O','O','O',
    'P','P','Q','R','R','R','R','R','R','S','S','S','S','T','T','T','T','T','T','U','U','U','U','V','V',
    'W','W','X','Y','Y','Z'];
  }

  drawTiles(number) {

    if (number > this.tilesRemaining()) {
      throw new Error('No enough tiles');
    }
    let hand = [];
    for (let i = 0; i < number; i+=1) {
      let rand = Math.floor(Math.random() * this.tiles.length);
      hand.push(this.tiles[rand]);
      this.tiles.splice(rand, 1);
      // splice removes items from an array. changes the original array
    }
    return hand;
  }

  tilesRemaining() {
    if (this.tiles.length === 0) {
      return 'No more tiles in the bag'
    }
    return this.tiles.length;
  }

};
module.exports = Scrabble;


// console.log(Scrabble.score("ZZzzZZ"));
// console.log(Scrabble.score("baby"));
// console.log(Scrabble.highestScoreFrom(["ZZzzZZ", "zzzzzzz", "pedro"]));
// console.log(Scrabble.highestScoreFrom(["QQQQQQQ", "zzzzzzz", "pedro"]));
// console.log(Scrabble.score("QQQQQQQ"));

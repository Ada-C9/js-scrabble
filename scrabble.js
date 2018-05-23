const Scrabble = {

  getPoint(letter) {
    let point = 0;
    if (['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'].includes(letter)) {
      point = 1;
    } else if (['D', 'G'].includes(letter)) {
      point = 2;
    } else if (['B', 'C', 'M', 'P'].includes(letter)) {
      point = 3;
    } else if (['F', 'H', 'V', 'W', 'Y'].includes(letter)) {
      point = 4;
    } else if (['K'].includes(letter)) { point = 5;
    } else if (['J', 'X'].includes(letter)) {
      point = 8;
    } else if (['Q', 'Z'].includes(letter)) {
      point = 10;
    }
    return point;
  },

  isLetter(char) {
    return /[A-Z]/.test(char);
  },

  score(word) {
    if ( word.length == 0 || word.length > 7) {
      throw 'Invalid input for a word, word length must between 1 to 7';
    }

    word = word.toUpperCase();
    for (let letter of word) {
      if (this.isLetter(letter) == false) {
        throw `Invalid input, only letters are accepted`;
      }
    }

    let total = 0;
    if (word.length == 7) {
      total += 50;
    }

    for(let letter of word) {
      total += this.getPoint(letter);
    }
    return total;
  },

  tieWinner(winners) {
    let winner = winners[0];
    if (winner.length == 7) {
      return winner;
    }

    winners.forEach((candidate) => {
      if (winner.length > candidate.length && winner.length < 7) {
        winner = candidate;
      } else if (candidate.length == 7) {
        winner = candidate;
        return winner;
      }
    });

    return winner;
  },

  highestScoreFrom(arrayOfWords) {
    if (arrayOfWords.length == 0) {
      throw 'No words to compare';
    } else if (arrayOfWords.length == 1) {
      return arrayOfWords[0];
    }

    let scoreObj = {};
    let maxScore = 0;
    arrayOfWords.forEach((word) => {
      scoreObj[word] = this.score(word);
      if (maxScore < scoreObj[word]) {
        maxScore = scoreObj[word];
      }
    });

    let winners = [];
    for(let word in scoreObj) {
      if (scoreObj[word] == maxScore) {
        winners.push(word);
      }
    }

    if (winners.length == 1) {
      return winners[0];
    } else {
      return this.tieWinner(winners);
    }
  },

  Player: class Player {
    constructor(name, words = []) {
      if (name == null) {
        throw `Invalid input for player name`
      }
      this.name = name;
      this.plays = words;
    }

    hasWon() {
      let totalScores = 0;
      this.plays.forEach((word) => totalScores += Scrabble.score(word));

      return totalScores >= 100 ? true : false;
    }

    play(word) {
      if (this.hasWon()) {
        return false;
      }

      if (word == null) {
        throw 'Word can not be empty';
      } else {
        for (let letter of word) {
          if (Scrabble.isLetter(letter.toUpperCase) == false) {
            throw 'Invalid input for a word';
          }
        }
      }
      this.plays.push(word);
      return this.plays
    }

    totalScore() {
      if(this.plays.length == 0) {
        return 0;
      }

      let total = 0;
      this.plays.forEach( word => total += Scrabble.score(word) );
      return total;
    }

    highestScoringWord() {
      if(this.plays.length == 0) {
        throw 'No words have been played'
      }
      let wordsPlayed = this.plays;
      let maxWord = wordsPlayed[0];
      wordsPlayed.forEach( (word) => {
        if (Scrabble.score(word) > Scrabble.score(maxWord)) {
          maxWord = word;
        }
      })
      return maxWord;
    }

    highestWordScore() {
      return Scrabble.score(this.highestScoringWord());
    }

  },

  Tile: class Tile {
    constructor(letter) {
      this.letter = letter;
    }
  },

  TileBag: {
    startBag() {
      let bag = [];
      const TILE1 = ['J', 'K', 'Q', 'X', 'Z'];
      const TILE2 = ['B', 'C', 'F', 'H', 'M', 'P', 'V', 'W', 'Y'];
      const TILE3 = ['G'];
      const TILE4 = ['D', 'L', 'S', 'U'];
      const TILE6 = ['N', 'R', 'T'];
      const TILE8 = ['O'];
      const TILE9 = ['A', 'I'];
      const TILE12 = ['E'];

      for (let letter of TILE1) {
        bag.push(new Scrabble.Tile(letter));
      }

      for (let i = 0; i < 2; i++) {
        TILE2.forEach((letter) => {
          bag.push(new Scrabble.Tile(letter));
        })
      }

      for (let i = 0; i < 3; i++) {
        TILE3.forEach((letter) => {
          bag.push(new Scrabble.Tile(letter));
        })
      }

      for (let i = 0; i < 4; i++) {
        TILE4.forEach((letter) => {
          bag.push(new Scrabble.Tile(letter));
        })
      }

      for (let i = 0; i < 6; i++) {
        TILE6.forEach((letter) => {
          bag.push(new Scrabble.Tile(letter));
        })
      }

      for (let i = 0; i < 8; i++) {
        TILE8.forEach((letter) => {
          bag.push(new Scrabble.Tile(letter));
        })
      }

      for (let i = 0; i < 9; i++) {
        TILE9.forEach((letter) => {
          bag.push(new Scrabble.Tile(letter));
        })
      }

      for (let i = 0; i < 12; i++) {
        TILE12.forEach((letter) => {
          bag.push(new Scrabble.Tile(letter));
        })
      }

      return bag;
    },

    remainingTiles() {
      return this.startBag() - this.tilesDrawn;
    },

    tilesDrawn: [],

    drawTiles(num) {
      if (num > 7) {
        throw 'Cannot draw more than 7 tiles at a time';
      } else if (num > this.remainingTiles.length) {
        num = this.remainingTiles.length;
      }

      let tiles = [];
      for (let i = 0; i < num; i++) {
        tiles.push(this.remainingTiles.pop());
      }

      this.tilesDrawn += tiles;

      return tiles
    }
  }

};
module.exports = Scrabble;

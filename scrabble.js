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
    return (/[A-Z]/.test(char))
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
     if (totalScores > 100) {
       return true;
     } else {
       return false;
     }

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
  }

};


// const word = 'dog';
// const player = new Scrabble.Player('test player');
//
// console.log(player.plays.length);
// console.log(player.play('coco'));
// console.log(player.play('water'));
// console.log(player.play('cdakda'));
// console.log(player.plays);
// console.log(Scrabble.score('COCO'));
// console.log(Scrabble.getPoint('K'));
// let testWords = ['iiiiddd','zzzzzz'];
// console.log(Scrabble.highestScoreFrom(testWords));
//
// let tesWords = ['zzzzzz', 'iiiiddd'];
// console.log(Scrabble.highestScoreFrom(tesWords));
// console.log(Scrabble.score('43729dha'));

module.exports = Scrabble;

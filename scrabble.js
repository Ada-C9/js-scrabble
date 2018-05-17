const scoreChart = {
  'A' : 1, 'B' : 3, 'C' : 3, 'D' : 2, 'E' : 1, 'F' :4, 'G' : 2, 'H' : 4, 'I' : 1, 'J' : 8, 'K' : 5, 'L' : 1, 'M' : 3, 'N' : 1, 'O' : 1, 'P' : 3, 'Q' : 10, 'R' : 1, 'S' : 1, 'T' : 1, 'U' : 1, 'V' : 4, 'W' : 4, 'X' : 8, 'Y' : 4, 'Z' : 10};


  const Scrabble = {
    score(word) {
      let total = 0;
      let playedWord = word.toUpperCase();

      if (!playedWord.match(/^[a-zA-Z]{0,7}$/) || playedWord === '') {
        throw 'Invalid parameter!';
      }

      word.toUpperCase().split('').forEach(function(letter) {
        total += scoreChart[letter];
      });

      if (word.length == 7 && total > 0) {
        total += 50;
      }
      return total;
    },

    highestScoreFrom(arrayOfWords) {
      if (!(arrayOfWords instanceof Array) || (arrayOfWords.length == 0)) {
        throw 'Empty or invalid array';
      }
      let scores = arrayOfWords.map(word => this.score(word));
      let max = Math.max(...scores);
      let highestScoringWords = arrayOfWords.filter(word => this.score(word) == max );

      if (highestScoringWords.length == 1) {
        return highestScoringWords[0];
      }

      let highestScoringWord = highestScoringWords[0];
      for (let word of highestScoringWords) {
        if (word.length == 7) {
          return word;
        } else if (highestScoringWord.length > word.length) {
          highestScoringWord = word;
        }
      }

      return highestScoringWord;
    },
  };

  Scrabble.Player = class {
    constructor(name) {
      if (name.null || name == "") {
        throw 'Require name!';
      }
      this.name = name;
      this.plays = [];
    }

    play(word) {
      if (!word.match(/^[a-zA-Z]{0,7}$/) || word == '') {
        throw 'Invalid parameter!';
      }

      if (this.hasWon()) {
        return false;
      } else {
        this.plays.push(word);
        return Scrabble.score(word);
      }
    }

    totalScore() {
      return this.plays.map( word => Scrabble.score(word) ).reduce(function(acc, val) { return acc + val; }, 0);
    }

    hasWon() {
      return this.totalScore() >= 100;
    }

    highestScoringWord() {
      return Scrabble.highestScoreFrom(this.plays);
    }

    highestWordScore() {
      return Scrabble.score(this.highestScoringWord());
    }

  };




  module.exports = Scrabble;

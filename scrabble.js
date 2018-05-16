const Scrabble = {

  score(word) {
    let scoreChart = {
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
    };
    let wordCount = 0;
    if ( word.length === 0 || word.length > 7 ) {
      throw 'Invalid word';
    }

    let uppercase = word.toUpperCase().split('')
    if ( uppercase.length === 7 ) {
      wordCount += 50;
    }

    uppercase.forEach(function(letter) {
      if ( scoreChart[letter] === undefined ) {
        throw 'Invalid character(s)!';
      } else {
        wordCount += scoreChart[letter];
      }
    })
    return wordCount;
  },

  highestScoreFrom(arrayOfWords) {
    let scores = {}
    let nums = []

    if ( arrayOfWords.length === 0 ) {
      throw 'No words!';
    }

    arrayOfWords.forEach( function(word) {
      let score = Scrabble.score(word);

      if ( scores[score] === undefined ) { //new score
        scores[score] = word;
        nums.push(score)

      } else { //tied score
        if ( scores[score].length != 7 )
          if ( scores[score].length >  word.length ) {
            scores[score] = word;
          } else if ( scores[score].length <  word.length && word.length === 7 ) {
            scores[score] = word;
          }
        }
    });

    let max_score = Math.max(...nums);
    return scores[max_score]
  },
};

Scrabble.Player = class {
  constructor(name) {
    if (name === undefined ) {
      throw 'No name!';
    } else {
      this.name = name;
      this.plays = [];
      this.won = false;
      this.score = 0;
    }
  }

  play(word) {
    if ( this.won === false ) {
      if ( word === undefined || typeof word != 'string' ) {
        throw 'Invalid word!';
      } else {
        this.plays.push(word);
        this.score += Scrabble.score(word);
        if ( this.score >= 100 ) {
          this.won = true
        }
        return word;
      }
    } else {
      return false;
    }
  }

  totalScore() {
    return this.score
  }

  hasWon() {
    if ( this.score >= 100 ) {
      this.won = true
    }
    return this.won
  }

  highestScoringWord() {
    if ( this.plays.length === 0 ) {
      throw new Error (`No words!`);
    } else {
      return Scrabble.highestScoreFrom(this.plays)
    }
  }

  highestWordScore() {
    if ( this.plays.length === 0 ) {
      throw new Error (`No words!`);
    } else {
      return Scrabble.score(Scrabble.highestScoreFrom(this.plays));
    }
  }
};


module.exports = Scrabble;

// console.log(Scrabble.score('donkey'));
// let words = ['apple', 'donkey', 'maybe']
// console.log(Scrabble.highestScoreFrom(['apple', 'donkey', 'maybe']));

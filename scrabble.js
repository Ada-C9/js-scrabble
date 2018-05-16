const letterValues = {
  one: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'T'],
  two: ['D', 'G'],
  three: ['B', 'C', 'M', 'P'],
  four: ['F', 'H', 'V', 'W', 'Y'],
  five: ['K'],
  eight: ['J', 'X'],
  ten: ['Q', 'Z']
};

const Scrabble = {
  // playedWords: [],
  score(word) {
    let letters = word.toUpperCase().split("");
    if (letters.length > 7) {
      throw 'Your word can only be 7 letters or less';
    } else if (letters.length === 0) {
      throw 'Your word can\'t be empty';
    }
    let totalScore = 0;
    letters.forEach( function(char) {
      if (letterValues.one.includes(char)) {
        totalScore += 1;
      } else if (letterValues.two.includes(char)) {
        totalScore += 2;
      } else if (letterValues.three.includes(char)) {
        totalScore += 3;
      } else if (letterValues.four.includes(char)) {
        totalScore += 4;
      } else if (letterValues.five.includes(char)) {
        totalScore += 5;
      } else if (letterValues.eight.includes(char)) {
        totalScore += 8;
      } else if (letterValues.ten.includes(char)) {
        totalScore += 10;
      } else {
        throw 'Those aren\'t characters in this Scrabble Game';
      }
    });
    if (letters.length === 7) {
      totalScore += 50;
    }
    // self.playedWords.push(word)
    return totalScore;
  },
  highestScoreFrom(arrayOfWords) {
    if ( !Array.isArray(arrayOfWords) || arrayOfWords.length === 0 ) {
      throw 'We need to actually have words to compare';
    } else if (arrayOfWords.length === 1) {
      return arrayOfWords[0];
    } else {
      const scores = arrayOfWords.map(word => this.score(word));
      let highestScore = 0
      scores.forEach( function(score) {
        if (score > highestScore) {
          highestScore = score;
        }
      });
      const highestScoringWords = []
      scores.forEach( function(score, index) {
        if (score === highestScore) {
          highestScoringWords.push(arrayOfWords[index]);
        }
      });
      if (highestScoringWords.length === 1) {
        return highestScoringWords[0];
      } else {
        let shortestLength = 7;
        let shortestIndex = null;
        let sevenIndex = null;
        highestScoringWords.forEach(function(word, index) {
          if (word.length === 7) {
            sevenIndex = index;
          } else if (word.length < shortestLength) {
            shortestLength = word.length;
            shortestIndex = index;
          }
        });
        if (sevenIndex !== null) {
          return highestScoringWords[sevenIndex];
        } else {
          return highestScoringWords[shortestIndex];
        }
      }
    }
  },
};

Scrabble.Player = class {
  constructor(name) {
    if ( name === undefined ) {
      throw 'You need a name to play';
    }
    this.name = name;
    this.plays = [];
  }

  play(word) {
    if ( typeof word === 'string' && this.hasWon() === false) {
      this.plays.push(word);
      return true;
    } else if ( typeof word === 'string' && this.hasWon() === true) {
      return false;
    } else {
      throw 'We need a real word';
    }
  }

  totalScore() {
    let totalScore = 0;
    this.plays.forEach( function(play) {
      totalScore += Scrabble.score(play);
    });
    return totalScore;
  }

  hasWon() {
    return this.totalScore() >= 100;
  }

  highestScoringWord() {
    if (this.plays.length === 0 ) {
      throw 'A play has to be made';
    }
    return Scrabble.highestScoreFrom(this.plays);
  }

  highestWordScore() {
    // return Scrabble.score(this.highestScoringWord());
  }
};


module.exports = Scrabble;
// const player = new Scrabble.Player('meka')
//
// player.highestScoringWord()

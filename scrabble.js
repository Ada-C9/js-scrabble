

let letterValues = {
  A: 1,
  E: 1,
  I: 1,
  O: 1,
  U: 1,
  L: 1,
  N: 1,
  R: 1,
  S: 1,
  T: 1,
  D: 2,
  G: 2,
  B: 3,
  C: 3,
  M: 3,
  P: 3,
  F: 4,
  H: 4,
  V: 4,
  W: 4,
  Y: 4,
  K: 5,
  J: 8,
  X: 8,
  Q: 10,
  Z: 10
}

const Scrabble = {

  score(word) {

    if (word.length > 7 ) {
      throw "Words more than seven letters long are not allowed"  }
    if (word.length < 1) {
      throw "To be valid, a word needs to have at least one letter."
    }
    let totalScore = 0;
    if ( word.length === 7 ) {
          totalScore += 50
        }
    for (let ltr of word ) {
      let upcaseLtr = ltr.toUpperCase();
      if (! Object.keys(letterValues).includes(upcaseLtr) ) {
        throw 'Words can only contain Latin characters A through Z'
      }

      let letterPoints = letterValues[upcaseLtr];
      totalScore += letterPoints;
      }

    return totalScore;
  },

  highestScoreFrom(arrayOfWords) {

    if ( arrayOfWords.length == 0 ) {
      throw 'There are no words to score';
    }

    if ( arrayOfWords == null ) {
      throw 'We wre not given any words to score';
    }

    let highestScoringWord = arrayOfWords[0];

    let currentHighestScore = Scrabble.score(highestScoringWord);

    for (let playedWord of arrayOfWords ) {
      if ( Scrabble.score(playedWord) > currentHighestScore ) {
        currentHighestScore = Scrabble.score(playedWord);
        highestScoringWord = playedWord;
      }

      else if ( Scrabble.score(playedWord) === currentHighestScore ) {

        if ( highestScoringWord.length < 7 ) {
          if ( playedWord.length == 7 ) {
            currentHighestScore = Scrabble.score(playedWord);
            highestScoringWord = playedWord;
          }
          else if ( playedWord.length < highestScoringWord.length ) {
            currentHighestScore = Scrabble.score(playedWord);
            highestScoringWord = playedWord;
          }
        }
      }
    }
    return highestScoringWord;
  },
};

Scrabble.Player = class {

  constructor(name) {

    if ( name == null )  {
      throw 'Each player needs a name.';
    }
    this.name = name
    this.plays = []
  }

  totalScore() {
    let total = 0
    if (this.plays.length != 0 ) {
    for (let pastWord of this.plays ) {
      total += Scrabble.score(pastWord)
      }
    }
    return total;
  }

  hasWon() {
    let won = false;
    if ( this.totalScore() >= 100 ) {
      won = true
    }
    return won
  }

  play(word) {
    if ( Scrabble.score(word) >= 1 ) {
      if ( this.hasWon() == false )  {
      this.plays.push(word);
      this.totalScore();
     }
   }
  }

  highestScoringWord() {
    if ( this.plays.length == 0 ) {
      throw 'There are no words to compare';
    } else {
    return Scrabble.highestScoreFrom(this.plays);
  }
}

  highestWordScore() {
    if ( this.plays.length == 0 ) {
      throw 'There are no words to score';
    } else {
    return Scrabble.score(this.highestScoringWord);
    }
  }
};


module.exports = Scrabble;

// console.log(Scrabble.score('cat'))



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
      // if ( ltr.charCodeAt(0) > 90 && ltr.charCodeAt(0) < 97 ) {
      //    throw 'Words can only contain Latin characters A through Z'
      //  }
      //
      // if ( ltr.charCodeAt(0) < 65 || ltr.charCodeAt(0) < 122 ) {
      //     throw 'Words can only contain Latin characters A through Z'
      //   }
      let upcaseLtr = ltr.toUpperCase();
      // if ( letterValues[upcaseLtr].isNAN() ) {
      //   throw "Words can only contain Latin characters A through Z"
      // }
      let letterPoints = letterValues[upcaseLtr];
      totalScore += letterPoints;
      }
    return totalScore;
  },

  highestScoreFrom(arrayOfWords) {

    if ( arrayOfWords.length === 0 ) {
      throw "Currently, there are no words to score."
    }

    let highestScoringWord = arrayOfWords.first;

    let currentHighestScore = Scrabble.score(highestScoringWord);

    for (let playedWord of arrayOfWords ) {
      if ( Scrabble.score(playedWord) > currentHighestScore ) {
        currentHighestScore = Scrabble.score(playedWord);
        highestScoringWord = playedWord;
      }

      else if ( Scrabble.score(playedWord) === currentHighestScore ) {

        if ( playedWord.length === 7 && highestScoringWord.length != 7 ) {
          highestScoringWord = playedWord;
          currentHighestScore = Scrabble.score(playedWord);
        }

        else if ( playedWord.length < highestScoringWord.length ) {
          highestScoringWord = playedWord;
          currentHighestScore = Scrabble.score(playedWord);
        }
      }
    }
    return highestScoringWord;
  },
};

Scrabble.Player = class {
  // constructor(name) {
  //   this.name = name
  //   this.plays = []
  // }

  // hasWon() {
  //   let won = false;
  //   let overallScore = 0;
  //   if (this.plays.length === 0 ) {
  //     for (let pastWord of this.plays ) {
  //       overallScore += Scrabble.score(pastWord)
  //     }
  //   }
  //
  //   if ( overallScore >= 100 ) {
  //     won = true
  //   }
  //   return won
  // }

  // play(word) {
  //   if ( this.hasWon === true ) {
  //     return false;
  //   }
  //   this.plays << word
  // }

  // highestScoringWord() {
  //   Scrabble.highestScoreFrom(this.plays);
  // }

  // highestWordScore() {
  //   return `${this.highestScoringWord}`
  // }
};


module.exports = Scrabble;

console.log(Scrabble.score('cat'))

const tileBag =
{
  a: {'quantity': 9, 'value': 1 },
  b: {'quantity': 2, 'value': 3 },
  c: {'quantity': 2, 'value': 3 },
  d: {'quantity': 4, 'value': 2 },
  e: {'quantity': 12, 'value': 1 },
  f: {'quantity': 2, 'value': 4 },
  g: {'quantity': 3, 'value': 2 },
  h: {'quantity': 2, 'value': 4 },
  i: {'quantity': 9, 'value': 1 },
  j: {'quantity': 1, 'value': 8 },
  k: {'quantity': 1, 'value': 5 },
  l: {'quantity': 4, 'value': 1 },
  m: {'quantity': 2, 'value': 3 },
  n: {'quantity': 6, 'value': 1 },
  o: {'quantity': 8, 'value': 1 },
  p: {'quantity': 2, 'value': 3 },
  q: {'quantity': 1, 'value': 10 },
  r: {'quantity': 6, 'value': 1 },
  s: {'quantity': 4, 'value': 1 },
  t: {'quantity': 6, 'value': 1 },
  u: {'quantity': 4, 'value': 1 },
  v: {'quantity': 2, 'value': 4 },
  w: {'quantity': 2, 'value': 4 },
  x: {'quantity': 1, 'value': 8 },
  y: {'quantity': 2, 'value': 4 },
  z: {'quantity': 1, 'value': 10 }
} // ends 'let tileBag'

const Scrabble = {
  score(word) {

    let total = 0;

    word = word.toLowerCase();
    let testWord = /^[a-z]+$/;
    if ( (word === undefined) || (word === "")  || (!testWord.test(word)) ) {
      throw "Invalid entry!";
    } else if (word.length > 7) {
      throw "Word is too long! It must be less than 7 characters";
    } // ends if/else if

    let splitWord = word.split('');

    if (splitWord.length === 7) {
      total += 50;
    }

    splitWord.forEach (function(letter) {
      total += tileBag[letter].value;
    });
    return total

  }, // ends 'score: function (word)'

  highestScoreFrom(arrayOfWords) {
    if (arrayOfWords.length === 0) {
      throw "It's empty! Why????";
    }

    let bestWord = arrayOfWords[0];

    arrayOfWords.forEach((word) => {
      if (this.score(word) > this.score(bestWord)) {
        bestWord = word;
      } else if (this.score(word) === this.score(bestWord)) {
        bestWord = this.breakTie(bestWord, word);
      } // ends 'arrayOfWords'
    });
    return bestWord;
  }, // ends 'highestScoreFrom'

  breakTie(incumbent, challenger) {
    if (incumbent.length === 7) {
      return incumbent;
    } else if (challenger.length === 7) {
      return challenger;
    } else if ((challenger.length) < (incumbent.length)) {
      return challenger;
    } else {
      return incumbent;
    }
  }, // ends 'breakTie'
};// const Scrabble

Scrabble.Player = class {
  constructor(name) {
    this.name = name;
    this.plays = [];
    if (name === undefined) {
      throw "No name given!";
    }
  } // ends constructor
  play(word) {
    if (this.hasWon()) {
      return false;
    }

    word = word.toLowerCase();
    let testWord = /^[a-z]+$/;

    if ( (word === undefined) || (word === "")  || (!testWord.test(word)) ) {
      throw "Invalid entry!";
    } else {
      this.plays.push(word);
      return `You played the word ${word}!`
    }  // ends if (( word...

  } // ends play(word)

  totalScore() {
    let score = 0;

    for (let word of this.plays) {
    score += Scrabble.score(word);
    } //
  return score;
  } // ends totalScore

  hasWon() {
    if (this.totalScore() < 100) {
      return false;
    } else {
      return true;
    }
  } // ends hasWon

  highestScoringWord() {
    if (this.plays.length === 0) {
      throw "You haven't made any plays!!!!";
    }

    let winningWord = this.plays[0];
    for (let i = 1; i <= this.plays.length - 1; i += 1) {
      if (Scrabble.score(this.plays[i]) > Scrabble.score(winningWord) ) {
        winningWord = this.plays[i];
      }
    }
    return winningWord;
  } // ends highestScoringWord


  highestWordScore() {
    return Scrabble.score(this.highestScoringWord())
  } // ends highestWordScore

}; // ends 'Scrabble.Player' class


module.exports = Scrabble;

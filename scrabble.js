const SCORE = {
  a: 1,
  b: 3,
  c: 3,
  d: 2,
  e: 1,
  f: 4,
  g: 2,
  h: 4,
  i: 1,
  j: 8,
  k: 5,
  l: 1,
  m: 3,
  n: 1,
  o: 1,
  p: 3,
  q: 10,
  r: 1,
  s: 1,
  t: 1,
  u: 1,
  v: 4,
  w: 4,
  x: 8,
  y: 4,
  z: 10
}


const Scrabble = {

  score(word) {
    if ( word === "" ) throw "empty";
    if ( word.length > 7 ) throw "too many letters";
    if ( word.match(/[^a-zA-Z]/) ) throw "invalid characters";

    let total = 0

    if (word.length === 7) {
      total += 50
    }

    for (let i = 0; i < word.length; i += 1) {
      let letter = word.charAt(i).toLowerCase()
      total += SCORE[letter]
    }
    return total
  },

  highestScoreFrom(arrayOfWords) {

    if ( arrayOfWords.length === 0 ) throw "empty";
    if ( arrayOfWords.length === 1 ) {
      return arrayOfWords[0]
    }

    let highScore = 0;

    arrayOfWords.forEach(function(word){
      if ( Scrabble.score(word) > highScore ) {
        highScore = Scrabble.score(word)
      }
    });


    let winners = []

    arrayOfWords.forEach(function(word){
      if ( Scrabble.score(word) === highScore ) {
        winners.push(word)
      }
    });

    if ( winners.length === 1 ) {
      return winners[0];
    }

    let sevenLetters = []
    let fewestLetters = 7

    winners.forEach(function(word){
      if ( word.length === 7 ) {
        sevenLetters.push(word)
      } else if ( word.length < fewestLetters ) {
        fewestLetters = word.length
      }
    });

    if ( sevenLetters.length >= 1 ) {
      return sevenLetters[0];
    }

    let new_winners = []

    winners.forEach(function(word){
      if ( word.length === fewestLetters ) {
        new_winners.push(word)
      }
    });

    return new_winners[0]
  },
};

Scrabble.Player = class {

  constructor(name){
    if ( name == "" || name == null ) throw "needs name"
    this.name = name;
    this.plays = []
  }

  play(word){
    if ( word == "" || word == null ) throw "needs real word"
    // Returns false if player has already won
    if ( this.hasWon() || Scrabble.score(word) == 0 ) {
      return false
    } else {
      this.plays.push(word);
      return true
    }
    // adds the input word to the plays Array


  }

  totalScore(){
    // sums up and returns the score of the players words
    let score = 0
    this.plays.forEach(function(word){
      score += Scrabble.score(word);
    });
    return score
  }

  hasWon(){
    let score = this.totalScore()
    if ( score >= 100 ) {
      return true
    } else { return false }
    // returns true if the player has over 100 points, otherwise returns false
  }

  highestScoringWord(){
    // returns the highest scoring word the user has played
    let word = Scrabble.highestWordFrom(this.plays)
    return word
  }

  highestWordScore(){
    // returns the highestScoringWord score
    let word = this.highestScoringWord()
    score = Scrabble.score(word)
    return score
  }


};


module.exports = Scrabble;

let obj = { a: 4, b: 0.5 , c: 0.35, d: 5 };

let arr = Object.values(obj);
let min = Math.min(...arr);
let max = Math.max(...arr);

console.log( `Min value: ${min}, max value: ${max}` );

const LETTER ={
  "A":1,
  "E":1,
  "I":1,
  "O":1,
  "U":1,
  "L":1,
  "N":1,
  "R":1,
  "S":1,
  "T":1,
  "D":2,
  "G":2,
  "B":3,
  "C":3,
  "M":3,
  "P":3,
  "F":4,
  "H":4,
  "V":4,
  "W":4,
  "Y":4,
  "K":5,
  "J":8,
  "X":8,
  "Q":10,
  "Z":10,

}
const UserException = function userException(message) {
  this.message = message;
  this.name = 'UserException';
};

const Scrabble ={
  score(word){

    if ((word.length>7)||(word == '')) {
      throw new UserException('does not allow ');
    }
    else if(!(/^[a-zA-Z]+$/.test(word))){
      throw new UserException('bad characters ');

    }
    else{
      let  letter_array = word.toUpperCase().split('');
      let sum = 0;

      letter_array.forEach(function (value)
      {

        sum+= LETTER[value];

      });


      if (letter_array.length == 7){
        return sum + 50;
      }

      return sum;
    }
  },

  tie(word, maxWord) {
    if (((word.length === 7) && (maxWord.length !== 7)) || ((word.length < maxWord.length) && (maxWord.length !== 7))) {
      maxWord = word;
    }
    return maxWord;
  },

  highestScoreFrom: function highestScoreFrom(words) {
    let maxScore = 0;
    let maxWord = '';
    if (words.length === 0) {
      throw new UserException('You must provide words to score.');
    } else {
      words.forEach((word) => {
        if (this.score(word) === maxScore) {
          maxWord = this.tie(word, maxWord);
          maxScore = this.score(maxWord);
        } else if (this.score(word) > maxScore) {
          maxScore = this.score(word);
          maxWord = word;
        }
      });
      return maxWord;
    }
  }
};

Scrabble.Player = class {
  constructor(name,plays){
    this.name = name;
    this.plays = [];
  }
  plays(word){

    if (word === undefined || !(/^[a-zA-Z]+$/.test(word))) {
      throw new UserException('You must provide a word');
    } else if (this.hasWon()) {
      return false;
    } else {
      this.plays.push(word);
      return true;
    }
  }

  totalScore(){
    let total = 0;
    this.plays.forEach(function (word) {
      total += Scrabble.score(word)
    });
    return total;
  }


  hasWon()
  {
    return this.total >= 100 ? ( true) : (false);
  }
}






  module.exports = Scrabble;

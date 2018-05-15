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
  score(word) {
    let letters = word.toUpperCase().split("");
    if (letters.length > 7) {
      throw 'Your word can only be 7 letters or less';
    } else if (letters.length === 0) {
      throw 'Your word can\t be empty';
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
    return totalScore;
  },
  highestScoreFrom(arrayOfWords) {

  },
};

Scrabble.Player = class {

};


module.exports = Scrabble;

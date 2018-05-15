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
    let totalScore = 0;
    let letters = word.toUpperCase().split("");
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
      }
    });
    return totalScore;
  },
  highestScoreFrom(arrayOfWords) {

  },
};

Scrabble.Player = class {

};


module.exports = Scrabble;


const Scrabble = {
  score(word) {
    const ScoreChart = {
      one: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
      two: ["D", "G"],
      three: ["B", "C", "M", "P"],
      four: ["F", "H", "V", "W", "Y"],
      five: ["K"],
      eight: ["J", "X"],
      ten: ["Q", "Z"]
    };

    if (word.length > 7 || word.length < 1){
      throw new Error(`${word} has to have 1 to 7 letters`);
    }
    let score = 0

    word.toUpperCase().split('').forEach((letter) => {
      if ((ScoreChart.one).includes(letter)) {
        score += 1;
      } else if ((ScoreChart.two).includes(letter)){
        score += 2;
      } else if ((ScoreChart.three).includes(letter)){
        score += 3;
      } else if ((ScoreChart.four).includes(letter)){
        score += 4;
      } else if ((ScoreChart.five).includes(letter)){
        score += 5;
      } else if ((ScoreChart.eight).includes(letter)){
        score += 8;
      } else if ((ScoreChart.ten).includes(letter)){
        score += 10;
      } else {
        throw new Error(`${letter} is not a letter`);
      }
    });
    return score

  },
  highestScoreFrom(arrayOfWords) {

  },
};

Scrabble.Player = class {

};


module.exports = Scrabble;

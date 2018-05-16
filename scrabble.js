
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

    if (word.length === 7) {
      score = 50;
    }

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
    if (arrayOfWords.length < 1 || !(arrayOfWords instanceof Array) ){
      throw new Error (`This is not an array of words.`)
    }
    // go through the array and score each word if score of word is highest, keep word in varible
    let max = this.score(arrayOfWords[0]);
    let highestScoredInArray = arrayOfWords[0];

    arrayOfWords.forEach((word) => {
      const score = this.score(word);

      if (score > max) {
        max = score;
        highestScoredInArray = word;
      } else if (score === max) {
        if (word.length === 7) {
          max = score;
          highestScoredInArray = word;
        } else if (word.length < highestScoredInArray.length && highestScoredInArray.length !== 7) {
          max = score;
          highestScoredInArray = word;
        }
      }
    });
    return highestScoredInArray;

  },
};

Scrabble.Player = class {

};


module.exports = Scrabble;

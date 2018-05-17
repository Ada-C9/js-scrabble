
const Scrabble = {
  score(word) {
    const onePoint = ['A','E','I','O','U','L','N','R','S','T'];
    const twoPoint = ['D','G'];
    const threePoint = ['B','C','M', 'P'];
    const fourPoint = ['F','H','V','W','Y'];
    const fivePoint = ['K'];
    const eightPoint = ['J','X'];
    const tenPoint = ['Q','Z'];

    let total = 0;

    const regex_key = /^[a-z]+$/i;

    word = word.toUpperCase().split('');

    if (word.length === 0) {
      throw "word cannot be an empty string";
    } else if (word.length > 7) {
      throw "word cannot be longer than 7 letters";
    } else {
      word.forEach(function (char) {
        if (regex_key.test(char) === false) {
          throw "word can only contain letters";
        }
      })
    }

    word.forEach(function (char) {
      if (onePoint.includes(char)){
        total += 1;
      }else if (twoPoint.includes(char)){
        total += 2;
      }else if (threePoint.includes(char)){
        total += 3;
      }else if (fourPoint.includes(char)){
        total += 4;
      }else if (fivePoint.includes(char)){
        total += 5;
      }else if (eightPoint.includes(char)){
        total += 8;
      }else if (tenPoint.includes(char)){
        total += 10;
      }
    });

    return (word.length === 7) ? (total + 50) : total;
  },

  highestScoreFrom(arrayOfWords) {
    if (arrayOfWords.length === 0){
      throw "must enter a valid list of words to score."
    }

    let highScore = 0;
    let highestScoringWord = '';

    for (let i = 0; i < arrayOfWords.length; i++) {
      let word = arrayOfWords[i];
      let score = Scrabble.score(word);

      if (score > highScore) {
        highScore = score;
        highestScoringWord = word;
      } else if (score === highScore) {
        if (highestScoringWord.length != 7 &&
          (word.length === 7 || word.length < highestScoringWord.length)) {
          highestScoringWord = word;
        }
      }
    }

    return highestScoringWord;
  },
};

Scrabble.Player = class {
  constructor(name) {
    this.name = name;
    if (name === null || name === undefined) {
      throw "every player must have a name";
    }
  }
};


module.exports = Scrabble;

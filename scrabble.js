
const Scrabble = {
  score(word) {
  const onePoint = ['A','E','I','O','U','L','N','R','S','T']
  const twoPoint = ['D','G']
  const threePoint = ['B','C','M', 'P']
  const fourPoint = ['F','H','V','W','Y']
  const fivePoint = ['K']
  const eightPoint = ['J','X']
  const tenPoint = ['Q','Z']

  let total = 0
  word = word.split("")

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

    if (word.length === 7) {
      total += 50;
    }

    return total
  },

  highestScoreFrom(arrayOfWords) {
    let maxScoreWord = {
      word: [null],
      score: 0
    };

    arrayOfWords.forEach(function (wordCompareScore) {
      let new_word = new Scrabble(wordCompareScore);
      if (new_word.score(wordCompareScore) > maxScoreWord.score) {
        maxScoreWord.word = wordCompareScore;
        maxScoreWord.score = new_word.score(wordCompareScore);
      } else if (new_word.score(wordCompareScore) === maxScoreWord.score){
        maxScoreWord.word.push(wordCompareScore);
      }
    });
  },
};

Scrabble.Player = class {

};


module.exports = Scrabble;

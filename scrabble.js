const SCORECHART = {
  "A" : 1, "B" : 3, "C" : 3, "D" : 2,
  "E" : 1, "F" : 4, "G" : 2, "H" : 4,
  "I" : 1, "J" : 8, "K" : 5, "L" : 1,
  "M" : 3, "N" : 1, "O" : 1, "P" : 3,
  "Q" : 10, "R" : 1, "S" : 1, "T" : 1,
  "U" : 1, "V" : 4, "W" : 4, "X" : 8,
  "Y" : 4, "Z" : 10
};


const Scrabble = {
  score(word) {
    checkWord(word);

    let wordScore = 0;
    let upperCase = word.toUpperCase();
    for(let char of upperCase) {
      wordScore += SCORECHART[char];
    }

    return checkBonus(word) ? wordScore += 50 : wordScore;
  },
  highestScoreFrom(arrayOfWords) {
    //  returns the WORD in the array with the highest score
    checkArray(arrayOfWords);

    let maxScore = Scrabble.score(arrayOfWords[0]);
    let maxWord = arrayOfWords[0];

    arrayOfWords.forEach( function(word){
      let currScore = Scrabble.score(word);
      if (currScore > maxScore) {
        maxScore = currScore;
        maxWord = word;
      } else if (currScore === maxScore) {
        if (word.length < maxWord.length && maxWord.length !== 7){
          maxScore = currScore;
          maxWord = word;
        } else if (word.length === 7 && maxWord.length !==7) {
          maxScore = currScore;
          maxWord = word;
        }
      }
    });
    return maxWord;
  }
};

Scrabble.Player = class {
  constructor(name){
    if (name === undefined || name === null){
      throw 'Must provide name';
    } else {
      this.name = name;
    }
  }
};

const checkWord = function checkWord(input){
  let regex = /^[a-zA-Z]+$/;
  if (input.length === 0 || input.length > 7){
    throw 'Invalid input length';
  }
  if (regex.test(input) === false){
    throw 'Only letters allowed';
  }
}

const checkArray = function checkArray(array){
  if (array.length === 0){
    throw 'Invalid array';
  }
}

const checkBonus = function checkBonus(word){
  if (word.length == 7) {
    return 50;
  }
}

const test = new Scrabble.Player('test')
console.log(test);

module.exports = Scrabble;


const value1Array = ["a", "e", "i", "o", "u", "l", "n", "r", "s", "t"]
const value2Array = ["d", "g"]
const value3Array = ["b", "c", "m", "p"]
const value4Array = ["f", "h", "v", "w", "y"]
const value5Array = ["k"]
const value8Array = ["j", "x"]
const value10Array = ["q", "z"]


const Scrabble = {
  score(word) {
    if (word === null || word === "") {
      throw 'Please enter valid input';
    }

    if (word.length > 7) {
      throw 'Words must be 7 letters or less';
    }

    let letters = /^[A-Za-z]+$/;
    let letterArray = []
    if (word.match(letters)) {
      letterArray = word.toLowerCase().split("");
      console.log(letterArray);
    } else {
      throw 'Please enter valid input';
    }

    let wordScore = 0
    if (letterArray.length == 7) {
      wordScore = 50;
    }

    for (let letter of letterArray) {
      if (value1Array.includes(letter)) {
        wordScore += 1;
      } else if (value2Array.includes(letter)) {
        wordScore += 2;
      } else if (value3Array.includes(letter)) {
        wordScore += 3;
      } else if (value4Array.includes(letter)) {
        wordScore += 4;
      } else if (value5Array.includes(letter)) {
        wordScore += 5;
      } else if (value8Array.includes(letter)) {
        wordScore += 8;
      } else if (value8Array.includes(letter)) {
        wordScore += 10;
      }
    }
    return wordScore;

  },
  highestScoreFrom(arrayOfWords) {
    if (arrayOfWords.length === 0) {
      return null;
    }

    let scoredWords = {}
    let winner = {}

    for (let word of arrayOfWords) {
      let score = Scrabble.score(word);
      winner[word] = score;
    }


  },
};

Scrabble.Player = class {

};


module.exports = Scrabble;

// Driver code
words = ['apple', 'pear']
console.log(Scrabble.score('academy'));
console.log(Scrabble.highestScoreFrom(words))

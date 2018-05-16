//
// const value1Array = ["a", "e", "i", "o", "u", "l", "n", "r", "s", "t"]
// const value2Array = ["d", "g"]
// const value3Array = ["b", "c", "m", "p"]
// const value4Array = ["f", "h", "v", "w", "y"]
// const value5Array = ["k"]
// const value8Array = ["j", "x"]
// const value10Array = ["q", "z"]


const Scrabble = {
  score(word) {
    if (word === null || word === "") {
      throw 'Please enter valid input';
    }

    if (word.length > 7) {
      throw 'Words must be 7 letters or less';
    }

    let validLetters = /^[A-Za-z]+$/;
    let letterArray = []
    if (word.match(validLetters)) {
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
      switch (letter) {
        case 'a':
        case 'e':
        case 'i':
        case 'o':
        case 'u':
        case 'l':
        case 'n':
        case 'r':
        case 's':
        case 't':
          wordScore += 1;
          break;
        case 'd':
        case 'g':
          wordScore += 2;
          break;
        case 'b':
        case 'c':
        case 'm':
        case 'p':
          wordScore += 3;
          break;
        case 'f':
        case 'h':
        case 'v':
        case 'w':
        case 'y':
          wordScore += 4;
          break;
        case 'k':
          wordScore += 5;
          break;
        case 'j':
        case 'x':
          wordScore += 8;
          break;
        case 'q':
        case 'z':
          wordScore += 10;
          break;
        default:
          throw 'Unscoreable character';
      }
      // if (value1Array.includes(letter)) {
      //   wordScore += 1;
      // } else if (value2Array.includes(letter)) {
      //   wordScore += 2;
      // } else if (value3Array.includes(letter)) {
      //   wordScore += 3;
      // } else if (value4Array.includes(letter)) {
      //   wordScore += 4;
      // } else if (value5Array.includes(letter)) {
      //   wordScore += 5;
      // } else if (value8Array.includes(letter)) {
      //   wordScore += 8;
      // } else if (value8Array.includes(letter)) {
      //   wordScore += 10;
      // }
    }
    return wordScore;

  },
  highestScoreFrom(arrayOfWords) {
    if (arrayOfWords.length === 0) {
      throw 'Please provide some words to score!'
    }

    if (arrayOfWords.length === 1) {
      return arrayOfWords[0];
    }

    let scoredWords = {}
    let winner = []

    for (let word of arrayOfWords) {
      let score = Scrabble.score(word);
      scoredWords[word] = score;
    }

    // return Object.keys(scoredWords).reduce((a, b) => scoredWords[a] > scoredWords[b] ? a : b);
    let highestScore = Object.values(scoredWords).reduce((a, b) => scoredWords[a] > scoredWords[b] ? a : b);
    console.log(`highest score: ${highestScore}`)



  },
};

Scrabble.Player = class {

};


module.exports = Scrabble;

// Driver code
words = ['ate','academy']
console.log(Scrabble.highestScoreFrom(words))

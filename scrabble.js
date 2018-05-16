const LETTER_VALUES =
{
  "a": { "points":  1, "tiles":  9 },
  "b": { "points":  3, "tiles":  2 },
  "c": { "points":  3, "tiles":  2 },
  "d": { "points":  2, "tiles":  4 },
  "e": { "points":  1, "tiles": 12 },
  "f": { "points":  4, "tiles":  2 },
  "g": { "points":  2, "tiles":  3 },
  "h": { "points":  4, "tiles":  2 },
  "i": { "points":  1, "tiles":  9 },
  "j": { "points":  8, "tiles":  1 },
  "k": { "points":  5, "tiles":  1 },
  "l": { "points":  1, "tiles":  4 },
  "m": { "points":  3, "tiles":  2 },
  "n": { "points":  1, "tiles":  6 },
  "o": { "points":  1, "tiles":  8 },
  "p": { "points":  3, "tiles":  2 },
  "q": { "points": 10, "tiles":  1 },
  "r": { "points":  1, "tiles":  6 },
  "s": { "points":  1, "tiles":  4 },
  "t": { "points":  1, "tiles":  6 },
  "u": { "points":  1, "tiles":  4 },
  "v": { "points":  4, "tiles":  2 },
  "w": { "points":  4, "tiles":  2 },
  "x": { "points":  8, "tiles":  1 },
  "y": { "points":  4, "tiles":  2 },
  "z": { "points": 10, "tiles":  1 },
  "blank": { "tiles": 2 }
}
const MAX_LENGTH = 7;

const Scrabble = {
  score(word) {

    if (!word.match(/^[a-zA-Z]+$/)) {
      throw "Not a valid word";
    } else if (word.length === 0) {
      throw "No word given";
    } else if (word.length > MAX_LENGTH) {
      throw "Scrabble words can only be 7 letters!";
    }

    word = word.toLowerCase().split("");
    let wordScore = 0;

    word.forEach (function (letter) {
      let points = LETTER_VALUES[letter]["points"];
      wordScore += points;
    });

    if (word.length === 7) {
      wordScore += 50;
    }

    return wordScore;
  },

  highestScoreFrom(arrayOfWords) {

    if (arrayOfWords.length === 0) {
      throw "No words given";
    }

    let topWord = arrayOfWords[0];
    let topScore = Scrabble.score(topWord);

    arrayOfWords.forEach (function (word) {
      let score = Scrabble.score(word);
      if (score > topScore) {
        topScore = score;
        topWord = word;
      } else if (score === topScore) {
        if (word.length === 7 && topWord.length !==7 || word.length < topWord.length) {
          topScore = score;
          topWord = word;
        }
      }
    });
    return topWord;
  }
}

Scrabble.Player = class {

};


module.exports = Scrabble;

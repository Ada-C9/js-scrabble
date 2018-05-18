
const letterValues = {
  'A' : 1,
  'B' : 3,
  'C' : 3,
  'D' : 2,
  'E' : 1,
  'F' : 4,
  'G' : 2,
  'H' : 4,
  'I' : 1,
  'J' : 8,
  'K' : 5,
  'L' : 1,
  'M' : 3,
  'N' : 1,
  'O' : 1,
  'P' : 3,
  'Q' : 10,
  'R' : 1,
  'S' : 1,
  'T' : 1,
  'U' : 1,
  'V' : 4,
  'W' : 4,
  'X' : 8,
  'Y' : 4,
  'Z' : 10
};

const Scrabble = {

  // score: function(word) {} same as vv
  score(word) {
    word = word.toUpperCase();

    let letterCheck = /^[A-Z]+$/;

    if (!letterCheck.test(word)) {
      throw 'Invalid characters';
    }
    let letters = word.split('');

    let wordScore = 0

    if (word.length > 7 || typeof word !== 'string' || word.length < 1) {
      throw 'Word is invlaid';}

      if (word.length === 7) {
        wordScore += 50
      }

      for (let letter of letters) {
        for (let value in letterValues) {
          if (letter === value) {
            wordScore += letterValues[value]
          }
        }
      }

      return wordScore
    },

    highestScoringWord(arrayOfWords) {
      if (arrayOfWords.length < 1 || !Array.isArray(arrayOfWords)){
        throw 'No words to find high score';
      } else if (arrayOfWords.length === 1) {
        return arrayOfWords[0];
      } else {
        let highestWordScore = 0;
        let highestWord = '';

        for (let i = 0; i < arrayOfWords.length; i++) {
          let currentWordScore = this.score(arrayOfWords[i]);

          if (currentWordScore > highestWordScore) {
            highestWordScore = currentWordScore;
            highestWord = arrayOfWords[i];
          } else if (currentWordScore === highestWordScore); {
            if (highestWord.length !== 7 && (arrayOfWords[i].length === 7 ||
              arrayOfWords[i].length < highestWord.length)) {
                highestWordScore = currentWordScore;
                highestWord = arrayOfWords[i];
              }
            }
          }
          return highestWord;
        }
      },

      highestWordScore(arrayOfWords) {
        return Scrabble.score(Scrabble.highestScoringWord(arrayOfWords));
      },

    };

    Scrabble.Player = class {
      constructor(name) {
        this.name = name;
        if (name === undefined) {
          throw 'Players must have a name'
        }
        this.plays = [];
      }
      play(word) {

        if (word === undefined || typeof(word) !== 'string') {
          throw 'Invalid word'
        }

        if (this.hasWon()) {
          return false
        } else {
          this.plays.push(word);
          return true;
        }
      }

      hasWon() {
        if (this.totalScore() >= 100) {
          return true
        } else {
          return false
        }
      }

      totalScore() {
        let total = 0;

        for (let i = 0; i < this.plays.length; i++) {
          total += Scrabble.score(this.plays[i]);
        }
        return total;
      }

    };


    module.exports = Scrabble;

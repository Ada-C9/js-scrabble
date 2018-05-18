
const Scrabble = {


  score(word) {

    //  Letter Scores Table:
    // change structure!
    let letterScoreOf1 = ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"];
    let letterScoreOf2 =  ["D", "G"	];
    let letterScoreOf3 =  ["B", "C", "M", "P"	];
    let letterScoreOf4 =  ["F", "H", "V", "W", "Y"];
    let letterScoreOf5 =  ["K"];
    let letterScoreOf8 =  ["J", "X"];
    let letterScoreOf10 =  ["Q", "Z"];

    // Split word into letter:
    let letters = word.toUpperCase().split("");
    let score = 0

    // Validates characters:
    letters.forEach(function(char) {
      if (!char.match(/[a-z]/i)) {
        throw `${char} is not a letter!`;
      }
    });

    // Check and act uppon lenght of word:
    if (letters.length > 7){
      throw `Word cannot have more than seven character!`;
    } else if (letters.length < 1){
      throw `Word should have more than one character!`;
    } else if (letters.length == 7){
      score += 50;
    }

    // Add points for each letter:
    letters.forEach(function(letter) {
      if (letterScoreOf1.includes(letter)){
        score ++;
      } else if (letterScoreOf2.includes(letter)){
        score += 2;
      }else if  (letterScoreOf3.includes(letter)){
        score += 3;
      }else if  (letterScoreOf4.includes(letter)){
        score += 4;
      }else if  (letterScoreOf5.includes(letter)){
        score += 5;
      }else if  (letterScoreOf8.includes(letter)){
        score += 8;
      }else if  (letterScoreOf10.includes(letter)){
        score += 10;
      }
    });
    return score;
  },


  highestScoreFrom(arrayOfWords) {

    // Vadilations:
    if (arrayOfWords.length == 0){
      throw `No words have been played yet!`;
    } else if (!Array.isArray(arrayOfWords)){
      throw `This is not an array!`;
    } else if (arrayOfWords.length == 1){
      return arrayOfWords[0];
    }

    // Define word with higest score
    let maxScoredWord = ['', 0];
    arrayOfWords.forEach(function (word) {
      let thisWordScore = Scrabble.score(word);

      if (thisWordScore > maxScoredWord[1]) {
        maxScoredWord[0] = word;
        maxScoredWord[1] = thisWordScore;
      } else if (thisWordScore === maxScoredWord[1]) {
        if (word.length === 7 || (word.length < maxScoredWord[0].length && maxScoredWord[0].length !== 7)) {
          maxScoredWord[0] = word;
          maxScoredWord[1] = thisWordScore;
        }
      }

    });
    // returns the highest scoring word played
    return maxScoredWord[0];
  },
};
Scrabble.Player = class {
  constructor(name) {
    // Require a name for palyer:
    if (!name) {
      throw ('player must have a name');
    } else {
      this.name = name;
    }
    // Coolection to record the played words:
    this.plays = [];
  }

  play(word) {
    // Require a real word:
    if (!word || (typeof word !== 'string')) {
      throw ('Please enter a real word! (Must have letters and cannot have numbers..)');
      // Returns false and does not update plays if the player has already won:
    } else if (this.hasWon()) {
      return false;
    } else {
      // save palyed word:
      this.plays.push(word);
      return true;
    }
  }

  plays() {
    return this.plays;
  }

  totalScore() {
    // Starts at zero and then add up with each stored played word:
    let totalScore = 0;
    // use arrow function.....
    this.plays.forEach(function (word) {
      totalScore += Scrabble.score(word);
    });

    return totalScore;
  }

  hasWon() {
    // Player wins when scores 100 or more:
    return this.totalScore() >= 100 ? true : false;
  }

  highestScoringWord() {
    // returns the highest scoring word played:
    return Scrabble.highestScoreFrom(this.plays);
  }

  highestWordScore() {
    // returns the score of the highest scoring word played:
    return Scrabble.score(this.highestScoringWord());
  }
};


module.exports = Scrabble;


// Scrabble.score('dog');

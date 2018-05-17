
const Scrabble = {
  score(word) {
    let totalScore = 0;
    if (typeof word !== 'string') {
      throw "Invalid input, please enter a word!";
    }

    let scrabbleWord = word.split("");
    if (scrabbleWord.length > 7 || scrabbleWord.length === 0) {
      throw "Word need to have between 1-7 characters";
    }else if (scrabbleWord.length === 7) {
      totalScore += 50;
    }

    scrabbleWord.forEach((letter) => {
      switch(letter.toLowerCase()) {
        case "a":
        case "e":
        case "i":
        case "o":
        case "u":
        case "l":
        case "n":
        case "r":
        case "s":
        case "t":
        totalScore += 1;
        break;
        case "d":
        case "g":
        totalScore += 2;
        break;
        case "b":
        case "c":
        case "m":
        case "p":
        totalScore += 3;
        break;
        case "f":
        case "h":
        case "v":
        case "w":
        case "y":
        totalScore += 4;
        break;
        case "k":
        totalScore += 5;
        break;
        case "j":
        case "x":
        totalScore += 8;
        break;
        case "q":
        case "z":
        totalScore += 10;
        break;
        default:
        throw "Invalid characters"
      }
    });
    return totalScore;
  },

  highestScoreFrom(arrayOfWords) {
    let max_score = 0;
    let str = " ";
    let maxLength = 0;
    if (arrayOfWords.length === 0) {
      throw "There are no words";
    }

    const score = this.score
    arrayOfWords.forEach((word) => {
      if (word.length === 7) {
        if (score(word) > max_score) {
          max_score = score(word);
          str = word;
          maxLength = word.length;
        }else if (score(word) === max_score) {
          if (maxLength !== 7) {
            str = word;
          }
        }
      }else if (word.length < 7) {
        if (score(word) > max_score) {
          max_score = score(word);
          maxLength = word.length;
          str = word;

        }else if (score(word) === max_score && word.length < maxLength && maxLength !== 7) {
          max_score = score(word);
          maxLength = word.length;
          str = word;
        }
      }
    });
    return str
  },
};

Scrabble.Player = class {
  constructor(name) {
    if (!name) {
      throw "Require name";
    }
    this.name = name;
    this.playsArr = [];
  }

  totalScore() {
    let score = 0;
    this.plays().forEach((word) => {
      score += Scrabble.score(word);
    });
    return score;
  }

  plays() {
    return this.playsArr;
  }

  play(word) {
    if (typeof word !== 'string') {
      throw "Invalid input, please enter a word!";
    }
    if (this.totalScore() > 100) {
      return false;
    }else
    this.plays().push(word);
    let score = Scrabble.score(word);
    return score;
  }


  hasWon(){
    return this.totalScore() >= 100;
  }

  highestScoringWord() {
    return Scrabble.highestScoreFrom(this.plays());
  }

  highestWordScore() {
    return Scrabble.score(this.highestScoringWord());
  }

};


module.exports = Scrabble;

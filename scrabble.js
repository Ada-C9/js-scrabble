const scores = {
  'A': 1,
  'E': 1,
  'I': 1,
  'O': 1,
  'U': 1,
  'L': 1,
  'N': 1,
  'R': 1,
  'S': 1,
  'T': 1,
  'D': 2,
  'G': 2,
  'B': 3,
  'C': 3,
  'M': 3,
  'P': 3,
  'F': 4,
  'H': 4,
  'V': 4,
  'W': 4,
  'Y': 4,
  'K': 5,
  'J': 8,
  'X': 8,
  'Q': 10,
  'Z': 10
}
const Scrabble = {
  score(word) {
    if ( !/^[a-zA-Z]+$/.test(word) ) {
      throw "Please enter valid letters.";
    }

    if (word.length > 7 || word.length < 1) {
      throw "Word must be no more than 7 letters.";
    }

    word = word.toUpperCase();
    let wordScore = [];

    for (let i = 0; i < word.length; i += 1) {
      wordScore.push(scores[word[i]]);
    }

    let totalScore = wordScore.reduce(function(acc, val) { return acc + val; });

    if (word.length == 7) {
      totalScore += 50;
    }

    return totalScore;
  },

  highestScoreFrom(arrayOfWords) {
    if (arrayOfWords.length === 0) {
      throw "No words were passed";
    }

    let topScores = [];
    let maxScore = 0;

    for (let word of arrayOfWords) {
      let wordScore = this.score(word);
      if (wordScore == maxScore) {
        topScores.push(word);
      }
      if (wordScore > maxScore) {
        maxScore = wordScore;
        topScores = [];
        topScores.push(word);
      }
    }
    let lengthToBeat = 6;
    let shortestWord = null;

    if (topScores.length > 1) {
      for (let word of topScores) {
        if ( word.length === 7 ) {
          return word;
        }
        else if (word.length < lengthToBeat) {
          lengthToBeat = word.length
          shortestWord = word;
        }
      }
      return shortestWord;
    }
    return topScores[0]
  },
};

Scrabble.Player = class {

};


module.exports = Scrabble;
// console.log(Scrabble.score("academia"));
// console.log(Scrabble.highestScoreFrom(['dog', 'goat']))

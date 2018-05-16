
const POINTS_VALUES = new Map([
  ['A', 1], ['B', 3], ['C', 3], ['D', 2], ['E', 1], ['F', 4], ['G', 2], ['H', 4], ['I', 1],
  ['J', 8], ['K', 5], ['L', 1], ['M', 3], ['N', 1], ['O', 1], ['P', 3], ['Q', 10], ['R', 1],
  ['S', 1], ['T', 1], ['U', 1], ['V', 4], ['W', 4], ['X', 8], ['Y', 4], ['Z', 10]]);

const Scrabble = {

  getPointValue(letter) {
    if (POINTS_VALUES.get(letter) === undefined) { throw new Error(`Invalid letter: ${letter}`); }
    return POINTS_VALUES.get(letter);
  },
  //
  // stringOrError(word) {
  //   if (word.typeOf != 'string') {
  //     throw new Error(`Invalid word: ${word}. It must be a String.`);
  //   }
  // },

  formatValidWord(word) {
    if (typeof word !== 'string' && !(word instanceof String)) {
      throw new Error(`Invalid word: ${word}. It must be a String.`);
    }
    // this.stringOrError(word);
    word = word.trim();
    if (word.length > 7 || word.length === 0) {
      throw new Error(`${word} must be more than 0 and less than 8 characters long.`);
    }
    return word.toUpperCase();
  },


  score(word) {
    if (this.caller == null) { word = this.formatValidWord(word); }
    let wordScore = 0;
    for (let i = 0; i < word.length; i++ ) {
      wordScore += this.getPointValue(word[i]);
    }
    return word.length === 7 ? wordScore + 50 : wordScore;
  },


  highestScoreFrom(arrayOfWords) {
    if (!(arrayOfWords instanceof Array) || arrayOfWords.length === 0 ) {
      throw new Error(`No words!`);
    }
    // let somebs = this.formatValidWord;
    let highestScore = 0;
    let highestScoringWord = "";
    // const that = this;
    arrayOfWords.forEach((word) => {
      // word = this.formatValidWord(word);
      let wordScore = this.score(this.formatValidWord(word));
      if (wordScore === highestScore && highestScoringWord.length > 7) {
        highestScoringWord = highestScoringWord.length > word.length? word : highestScoringWord;
      } else if (wordScore > highestScore) {
        highestScore = wordScore;
        highestScoringWord = word;
      }
    });
    return highestScoringWord;
  }


};


// Note that it’s better to use fewer tiles, so if the top score is tied between multiple words,
//  pick the one with the fewest letters.
// - Note that there is a bonus (50 points) for using all seven letters. If the top score is
// tied between multiple words and one used all seven letters, choose the one with seven letters
//  over the one with fewer tiles.
// - If the there are multiple words that are the same score and same length, pick the first one
// in supplied list.

Scrabble.Player = class {

};


module.exports = Scrabble;

    // 'A': 1, 'B': 3, 'C': 3, 'D': 2, 'E': 1, 'F': 4, 'G': 2,
    // 'H': 4, 'I': 1, 'J': 8, 'K': 5, 'L': 1, 'M': 3, 'N': 1,
    // 'O': 1, 'P': 3, 'Q': 10, 'R': 1, 'S': 1, 'T': 1, 'U': 1,
    // 'V': 4, 'W': 4, 'X': 8, 'Y': 4,'Z': 10

    // A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8, K: 5, L: 1, M: 3, N: 1, O: 1, P: 3,
    // Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4, W: 4, X: 8, Y: 4, Z: 10

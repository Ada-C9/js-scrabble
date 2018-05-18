'use strict';

const MAX = 7;

const POINTS_VALUES = new Map([
  ['A', 1], ['B', 3], ['C', 3], ['D', 2], ['E', 1], ['F', 4], ['G', 2], ['H', 4], ['I', 1],
  ['J', 8], ['K', 5], ['L', 1], ['M', 3], ['N', 1], ['O', 1], ['P', 3], ['Q', 10], ['R', 1],
  ['S', 1], ['T', 1], ['U', 1], ['V', 4], ['W', 4], ['X', 8], ['Y', 4], ['Z', 10]]);

const Scrabble = {

  getPointValue(letter) {
    if (POINTS_VALUES.get(letter) === undefined) { throw new Error(`Invalid letter: ${letter}`); }
    return POINTS_VALUES.get(letter);
  },

  isValidString(str) {
    if (typeof str !== 'string' && !(str instanceof String) || !RegExp(/^[A-Z]+$/i).test(str)) {
      throw new Error(`Invalid word: ${str}. It must be a String.`);
    }
  },

  formatValidWord(word) {
    this.isValidString(word);
    if (word.length > MAX) { throw new Error(`${word} must be less than ${MAX} characters long.`); }
    return word.toUpperCase();
  },

  score(word) {
    word = this.formatValidWord(word);
    let wordScore = 0;
    for (let i = 0; i < word.length; i++ ) { wordScore += this.getPointValue(word[i]); }
    return word.length === MAX ? wordScore + 50 : wordScore;
  },

  breakTie(currHighest, newWord) {
    this.isValidString(currHighest);
    this.isValidString(newWord);
    if (newWord.length === MAX || currHighest.length === MAX) {
      return currHighest.length === MAX ? currHighest : newWord;
    }
    return currHighest.length > newWord.length ? newWord : currHighest;
  },

  highestScoreFrom(words) {
    if (!(words instanceof Array) || words.length === 0 ) { throw new Error(`No words!`); }
    let highestScore = 0;
    let highestScoringWord = "";
    words.forEach((word) => {
      let wordScore = this.score(word);
      if (wordScore === highestScore) {
        highestScoringWord = this.breakTie(highestScoringWord, word);
      } else if (wordScore > highestScore) {
        highestScore = wordScore;
        highestScoringWord = word;
      }
    });
    return highestScoringWord;
  }
};

Scrabble.Player = class {
  constructor(name) {
    this.isValidString(name);
    this.name = name;
    this.plays = [];
    this.score = 0;
  }

  isValidString(str) {
    if (typeof str !== 'string' && !(str instanceof String) || str.trim().length === 0) {
      throw new Error(`Invalid word: ${str}. It must be a String.`);
    }
  }

  highestWordScore() {
    return Scrabble.score(Scrabble.highestScoreFrom(this.plays));
  }

  highestScoringWord() {
    return Scrabble.highestScoreFrom(this.plays);
  }

  totalScore() {
    return this.score;
  }

  play(word) {
    let originalLength = this.plays.length;
    if (!this.hasWon()) {
      this.score += Scrabble.score(word);
      this.plays.push(word);
    }
    return this.plays.length > originalLength;
  }

  hasWon() {
    return this.score >= 100;
  }
};


module.exports = Scrabble;

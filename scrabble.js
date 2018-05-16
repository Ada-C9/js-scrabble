'use strict'

const points = {
  'A': 1, 'E': 1, 'I': 1, 'O': 1, 'U': 1, 'L': 1,
  'N': 1, 'R': 1, 'S': 1, 'T': 1, 'D': 2, 'G': 2,
  'B': 3, 'C': 3, 'M': 3, 'P': 3, 'F': 4, 'H': 4,
  'V': 4, 'W': 4, 'Y': 4, 'K': 5, 'J': 8, 'X': 8,
  'Q': 10, 'Z': 10
}

const Scrabble = {
  score(word) {
    if (!/^[a-zA-Z]*$/.test(word)) {
      throw "Only alpha values are accepted"
    }
    let up_word = word.toUpperCase();
    let score = 0;
    if (up_word.length > 7 || up_word.length == 0) {
      throw "Word length has to be between 1 and 7"
    }
    for (let i = 0; i < up_word.length; i += 1) {
      score += (points[up_word[i]])
    }
    if (up_word.length == 7) {
      score += 50
    }
    return score
  },
  highestScoreFrom(arrayOfWords) {
    if (!Array.isArray(arrayOfWords) || arrayOfWords.length == 0) {
      throw "Must provide array of minimum 1 word"
    }
    if (arrayOfWords.length == 1) {
      return arrayOfWords[0]
    }
    let score_hash = {}
    arrayOfWords.forEach(function(word) {
      score_hash[word] = Scrabble.score(word)
    })

    let winningWords = Object.keys(score_hash).filter(x => {
      return score_hash[x] == Math.max.apply(null,
        Object.values(score_hash));
      })

      if (winningWords.length == 1) {
        return winningWords[0]
      }

      if (winningWords.some(is_seven)) {
        const result = winningWords.filter(word => word.length == 7);
        return result[0]
      }

      return winningWords.reduce(function(a, b) {
        return a.length <= b.length ? a : b;
      })
    }
  };

  const is_seven = function(element) {
    return element.length == 7;
  };


  Scrabble.Player = class {
    constructor(name) {
      if (name.length == 0) {
        throw "Name is required"
      }
      this.name = name
      this.plays = []
    }
    play(word) {
      if (word == undefined || !isNaN(word)) {
        throw "Real word is required"
      }
      this.plays.push(word)
      return word
      /// will return false if player has already won
    }
  };


  module.exports = Scrabble;

// let player = new Scrabble.Player('test')
// console.log(player);
// console.log(player.play(33));
// console.log(player.play('hello'));

const LETTERS = {
  '1' : ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  '2' : ['D', 'G'],
  '3' : ['B', 'C', 'M', 'P'],
  '4' : ['F', 'H', 'V', 'W', 'Y'],
  '5' : ['K'],
  '8' : ['J', 'X'],
  '10' : ['Q', 'Z']
};

const TILEBAG = {
  'a': { 'points':  1, 'tiles':  9 },
  'b': { 'points':  3, 'tiles':  2 },
  'c': { 'points':  3, 'tiles':  2 },
  'd': { 'points':  2, 'tiles':  4 },
  'e': { 'points':  1, 'tiles': 12 },
  'f': { 'points':  4, 'tiles':  2 },
  'g': { 'points':  2, 'tiles':  3 },
  'h': { 'points':  4, 'tiles':  2 },
  'i': { 'points':  1, 'tiles':  9 },
  'j': { 'points':  8, 'tiles':  1 },
  'k': { 'points':  5, 'tiles':  1 },
  'l': { 'points':  1, 'tiles':  4 },
  'm': { 'points':  3, 'tiles':  2 },
  'n': { 'points':  1, 'tiles':  6 },
  'o': { 'points':  1, 'tiles':  8 },
  'p': { 'points':  3, 'tiles':  2 },
  'q': { 'points': 10, 'tiles':  1 },
  'r': { 'points':  1, 'tiles':  6 },
  's': { 'points':  1, 'tiles':  4 },
  't': { 'points':  1, 'tiles':  6 },
  'u': { 'points':  1, 'tiles':  4 },
  'v': { 'points':  4, 'tiles':  2 },
  'w': { 'points':  4, 'tiles':  2 },
  'x': { 'points':  8, 'tiles':  1 },
  'y': { 'points':  4, 'tiles':  2 },
  'z': { 'points': 10, 'tiles':  1 },
  'blank': { 'tiles': 2}
}

const Scrabble = {
  getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key].includes(value));
  },

  score(word) {
    let score = 0;
    let valid = /^[A-Za-z]+$/;
    if (word.match(valid) && word.length <= 7) {
      let letters = word.toUpperCase().split('');
      letters.forEach((char) => {
        let current_score = this.getKeyByValue(LETTERS, char);
        score += parseInt(current_score);
      })
      word.length === 7 ? score += 50 : ''
      return score;
    } else {
      throw 'Word contains invalid character';
    }},

    breakTie(incumbent, challenger) {
      if (incumbent.length == 7) {
        return incumbent
      } else if (challenger.length == 7) {
        return challenger
      }
      else if (challenger.length < incumbent.length) {
        return challenger
      } else {
        return incumbent
      }
    },

    highestScoreFrom(arrayOfWords) {
      if (arrayOfWords.length === 0) {
        throw 'No words to score';
      } else if (arrayOfWords.length === 1) {
        return arrayOfWords[0];
      } else {
        let max = arrayOfWords[0]
        arrayOfWords.forEach((word) => {
          let word_score = this.score(word);
          let max_score = this.score(max);
          if (max_score < word_score) {
            max = word;
          } else if (max_score === word_score) {
            max = this.breakTie(max, word)
          }
        })
        return max;
      }},
    }

    Scrabble.Player = class {
      constructor(name) {
        this.name = name;
        this.plays = [];
      }
    };

    Scrabble.Player.prototype = {
      plays() {
        let plays = ''
        this.plays.forEach((play) => {
          plays += ` ${play}`
        })
        return plays;
      },
      purr() {
        return ('Prrrrr'); // use return instead of console.log
      },
      play() {
        return (`${this.name} chases a ball of yarn!`);
      },
      speak() {
        return (`${this.name} says meow!`);
      },
    };


    module.exports = Scrabble;

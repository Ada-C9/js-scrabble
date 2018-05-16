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

  validate(word) {
    let valid = /^[A-Za-z]+$/;
    return word.match(valid) && word.length <= 7 ? true : false
  },

  score(word) {
    let score = 0;
    if (this.validate(word)) {
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
        if (name) {
        this.name = name;
        this.plays = [];
      } else {
        throw 'Player requires a name.'
      }
      }

      play(word) {
        if (this.hasWon()) {
          return false;
        } else if (Scrabble.validate(word)) {
          this.plays.push(word);
          return (`${this.name} played the word ${word}`);
        } else {
          throw `${word} is not a valid play.`;
        }
      }

      totalScore() {
        let total = 0
        if (this.plays.length === 0) {
          return total;
        } else {
        this.plays.forEach((play) => {
          let score = Scrabble.score(play);
          total += score;
        }
      )}
      return total;
      }

      hasWon() {
        let won = false;

        let score = this.totalScore() * 1;
        if (score >= 100) {
          won = true;
        }
        return won;
      }};

    Scrabble.Player.prototype = {
      hasWon() {
        let won = false;

        let score = this.totalScore;
        console.log(`For testing purposes only the current totalScore is ${score}`)
        if (score >= 100) {
          won = true;
        }
        return won;
      }}

    module.exports = Scrabble;

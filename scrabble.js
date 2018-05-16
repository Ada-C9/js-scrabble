const letters = {
  A: 1,
  B: 3,
  C: 3,
  D: 2,
  E: 1,
  F: 4,
  G: 2,
  H: 4,
  I: 1,
  J: 8,
  K: 5,
  L: 1,
  M: 3,
  N: 1,
  O: 1,
  P: 3,
  Q: 10,
  R: 1,
  S: 1,
  T: 1,
  U: 1,
  V: 4,
  W: 4,
  X: 8,
  Y: 4,
  Z: 10
}

const Scrabble = {
  score(word) {
    let valid = /^[a-zA-Z]+$/;
    if (word === "" || word.length > 7 || !word.match(valid)) {
      throw "Not allowed";
    }
    let word_split = word.toUpperCase().split('');
    let word_value = 0;
    word_split.forEach((letter) => {
      if (letters[letter]) {
        word_value += letters[letter];
      }
    });
    if (word_split.length === 7) {
      word_value += 50;
    }
    return word_value;
  },
  breakTie(incumbent, challenger){
    if (incumbent.length === 7) {
      return incumbent;
    } else {
      return challenger;
    }
  },
  highestScoreFrom(arrayOfWords) {
    if (arrayOfWords === []) {
      return null;
    } else if (arrayOfWords.length == 1) {
      return arrayOfWords[0];
    } else {
      let best_word = arrayOfWords[0]; 
      arrayOfWords.forEach((word) => {
        if (score(word) > score(best_word)) {
          best_word = word;
        } else if (score(word) === score(best_word)) {
          breakTie(best_word, word);
        }
      });
    }
    return best_word;
  },
};

Scrabble.Player = class {

};


module.exports = Scrabble;

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
      throw "You must play a real word that is 7 characters or less";
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
    } else if (challenger.length === 7) {
      return challenger;
    } else if (challenger.length < incumbent.length) {
      return challenger;
    } else {
      return incumbent;
    }
  },
  highestScoreFrom(arrayOfWords) {
    if (arrayOfWords === []) {
      throw "No words to score";
    }

    if (arrayOfWords.length == 1) {
      return arrayOfWords[0];
    }

    let best_word = arrayOfWords[0];
    let best_score = this.score(best_word);

    for (let i = 1; i < arrayOfWords.length; i+= 1) {
      word = arrayOfWords[i]
      score = this.score(word)
      if (score > best_score) {
        best_word = word;
        best_score = score;
      }
      if (score === best_score) {
        best_word = this.breakTie(best_word, word);
      }
    }
    return best_word;
  }
};

Scrabble.Player = class {
  constructor(name){
    if (!name) {
      throw "You must enter a name for the player";
    }
    this.name = name;
    this.plays = [];
    this.score = 0;
  }

  name() {
    return this.name;
  }

  plays() {
    return this.plays;
  }

  wordValidator(word) {
    let valid = /^[a-zA-Z]+$/;
    if (word === "" || word.length > 7 || !word.match(valid)) {
      throw "You must play a real word that is 7 characters or less";
    }
  }

  play(word) {
    if (this.hasWon()) {
      return false;
    }
    this.wordValidator(word);

    let word_score = 0;

    if (this.plays.includes(word)) {
      throw "You have already played this word";
    } else {
      this.plays.push(word);
      word_score = Scrabble.score(word);
      this.score += word_score;
    }
    return word_score;
  }

  totalScore(){
    return this.score;
  }
  hasWon(){
    return this.score >= 100;
  }
  highestScoringWord() {
    return Scrabble.highestScoreFrom(this.plays);
  }
  highestWordScore() {
    let best_word = this.highestScoringWord();
    return Scrabble.score(best_word);
  }

};


module.exports = Scrabble;

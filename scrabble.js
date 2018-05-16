const LETTERS_ONLY = /^[a-z]+$/i;

const Scrabble = {

  score(word) {
    if (word == "" || word == null) throw "Cannot allow empty words";

    const scoreBook = {
      1: ['a', 'e', 'i', 'o', 'u', 'l', 'n', 'r', 's', 't'],
      2: ['d', 'g'],
      3: ['b', 'c', 'm', 'p'],
      4: ['f', 'h', 'v', 'w', 'y'],
      5: ['k'],
      8: ['j', 'x'],
      10: ['q', 'z']
    };


    let letterScore = function letterScore(letter) {
      if (letter.match(LETTERS_ONLY)) {
        let score = Object.keys(scoreBook).find(key => scoreBook[key].includes(letter));
        return parseInt(score);  }

      throw "Not a letter";
    };

    let word_array = word.toLowerCase().split("");
    let total = 0

    if (word.length > 7) throw "Word is too long";
    else if (word.length == 7) {
      total += 50 }

    word_array.forEach(function(letter) {
      total += letterScore(letter);
    });

    return total
  },



  highestScoreFrom(arrayOfWords) {
    if (arrayOfWords == []) throw "No words";

    let highestWord = arrayOfWords[0];
    let highestScore = Scrabble.score(arrayOfWords[0]);

    for(let i = 1; i < arrayOfWords.length; i += 1) {
      let word = arrayOfWords[i]

      let this_score = Scrabble.score(word);

      if (this_score > highestScore) {
        highestWord = word;
        highestScore = this_score;
      } else if (this_score === highestScore && highestWord.length < 7) {
        switch (true) {
          case word.length == 7:
          highestWord = word;
          highestScore = this_score;
          break;
          case word.length < highestWord.length:
          highestWord = word;
          highestScore = this_score;
          break;
      }
    }
  }
    return highestWord;
  }
}

Scrabble.Player = class {
  constructor(name) {
    this.name = name;
    this.plays = [];

  }

   play(word) {
     if (word.match(LETTERS_ONLY)) {

       if (this.totalScore() < 100) {
        console.log(this.name)
        this.plays.push(word);
        return word;
      } else {
        return false;}
      }
      else {
        throw "not a word";
      }
  }


   totalScore() {
    let total = 0;
    this.plays.forEach((word) => {
      total += Scrabble.score(word);
    });

    return total;
  }

  hasWon() {
    if (this.totalScore() >= 100 ) {
      return true;
    }
    else {
      return false;
    }
  }

  highestScoringWord (){
    return Scrabble.highestScoreFrom(this.plays)
  }

  highestWordScore (){
    let word = Scrabble.highestScoreFrom(this.plays)
    return Scrabble.score(word)
  }
};


module.exports = Scrabble;

let steffany = new Scrabble.Player
steffany.play("hello")
steffany.play("zzzzzz")
steffany.totalScore()
steffany.hasWon()
console.log(steffany.highestScoringWord())

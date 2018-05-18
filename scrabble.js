
const Scrabble = {
  score(word) {
    let word1 = word.toLowerCase()
    let wordScore = 0

    if (word1.length == 7) {
      wordScore += 50
    }

    if (/\W/.test(word1)) {
      throw "That is not a valid word!"
    } else if (word1.length > 7) {
      throw "That is not a valid word!"
    } else if (word1 == '') {
      throw "That is not a valid word!"
    }

    let characters = word1.split('')

    for (let letter of characters) {
      switch (true) {
        case /[ eaotinrslu ]/.test(letter):
        case /[ EAOTINRSLU]/.test(letter):
        wordScore += 1
        break;
        case /[ dg ]/.test(letter):
        case /[ DG ]/.test(letter):
        wordScore += 2
        break;
        case /[ cmbp]/.test(letter):
        case /[ CMBP]/.test(letter):
        wordScore += 3
        break;
        case /[ hfwyv]/.test(letter):
        case /[ HFWYV]/.test(letter):
        wordScore += 4
        break;
        case /[ k ]/.test(letter):
        case /[ K ]/.test(letter):
        wordScore += 5
        break;
        case /[ jx ]/.test(letter):
        case /[ JX ]/.test(letter):
        wordScore += 6
        break;
        case /[ qz ]/.test(letter):
        case /[ QZ ]/.test(letter):
        wordScore += 10
        break;
      }
    }
    console.log(`The score of ${word} is ${wordScore}`);
    return wordScore;
  },

  highestScoreFrom(arrayOfWords) {

    if (arrayOfWords.length == 0 || arrayOfWords == []) {
      throw "That is not a valid word!"

    }

    if (arrayOfWords.length > 0) {

      let highScoreWrd = 'iii'

      arrayOfWords.forEach((word) => {
        if (this.score(word) > this.score(highScoreWrd)) {
          highScoreWrd = word

        } else if (this.score(word) == this.score(highScoreWrd)) {
          if (word.length == 7) {
            highScoreWrd = word

          }else if (highScoreWrd.length == 7) {
            return highScoreWrd

          } else if (word.length < highScoreWrd.length) {
            highScoreWrd = word

          }


        }

      });

      return highScoreWrd;
    }
  },


};

Scrabble.Player = class {
  constructor(name){
    this.name = name;
    this.plays = []
    if (name == ' ' || name == null) {
      throw 'Player must have a name!'
    }
  }

  play(word) {
    if (this.hasWon()) {
      return false
    }else if (Scrabble.score(word)) {
      this.plays.push(word)
      let score = Scrabble.score(word)
      return score

    }

  }

  totalScore() {
    let overAllScore = 0
    this.plays.forEach(function(word){
      overAllScore += Scrabble.score(word)

    });
    return overAllScore

  }

  hasWon() {
    if (this.totalScore() >= 100) {
      return true
    } else {
      return false
    }



  }

  highestScoringWord() {
    if (this.plays == []) {
      throw "No one has played any words"
    } else {
      Scrabble.highestScoreFrom(this.plays)
    }


  }

  highestWordScore() {
    if (this.plays == []) {
      throw "No one has played any words"
    } else {
      Scrabble.score(this.highestScoringWord())
    }

  }


};


module.exports = Scrabble;

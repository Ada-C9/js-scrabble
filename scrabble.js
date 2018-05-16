
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

    if (arrayOfWords.length == 0 || arrayOfWords != []) {
      throw "That is not a valid word!"

    }

    if (arrayOfWords.length > 1) {

      let highScoreWrd = 0

      for (word of arrayOfWords) {
         (word) => {

          if (this.score(word) > highScoreWrd) {
            highScoreWrd = this.score(word)

          }
        }

      }

    }

  },
};


Scrabble.Player = class {

};


module.exports = Scrabble;

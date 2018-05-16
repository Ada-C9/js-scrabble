

const Scrabble = {


  score(word) {
    let wordArray = word.split('')
    let length = wordArray.length
    let sum = 0;

    if (length === 7) {
      sum = 50;
    } else if (length > 7)  {
      throw 'word length must be less than 7';
    } else if (length === 0) {
      throw 'word cannot be empty';
    }

    if (/[*&^$%#@!?]/.test(word)) {
      throw 'word cannot have symbols';
    }

    for( let letter of wordArray ) {
      switch (true) {
        case /[aeioulnrst]/i.test(letter):
        sum += 1;
        break;
        case /[dg]/i.test(letter):
        sum += 2;
        break;
        case /[bcmp]/i.test(letter):
        sum += 3;
        break;
        case /[fhvwy]/i.test(letter):
        sum += 4;
        break;
        case /[k]/i.test(letter):
        sum += 5;
        break;
        case /[jx]/i.test(letter):
        sum += 8;
        break;
        case /[qz]/i.test(letter):
        sum += 10;
        break;
      }
    }
    return sum
  },

  highestScoreFrom(arrayOfWords) {
    let highestScore = 0;
    let highestWords = [];
    let bestWord = null;

    if ((!Array.isArray(arrayOfWords) || !arrayOfWords.length)) {
      throw 'no words were passed'
    }

    arrayOfWords.forEach((word) => {
      if (this.score(word) >= highestScore) {
        highestScore = this.score(word);
        highestWords.push(word);
      }
    });

    highestWords.forEach(function(word) {
      let min = 7;
      if (word.length === 7) {
        return word;
      } else if (word.length < min) {
        min = word.length;
        bestWord = word;
      }
    });
    return bestWord
  },

  catch(e) {
    console.log(e);
  }

}


Scrabble.Player = class {

};


module.exports = Scrabble;

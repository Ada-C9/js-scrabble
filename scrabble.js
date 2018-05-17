const Scrabble = {

  score(word) {
    let wordArray = word.split('')
    let length = wordArray.length
    let sum = 0;

    if (length === 7) {
      sum = 50;
    } else if (length > 7)  {
      throw 'Word length must be less than 7';
    } else if (length === 0) {
      throw 'Word cannot be empty';
    }

    if (/[*&^$%#@!?]/.test(word)) {
      throw 'Word cannot have symbols';
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
    if ((!Array.isArray(arrayOfWords) || !arrayOfWords.length)) {
      throw 'No words were passed'
    }

    let bestWord = arrayOfWords[0]

    arrayOfWords.forEach((word) => {
      let score = this.score(word)
      if (score > this.score(bestWord)) {
        bestWord = word;
      } else if (score == this.score(bestWord)) {
        bestWord = this.tieBreaker(bestWord, word);
      }
    });
    return bestWord;
  },

  tieBreaker(first, second) {
    if (first.length == 7) {
      return first;
    } else if (second.length == 7) {
      return second;
    } else if (second.length < first.length) {
      return second;
    } else {
      return first;
    }
  },

  catch(e) {
    console.log(e);
  }

}


Scrabble.Player = class {
  constructor(name, plays) {
    this.name = name;
    this.plays = plays;
    if (!name || !name.length) {
      throw 'Player must have a name'
    }
  }

  play(word) {
    Scrabble.score(word)
    if (Scrabble.score(word)) {
      this.plays.push(word);
    }
  }

  hasWon() {

  }

  highestScoringWord() {

  }

  highestWordScore() {

  }

};


module.exports = Scrabble;

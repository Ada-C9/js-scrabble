


const Scrabble = {
  score(word) {
    let wordArray = word.toUpperCase().split(``);
    let wordTotal = 0

    if(wordArray.length > 7) {
      throw new Error ("Word is too long for Scrabble, max 7 letters");
    }
    if(!/^[a-zA-Z]+$/.test(word)) {
      throw new Error ("Invalid character in the word");
    }
    if(word === "") {
      throw new Error ("Must enter a word with at least one character")
    }

    wordArray.forEach(function(letter){
      if ([`A`, `E`, `I`, `O`, `U`, `L`, `N`, `R`, `S`, `T`].includes(letter)) {
        wordTotal += 1;
      }
      else if ([`D`, `G`].includes(letter)) {
        wordTotal += 2;
      }
      else if ([`B`, `C`, `M`, `P`].includes(letter)) {
        wordTotal += 3;
      }
      else if ([`F`, `H`, `V`, `W`, `Y`].includes(letter)) {
        wordTotal += 4;
      }
      else if ([`K`].includes(letter)) {
        wordTotal += 5;
      }
      else if ([`J`, `X`].includes(letter)) {
        wordTotal += 8;
      }
      else if ([`Q`, `Z`].includes(letter)) {
        wordTotal += 10;
      }

    });
    if (wordArray.length === 7) {
      wordTotal += 50;
    }
    return wordTotal;
  },

  highestScoreFrom(arrayOfWords) {
    if (arrayOfWords.length === 0) {
      throw new Error (`You have no words to check`);
    }
    let the_word = arrayOfWords[0]
    arrayOfWords.forEach(function(word){
      if (Scrabble.score(word) > Scrabble.score(the_word)){
        the_word = word;
      }
      else if (Scrabble.score(word) === Scrabble.score(the_word) && (word.length === 7 && the_word.length < 7)){
        the_word = word;
      }
      else if (Scrabble.score(word) === Scrabble.score(the_word) &&
      (word.length < the_word.length && the_word.length < 7)){
        the_word = word;
      }
    })
    return the_word
  },

};

Scrabble.Player = class {

};


module.exports = Scrabble;

// console.log(Scrabble.score("oooooooooo"))
//
// let myWords = [ `iiiiddd`, `zzzzzz`]
//
// console.log(Scrabble.highestScoreFrom(myWords))

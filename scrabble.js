
const Scrabble = {

  score(word) {
    if (word == "") throw "Cannot allow empty words";

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
      if (letter.match(/[a-z]/i)) {
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
          case highestWord.length < 7:
          highestWord = word;
          highestScore = this_score;
          break;
      }
    }
  }
  console.log(`last return' ${highestWord}`)
    return highestWord;
  }
}

Scrabble.Player = class {

};


module.exports = Scrabble;

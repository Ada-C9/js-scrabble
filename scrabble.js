
const Scrabble = {

  score(word) {

    let letterScore = function letterScore(letter) {
      let score = Object.keys(scoreBook).find(key => scoreBook[key].includes(letter));
      return parseInt(score);
    };

    const scoreBook = {
      1: ['a', 'e', 'i', 'o', 'u', 'l', 'n', 'r', 's', 't'],
      2: ['d', 'g'],
      3: ['b', 'c', 'm', 'p'],
      4: ['f', 'h', 'v', 'w', 'y'],
      5: ['k'],
      8: ['j', 'x'],
      10: ['q', 'z']
    };

    let word_array = word.toLowerCase().split("");
    let total = 0

    word_array.forEach(function(letter) {
      total += letterScore(letter);
    });

    return total
  },



  highestScoreFrom(arrayOfWords) {
    let highest_word = arrayOfWords[0];
    let highest_score = Scrabble.score(arrayOfWords[0]);

    arrayOfWords.forEach(function (word) {
      let this_score = Scrabble.score(word);

      if (this_score > highest_score) {
        highest_word = word;
        highest_score = this_score;
      } else if (this_score === highest_score) {
        if (word.length < highest_word.length) {
        highest_word = word ;
        highest_score = this_score; }
      }
    })

    return highest_word
  }
};

Scrabble.Player = class {

};


module.exports = Scrabble;



console.log(Scrabble.score("okay"))
console.log(Scrabble.highestScoreFrom(['ok', 'fun', 'xyxyx']))

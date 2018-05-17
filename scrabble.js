
const Scrabble = {
  score(word) {
    const onePoint = ['A','E','I','O','U','L','N','R','S','T'];
    const twoPoint = ['D','G'];
    const threePoint = ['B','C','M', 'P'];
    const fourPoint = ['F','H','V','W','Y'];
    const fivePoint = ['K'];
    const eightPoint = ['J','X'];
    const tenPoint = ['Q','Z'];

    let total = 0;

    const regex_key = /^[a-z]+$/i;

    word = word.split('');

    if (word.length == 0) {
      throw "word cannot be an empty string";
    } else if (word.length > 7) {
      throw "word cannot be longer than 7 letters";
    } else {
      word.forEach(function (char) {
        if (regex_key.test(char) === false) {
          throw "word can only contain letters";
        }
      })
    }

    word = word.join()
    word = word.toUpperCase().split('')

    // optional? Edits guesses to remove non letter guesses
    // const regex_key = /^[a-z]+$/i;
    // word.forEach( function (char){
    //   if (regex_key.test(char)) {
    //     word.pop(char);
    //   }
    // })

    word.forEach(function (char) {
      if (onePoint.includes(char)){
        total += 1;
      }else if (twoPoint.includes(char)){
        total += 2;
      }else if (threePoint.includes(char)){
        total += 3;
      }else if (fourPoint.includes(char)){
        total += 4;
      }else if (fivePoint.includes(char)){
        total += 5;
      }else if (eightPoint.includes(char)){
        total += 8;
      }else if (tenPoint.includes(char)){
        total += 10;
      }
    });

    // why doesn't this work when i try
    // word.length === 7 ? total += 50 : total ;

    word.length > 6 ? total += 50 : total ;
    console.log(total);
    return total;
  },

  highestScoreFrom(arrayOfWords) {
    if (arrayOfWords.length === 0){
      throw "must enter a valid list of words to score."
    }
    //array to be populated with objects containing word and their score
    let trackScore = [];

//makes an array of objects with word and its score
    arrayOfWords.forEach(function (word) {
      trackScore.push({
        'word': word,
        'score': Scrabble.score(word),
      });
    }

    // highest score
    let highScore = 0;

    trackScore.forEach( function (object){
      if (object.score > highScore) {
        highScore = object.score;
      }
    })

    let highScoreWords = [];

    trackScore.forEach( function (object){
      if (object.score === highScore) {
        highScoreWords.push(object.word);
      }
    })

    highScoreWords.forEach (function (word){
      if (word.length == 7){
        return word;
      }
    })

    let shortestWord = "1234567"
    highScoreWords.forEach (function (word){
      if (word.length < shortestWord) {
        shortestWord = word;
      }
    })


    // this should be dealt with by other throws...no?
    // if (highScore < 1){
    //   throw "Words must have a score"
    // }


    // tied btwn words < 7 longer, take shorter word
    // tied with word == 7 take 7 letter word:

    // tied with same length take first scored word: order matters so keep array

    maxScoringWord = arrayOfWords[0];


    if (scored_word > maxScoreWord.score) {
      maxScoreWord.score = scored_word;
      maxScoreWord.word = [unscored_word];
    } else if (scored_word === maxScoreWord.score){
      maxScoreWord.word.push(unscored_word);
    }
  })

  if (maxScoreWord.word.length === 1){
    return maxScoreWord[0];
  } else if (maxScoreWord.word.length > 1){
    let shortestWord = ["12345678"];
    maxScoreWord.forEach(function (word) {
      if (word.length < shortestWord[0].length){
        shortestWord = [word];
      }else if (word.length === shortestWord.length) {
        shortestWord.push(word);
      }
    });
    return shortestWord[0];
  }
},
};

Scrabble.Player = class {

};


module.exports = Scrabble;

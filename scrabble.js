
const Scrabble = {


  score(word) {

    let wordScore = 0

    const SCORING_RUBRIK = {
      'a': 1,
      'e': 1,
      'i': 1,
      'o': 1,
      'u': 1,
      'l': 1,
      'n': 1,
      'r': 1,
      's': 1,
      't': 1,
      'd': 2,
      'g': 2,
      'b': 3,
      'c': 3,
      'm': 3,
      'p': 3,
      'f': 4,
      'h': 4,
      'v': 4,
      'w': 4,
      'y': 4,
      'k': 5,
      'j': 8,
      'x': 8,
      'q': 10,
      'z': 10
    }
    if (typeof word == 'number'){
      throw 'Letters only please.';
    }

    for (let i = 0; i < word.length; i++) {

      let letter = word[i];

      if (!RegExp(/^[a-zA-Z]+$/).test(letter)){

        throw `Letters only please. Letter: ${letter} i == ${i} word: ${word}`
      }

      wordScore += SCORING_RUBRIK[letter.toLowerCase()];
    }

    if (word.length === 7){
      wordScore += 50;
    }else if (word.length > 7){
      throw "Words can not be longer than 7 letters.";
    }else if (word.length === 0){
      throw "Please submit a word for the game.";
    }

    return wordScore;
  },


  highestScoreFrom(arrayOfWords) {
    let highWord = ''
    if (arrayOfWords.length === 0){
      throw "Empty Array of words to choose the highest score from.";
    }else if (arrayOfWords.length === 1){
      highWord = arrayOfWords[0];
    }else {
      let highScore = -1
      for (let i = 0; i < arrayOfWords.length; i++){

        let compareWord = arrayOfWords[i]
        let score = this.score(compareWord)
        if (score > highScore){
          highWord = compareWord
          highScore = score
        }else if (score == highScore){
          highWord =   Scrabble.tiebreaker(compareWord,highWord)
        }
      }
    }
    return highWord;
  },

  highestWordScoreWord(arrayOfWords) {
    let highWord = ''
    let highScore = -1
    if (arrayOfWords.length === 0){
      throw "Empty Array of words to choose the highest score from.";
    }else if (arrayOfWords.length === 1){
      highWord = arrayOfWords[0];
    }else {

      for (let i = 0; i < arrayOfWords.length; i++){

        let compareWord = arrayOfWords[i]
        let score = this.score(compareWord)
        if (score > highScore){
          highWord = compareWord
          highScore = score
        }else if (score == highScore){
          highWord =   Scrabble.tiebreaker(compareWord,highWord)
        }
      }
    }
    return highScore;
  },

  tiebreaker(challenger, incumbent){
    if (incumbent.length === 7){
      return incumbent;
    }else if (challenger.length === 7){
      return challenger;
    }

    if (challenger.length > incumbent.length){
      return incumbent;
    }else if (challenger.length < incumbent.length){
      return challenger;
    }else if (incumbent.length == challenger.length){
      return incumbent;
    }

  }


};


Scrabble.Player = class{

  constructor(name, plays = []) {
    this.name = name;
    this.plays = plays;


    if (name == null){
      throw "Please enter a name";
    }
  }

  //   scrabbleScore(word) {
  //     return Scrabble.score(word);
  // //LOOSE COUPLING I can't get this to work
  //   }


  play(word){
    if (this.hasWon()){
      //check if it is a word
      return false;
    }else if(word.length > 7 || word.length === 0){
      throw "Words can only be 7 letters long.";
    }else{
      let scorePlayWord = Scrabble.score(word);
      this.plays.push(word);
      return scorePlayWord;
    }

  }

  totalScore (){
    let totalScores = 0;
    let wordsPlayed = this.plays;
    wordsPlayed.forEach(function (word){
      totalScores += Scrabble.score(word);
    })
    return totalScores;
  }

  hasWon(){
    if (this.totalScore() > 100){
      return true;
    }else if (this.totalScore() === 100){
      return true;
    }else{
      return false;
    }
  }

  highestScoringWord(){
    if (this.plays.length === 0){
      throw "No words played yet.";
    }
  return Scrabble.highestScoreFrom(this.plays);
  }

highestWordScore(){
  if (this.plays.length === 0){
    throw "Not a single word played yet.";
  }
  return Scrabble.highestWordScoreWord(this.plays);
}
};




module.exports = Scrabble;

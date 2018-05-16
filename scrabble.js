const SCORECHART = {
  "A" : 1, "B" : 3, "C" : 3, "D" : 2,
  "E" : 1, "F" : 4, "G" : 2, "H" : 4,
  "I" : 1, "J" : 8, "K" : 5, "L" : 1,
  "M" : 3, "N" : 1, "O" : 1, "P" : 3,
  "Q" : 10, "R" : 1, "S" : 1, "T" : 1,
  "U" : 1, "V" : 4, "W" : 4, "X" : 8,
  "Y" : 4, "Z" : 10
};

const REGEX = /^[a-zA-Z]+$/;

const Scrabble = {
  score(word) {
    checkWord(word);

    let wordScore = 0;
    let upperCase = word.toUpperCase();
    for(let char of upperCase) {
      wordScore += SCORECHART[char];
    }

    return checkBonus(word) ? wordScore += 50 : wordScore;
  },

  highestScoreFrom(arrayOfWords) {
    checkArray(arrayOfWords);

    let maxScore = Scrabble.score(arrayOfWords[0]);
    let maxWord = arrayOfWords[0];

    arrayOfWords.forEach( function(word){
      let currScore = Scrabble.score(word);
      if (currScore > maxScore) {
        maxScore = currScore;
        maxWord = word;
      } else if (currScore === maxScore) {
        if (word.length < maxWord.length && maxWord.length !== 7){
          maxScore = currScore;
          maxWord = word;
        } else if (word.length === 7 && maxWord.length !==7) {
          maxScore = currScore;
          maxWord = word;
        }
      }
    });
    return maxWord;
  },
};

Scrabble.Player = class {
  constructor(name){
    if (name === undefined || name === null){
      throw 'Must provide name';
    } else {
      this.name = name;
    }
    this.plays = [];
  }

  play(word){
    if (this.hasWon()){
      return false;
    } else {
      if (word === undefined || word === null || REGEX.test(word) === false){
        throw 'Invalid word';
      } else {
        return this.plays.push(word);
      }
    }
  }

  totalScore(){
    let total = 0;
    this.plays.forEach( (word) => {
      total += Scrabble.score(word);
    });
    return total;
  }

  hasWon(){
    return this.totalScore() >= 100 ? true : false;
  }

  highestScoringWord(){
    if (this.plays.length === 0){
      throw 'No words played';
    } else {
      return Scrabble.highestScoreFrom(this.plays)
    }
  }

  highestWordScore(){
    if (this.plays.length === 0){
      throw 'No words played';
    } else {
      return Scrabble.score(Scrabble.highestScoreFrom(this.plays));
    }
  }
};

Scrabble.TileBag = class {
  constructor(){
    this.createBag();
    this.bag;
  }

  createBag(){
    let alphabet =  'abcdefghijklmnopqrstuvwxyz'.split('');
    let alphabetQuant = [9,2,2,4,12,2,3,2,9,1,1,4,2,6,8,2,1,6,4,6,4,2,2,1,2,1];
    let tileBag = [];

    for (let i = 0; i < alphabet.length; i++){
      let quantity = alphabetQuant[i];
      for (let j=0; j < quantity; j++){
        tileBag.push(alphabet[i]);
      }
    }

    this.bag = tileBag;
    return tileBag;
  }

  drawTile(num){
    if (this.bag.length - num < 0){
      throw 'There are not enough tiles left';
    } else if (num === undefined || num === null || num < 0 || num > 7) {
      throw 'invalid num of tiles';
    } else {
      let drawnTiles = [];
      for ( let i = 0; i < num; i++ ){
        let randNum = Math.floor(Math.random() * this.bag.length);
        let randLetter = this.bag[randNum];
        drawnTiles.push(randLetter)
        this.bag.splice(this.bag.indexOf(randLetter), 1);
      }
      return drawnTiles;
    }
  }

  remainingTiles(){
    return this.bag.length;
  }
}

// Helper methods

const checkWord = function checkWord(input){
  if (input.length === 0 || input.length > 7){
    throw 'Invalid input length';
  }
  if (REGEX.test(input) === false){
    throw 'Only letters allowed';
  }
}

const checkArray = function checkArray(array){
  if (array.length === 0){
    throw 'Invalid array';
  }
}

const checkBonus = function checkBonus(word){
  if (word.length == 7) {
    return 50;
  }
}

const bag = new Scrabble.TileBag();
console.log(`My tilebag is: ${bag.bag}`);
console.log(`My letter: ${bag.drawTile(4)}`);
console.log(`My tilebag is: ${bag.bag}`);

module.exports = Scrabble;

// // deprecated findPoints function
// const findPoints = function findPoints(letter) {
//   switch(true) {
//     case (['A','E','I','O','U','L','N','R','S','T'].includes(letter)):
//       return 1;
//     case (['D','G'].includes(letter)):
//       return 2;
//     case (['B','C','M','P'].includes(letter)):
//       return 3;
//     case (['F','H','V','W','Y'].includes(letter)):
//       return 4;
//     case (['K'].includes(letter)):
//       return 5;
//     case (['J','X'].includes(letter)):
//       return 8;
//     case (['Q','Z'].includes(letter)):
//       return 8;
//   }
// }


const scoreTable = {
  'a': { 'points':  1, 'tiles':  9 },
  'b': { 'points':  3, 'tiles':  2 },
  'c': { 'points':  3, 'tiles':  2 },
  'd': { 'points':  2, 'tiles':  4 },
  'e': { 'points':  1, 'tiles': 12 },
  'f': { 'points':  4, 'tiles':  2 },
  'g': { 'points':  2, 'tiles':  3 },
  'h': { 'points':  4, 'tiles':  2 },
  'i': { 'points':  1, 'tiles':  9 },
  'j': { 'points':  8, 'tiles':  1 },
  'k': { 'points':  5, 'tiles':  1 },
  'l': { 'points':  1, 'tiles':  4 },
  'm': { 'points':  3, 'tiles':  2 },
  'n': { 'points':  1, 'tiles':  6 },
  'o': { 'points':  1, 'tiles':  8 },
  'p': { 'points':  3, 'tiles':  2 },
  'q': { 'points': 10, 'tiles':  1 },
  'r': { 'points':  1, 'tiles':  6 },
  's': { 'points':  1, 'tiles':  4 },
  't': { 'points':  1, 'tiles':  6 },
  'u': { 'points':  1, 'tiles':  4 },
  'v': { 'points':  4, 'tiles':  2 },
  'w': { 'points':  4, 'tiles':  2 },
  'x': { 'points':  8, 'tiles':  1 },
  'y': { 'points':  4, 'tiles':  2 },
  'z': { 'points': 10, 'tiles':  1 },
  'blank': { 'tiles': 2}
}

const findPoints = function findPoints(letter) {
  let tileInfo = scoreTable[letter];
  let points = tileInfo['points'];
  return points;
}

const Scrabble = {

  const Player = class {
    constructor(name, plays = []) {
      this.name = name;
      this.plays = plays;
    },

    play(word) {

    },

    totalScore() {

    },

    hasWon() {

    },

    highScoringWord() {

    },

    highestWordScore() {

    }
  },

  score(word) {
    let score = 0;
    if (word.length === 7) {
      score = 50;
      return score;
    }
    for (let i = 0; i < word.length; i++) {
      let points = findPoints(word[i]);
      score += points;
    }
    return score;
  },

  highestScoreFrom(arrayOfWords) {
    let maxWord = null;
    let maxPoints = null;
    arrayOfWords.forEach(function (word) {
      let score = Scrabble.score(word);
      if (maxPoints < score) {
        maxWord = word;
        maxPoints = score;
      }
    });
    return maxWord;
  },
}





let jill = new Scrabble.Player('jill');

console.log(jill);

console.log(Scrabble.score('apple'));
console.log(Scrabble.score('mom'));
console.log(Scrabble.score('q'));

console.log(Scrabble.highestScoreFrom(['quartzy','axe','mom','q']));






// let index = null;
// for (index in word) {
//   console.log(word[index]);


const Scrabble = {
  score(word) {


    let letterScoreOf1 = ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"];
    let letterScoreOf2 =  ["D", "G"	];
    let letterScoreOf3 =  ["B", "C", "M", "P"	];
    let letterScoreOf4 =  ["F", "H", "V", "W", "Y"];
    let letterScoreOf5 =  ["K"];
    let letterScoreOf8 =  ["J", "X"];
    let letterScoreOf10 =  ["Q", "Z"];

    let letters = word.toUpperCase().split("");
    let score = 0

    // Add points for each letter:
    letters.forEach(function(letter) {
      if (letterScoreOf1.includes(letter)){
        score ++;
      } else if (letterScoreOf2.includes(letter)){
        score += 2;
      }else if  (letterScoreOf3.includes(letter)){
        score += 3;
      }else if  (letterScoreOf4.includes(letter)){
        score += 4;
      }else if  (letterScoreOf5.includes(letter)){
        score += 5;
      }else if  (letterScoreOf8.includes(letter)){
        score += 8;
      }else if  (letterScoreOf10.includes(letter)){
        score += 10;
      }
    });

    // Test for 7-letter word:
    if  (letters.length == 7){
      score += 50;
    }

    return score;
  },


  highestScoreFrom(arrayOfWords) {

  },
};

Scrabble.Player = class {

};


module.exports = Scrabble;


// Scrabble.score('dog');

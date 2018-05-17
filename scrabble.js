const Scrabble = {
  score_per_char(){
    return{
      A:1, E:1, I:1, O:1, U:1, L:1, N:1, R:1, S:1, T:1, D:2, G:2
      ,B:3, C:3, M:3, P:3
      ,F:4, H:4, V:4, W:4, Y:4
      ,K:5
      ,J:8,X:8
      ,Q:10,Z:10
      }
  },

  score:function(word){
    if (word === ''){
        throw new Error('Does not allow an empty input.');
    }
    if (word.length > 7){
        throw new Error('Does not allow words > 7 letters.');
    }
    if (word.length < 1){
       throw new Error('Word length must be at least 1 character.')
    }

    if (/^[a-zA-Z]*$(?=)/.test(word) === false){
      throw new Error('Word must only characters A - Z.')
    }

        let total = 0;
        const bonus_points = 50;
         if (word.length == 7){
           total+= bonus_points;
         }

         for(let i = 0; i < word.length; i++){
           total+= this.score_per_char()[word[i].toUpperCase()] }
         return total
          },
  highestScoreFrom:function(arrayOfWords){
      if (arrayOfWords.length === 0){
        throw new Error('Pass in a minimum of one word.')
      }
      if(Array.isArray(arrayOfWords) === false){
         throw new Error('Collection of words must be an array.')
       }
      let winner = arrayOfWords[0];
      const that = this;
      arrayOfWords.forEach(function(word){
          if(that.score(word) > that.score(winner)){
               winner = word
          }else if (that.score(word) === that.score(winner)){
              if(word.length === 7 ){
                   winner = word
              }else if((word.length < winner.length) && winner.length != 7){
                   winner = word
              }
          }
      });
      return winner
  }
};

Scrabble.Player = class {
  constructor(name){
    if (name === null){
      throw new Error('Null is not a valid input for name.');
    }
    if (name === undefined){
      throw new Error('Name must be assigned a value.');
    }

    this.name = name;
    this.plays = [];
  }

  play(word){
    if (word === null){
      throw new Error('Null is not a valid input for word.');
    }
    if (word === undefined){
      throw new Error('The word input must be assigned a value.');
    }

    if (typeof word != 'string'){
      throw new Error('Input must be of type String');
    }
    let user_has_won = this.hasWon();
    if (user_has_won){
      return false
    }else {
      if (word.length)
      this.plays.push(word)
      return true
    }
  }

  totalScore(){
    let total = 0;
    this.plays.forEach(function(aWord){
        total+= Scrabble.score(aWord)
    });
    return total;
  }

  hasWon(){
    if (this.totalScore() >= 100){
      return true;
    }else{
      return false;
    }
  }

  highestScoringWord(){
    if (this.plays.length == 0) {
      throw new Error('No words have been played yet.')
    }
    return Scrabble.highestScoreFrom(this.plays);
  }

  highestWordScore(){
    return Scrabble.score(this.highestScoringWord())
  }

};
module.exports = Scrabble;

// let r = 'iiiiddd'
// let t = 'zzzzzz'
//
// let v = Scrabble.score('iiiiddd')
// let p = Scrabble.score('zzzzzz')
// console.log(v)
// console.log(p)
// console.log(Scrabble.highestScoreFrom([r,t]))

// const word = 'hiz';
// const player = new Scrabble.Player('test player');
//
// player.play('zzzzzzz')
// player.play('a')
// player.play('rawr')
// player.play('teehee')
// console.log(player.totalScore())
// console.log(player.highestScoringWord())



//   arrayOfWords.forEach(function(word){
//     if (this.score(word) > max_score.score(word)){
//       max_score = word
//      }
//   return max_score })
// }

//
// highestScoreFrom(arrayOfWords){
//   if (arrayOfWords === []){
//     throw new Error('Array cannot be empty')
//   }
//   if(Array.isArray(arrayOfWords) === false){
//     throw new Error('Must input an array')
//   }
//
//   let max_score = arrayOfWords[0]
//   arrayOfWords.forEach(function(word){
//     if (this.score(word) > max_score.score(word)){
//       max_score = word
//      }
//   return max_score })
// }

// Previous design //
// const Scrabble = function Scrabble(word, arrayOfWords = []){
//   this.word = word
//   this.arrayOfWords = arrayOfWords
// };
//
// Scrabble.prototype ={
//   score_per_char(){
//     return {A:1, E:1, I:1, O:1, U:1, L:1, N:1, R:1, S:1, T:1, D:2, G:2, B:3, C:3,
//       M:3, P:3, F:4, H:4, V:4, W:4, Y:4,
//        K:5, J:6, X:6, Q:7, Z:7};
//   },
//   score(){
//     let total = 0;
//     for(let i = 0; i < this.word.length; i++){
//       total+= this.score_per_char()[this.word[i].toUpperCase()]
//     }
//     return total
//   },
//   highestScoreFrom(){
//     sorted_array = this.arrayOfWords.sort();
//     if sorted_array[sorted_array.length-1] === 7
//
//   }
// };




// Previous Garbage //

// // highestScoreFrom(arrayOfWords) {
// //
// // },
//
//
//
// //
// // Scrabble.Player = class {
// //
// // };
// //
//
//
//
// module.exports = Scrabble;
// const Scrabble = function Scrabble(word){
//   this.word = word;
//   score_per_char(){
//     return {A:1, E:1, I:1, O:1, U:1, L:1, N:1, R:1, S:1, T:1, D:2, G:2, B:3, C:3,
//       M:3, P:3, F:4, H:4, V:4, W:4, Y:4,
//        K:5, J:6, X:6, Q:7, Z:7};
//   },
//   score(word) {
//     let total = 0;
//     for(let i = 0; i < word.length; i++){
//       total+= this.score_per_char[word[i].toUpperCase()]
//     }
//     return total
//   }
//   // highestScoreFrom(arrayOfWords) {
//   //
//   // },
// };
//
// let game = new Scrabble('hello')
// console.log(game.score);
// // Scrabble.Player = class {
// //
// // };
// //
// //
// // module.exports = Scrabble;
//
//
// // Scrabble.prototype = {
// //   score_per_char(){
// //     return {A:1, E:1, I:1, O:1, U:1, L:1, N:1, R:1, S:1, T:1};
// //   }
// // }

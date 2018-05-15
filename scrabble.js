
const Scrabble = {
  score_per_char(){
    return{A:1, E:1, I:1, O:1, U:1, L:1, N:1, R:1, S:1, T:1, D:2, G:2, B:3, C:3,
      M:3, P:3, F:4, H:4, V:4, W:4, Y:4,
       K:5, J:6, X:6, Q:7, Z:7}
     },
  score(word){
    let total = 0;
    for(let i = 0; i < word.length; i++){
      total+= this.score_per_char()[word[i].toUpperCase()] }
    return total
  },
    highestScoreFrom(arrayOfWords){
      let max_score = arrayOfWords[0]
      let bonus_points = 0
      arrayOfWords.forEach(function(word){
        if (word.length === 7){
          bonus_points = 50
         }
        if (this.score(word) + bonus_points > max_score.score(word)){
          max_score = word
         }
      return max_score  })
    }
}

 let game = Scrabble
 console.log(game.score('zei'));

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

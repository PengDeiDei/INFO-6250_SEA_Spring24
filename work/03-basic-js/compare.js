"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

/*
 * Revise the function using Array rather than Set or Map following the 
 * restriction. 
 */
function compare( word, guess ) {  // DO NOT MODIFY
/* YOU MAY MODIFY THE LINES BELOW */
  const wordArray = word.toLowerCase().split('');
  const guessArray = guess.toLowerCase().split('');

  let count = 0;

  /* for each loop to go over each element in word array to check if the
   * current element appears in the guess array; If found, remove the 
   * first found element in the guess array and increase count.
   */
  wordArray.forEach(letter => {
    if(guessArray.includes(letter)){
      count++;
      guessArray.splice(guessArray.indexOf(letter),1);
    }
  });

  return count;
}

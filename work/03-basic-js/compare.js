"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

/*
 * Revise the function using Array rather than Set or Map following the 
 * restriction. 
 */
function compare( word, guess ) {  // DO NOT MODIFY
/* YOU MAY MODIFY THE LINES BELOW */
  word = word.toLowerCase().split('');
  guess = guess.toLowerCase().split('');

  let matched = 0;
  const letterCount = {};
  
  /* 
   * For each loop to count the number of each letter in word
   */
  word.forEach(letter => {
    letterCount[letter] = letterCount[letter]+1 || 1;
  });

  /*
   * For each loop to count the common letters between word and guess
   */
  guess.forEach(letter => {
    if(letterCount[letter]){
      letterCount[letter] -= 1;
      matched++;
    }
  });

  return matched;
}

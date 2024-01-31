"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

/*
 * since we only care about the common letters between two words,
 * it is better to use Set to remove duplicated letters in each word
 * before comparing
 */
function compare( word, guess ) {  // DO NOT MODIFY
/* YOU MAY MODIFY THE LINES BELOW */
  const wordSet = new Set(word.toLowerCase());
  const guessSet = new Set(guess.toLowerCase());

  // creat a new set that only contains common letters in both word and guess
  const commonLettersSet = new Set([...wordSet].filter(letter => guessSet.has(letter)));

  return commonLettersSet.size; // this line is wrong
}

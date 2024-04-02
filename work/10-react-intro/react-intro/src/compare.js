"use strict";

function compare(guess) {
  const secretWord = "RECAT".split('');
  guess = guess.toUpperCase().split('');

  let matched = 0;
  const letterCount = {};

  secretWord.forEach(letter => {
    letterCount[letter] = letterCount[letter]+1 || 1;
  });

  guess.forEach(letter => {
    if(letterCount[letter]){
      letterCount[letter] -= 1;
      matched++;
    }
  });

  return matched;
}

export default compare;
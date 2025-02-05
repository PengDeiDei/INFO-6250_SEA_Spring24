const compare = require('./compare');
const words = require('./words');

const setGame = function(){
    return {
        word: pickWord(words),
        turns: 0,
        wordList: [...words],
        guesses: [],
    }
};

const takeTurn = function(guess, game) {
    let message = '';
    let finishFlag = false;
    let userState = 1;
    message = isValidGuess(guess, game);

    if(message){
        userState = 0;
        return {finishFlag, message, userState};
    }

    const word = game.word;

    game.turns++;
    setWordList(guess, game);

    if(exactMatch(word, guess)){
        finishFlag = true;
        message = `CORRECT! You won in ${game.turns} turns!`;
        return {finishFlag, message};
    }

    const matches = compare(word, guess);
    commons = getCommonLetters(word,guess)
    game.guesses.push({guess, matches, commons});

    message = `Your guess "${guess}" matched ${matches} letters out of ${word.length}.` 
        + ` The unique common letters are: [ ${commons} ]`;
    return {finishFlag, message, userState};
};

const isValidGuess = function (guess, game){
    const clean = guess.replace(/[^A-Za-z]+/g, '');
    let errorMsg = '';

    if(!guess){ 
        return errorMsg = 'Your Guess is Empty';
    }

    if(clean != guess) { 
        return errorMsg = 'Your Guess Contains Invalid Characters'; 
    }

    if(!game.wordList.includes(clean)) { 
        return errorMsg ='Your Guess should be From the Word List'; 
    }

    return errorMsg;
};

function exactMatch (word, guess) {
    return word.toLowerCase() === guess.toLowerCase();
};

function getCommonLetters(word, guess){
    word = word.toLowerCase().split('');
    guess = guess.toLowerCase().split('');
    let commonLetters = [];

    for (const letter of word) {
        if (!commonLetters.includes(letter) && guess.includes(letter)) {
            commonLetters.push(letter);
        }
    }

    for (const letter of guess) {
        if (!commonLetters.includes(letter) && word.includes(letter)) {
            commonLetters.push(letter);
        }
    }

    return commonLetters;
}

function setWordList (guess, game) {
    game.wordList.splice(game.wordList.indexOf(guess),1);
};

function pickWord(wordList) {
    return wordList[Math.floor(Math.random() * wordList.length)];
};

const gameHelper = {
    setGame,
    takeTurn,
};

module.exports = gameHelper;
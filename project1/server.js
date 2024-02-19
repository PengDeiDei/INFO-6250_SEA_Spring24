const express = require('express');
const uuidv4 = require('uuid').v4;
const cookieParser = require('cookie-parser');
const users = require('./users')
const webPage = require('./web-page');
const gameHelper = require('./game-helper');

const PORT = 3000;
const app = express();

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.urlencoded({extended: false}));

app.get('/', (req,res) =>{
    const sid = req.cookies.sid;

    if(sid && users.isValidSID(sid)){
        const username = users.sessions[sid].username;

        const game = users.savedGame[username];

        res.send(webPage.gamePage(username, game, 'Make Your Guess From the Word List'));
        return;
    }

    res.send(webPage.loginPage());
});

// login
app.post('/login', (req,res) => {
    const username = req.body.username.trim();
    const { errorStatus, errorMsg } = users.isValidUsername(username);

    if(errorStatus){
        res.status(errorStatus).send(webPage.errorPage(errorStatus, errorMsg));
        return;
    }

    const sid = uuidv4();
    users.sessions[sid] = {username};
    users.userState[username] = 1;

    if(!users.savedGame[username]){ // create new game for logged in user with no ongoing game
        users.savedGame[username] = gameHelper.setGame();
        console.log(`Create New Game With User: ${username} and Word: ${users.savedGame[username].word}`);
    }

    res.cookie('sid', sid);
    res.redirect('/');
});

// logout
app.post('/logout', (req,res) => {
    const sid = req.cookies.sid;
    delete users.sessions[sid];
    res.clearCookie('sid');
    res.redirect('/');
});

// new game
app.post('/new-game', (req, res) =>{
    const sid = req.cookies.sid;

    if(sid && users.isValidSID(sid)){
        const username = users.sessions[sid].username;
        const game = gameHelper.setGame();
        users.savedGame[username] = game;
        users.userState[username] = 1;

        console.log(`Create New Game With User: ${username} and Word: ${game.word}`);

        res.send(webPage.gamePage(username, game, 'Make Your Guess From the Word List'));
        return;
    }

    res.redirect('/');
});

// guess
app.post('/guess', (req,res) => {
    const sid = req.cookies.sid;

    if(sid && users.isValidSID(sid)){
        const username = users.sessions[sid].username;
        const guess = req.body.guess.trim().toLowerCase();
        const game = users.savedGame[username];
        
        let {finishFlag, message, userState} = gameHelper.takeTurn(guess, game);

        users.userState[username] = userState;

        if(finishFlag){
            message += ` Press New Game to Start a New Game.`;
        }

        res.send(webPage.gamePage(username, game, message));
        return;
    }

    res.redirect('/');
});

app.listen(PORT);
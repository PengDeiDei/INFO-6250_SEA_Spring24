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

        if(!users.savedGame[username]){
            users.savedGame[username] = gameHelper.setGame();
        }

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
        
        let {finishFlag, message} = gameHelper.takeTurn(guess, game);

        if(finishFlag){
            message += ` Press New Game to Start a New Game.`;
        }

        res.send(webPage.gamePage(username, game, message));
        return;
    }

    res.redirect('/');
});

app.listen(PORT);
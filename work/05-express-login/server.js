const express = require('express');
const uuidv4 = require('uuid').v4;
const cookieParser = require('cookie-parser');
const dataWeb = require('./data-web');
const data = require('./data');
const PORT = 3000;

const app = express();

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.urlencoded({extended: false}));

// homepage
app.get('/', (req, res) => {
    const sid = req.cookies.sid;
    
    if(sid && data.isValidSID(sid)){
        const username = data.sessions[sid].username;
        if(!data.words[username]){
            data.words[username] = '';
        }

        res.send(dataWeb.dataPage(username,data.words[username]));
        return;
    }

    res.send(dataWeb.loginPage());
});

// login
app.post('/login', (req, res) => {
    const username = req.body.username.trim();
    const {errorStatus, errorMsg} = data.isValidUsername(username);

    if(errorStatus){
        res.status(errorStatus).send(dataWeb.errorPage({errorStatus, errorMsg}));
        return;
    }

    const sid = uuidv4();
    data.sessions[sid] = {username};
    res.cookie('sid',sid);
    res.redirect('/');
});

// update
app.post('/update', (req, res) => {
    const sid = req.cookies.sid;
    const word = req.body.word.trim();
    
    if(sid && data.isValidSID(sid)){
        const username = data.sessions[sid].username;

        data.words[username] = word;
        res.redirect('/'); 
    }
    res.send(dataWeb.loginPage());
});

// logout
app.post('/logout',(req,res) => {
    const sid = req.cookies.sid;
    delete data.sessions[sid];
    res.clearCookie('sid');
    res.redirect('/');
});

app.listen(PORT);
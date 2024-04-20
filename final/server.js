const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const sessions = require('./sessions');
const users = require('./users');

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json()); 

// Sessions
// Check for existing session (used on page load)
app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    res.json({ username });
  });
  
  // Create a new session (login)
  app.post('/api/session', (req, res) => {
    const { username } = req.body;
    
    if(!users.isValidUsername(username)) {
      res.status(400).json({ error: 'required-username' });
      return;
    }
  
    if(username === 'dog') {
      res.status(403).json({ error: 'auth-insufficient' });
      return;
    }
  
    const sid = sessions.addSession(username);
  
    res.cookie('sid', sid);
    // If they don't have a word, we default one
    users.wordFor[username] ||= "";
  
    res.json({ username });
  });
  
  app.delete('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
  
    if(sid) {
      res.clearCookie('sid');
    }
  
    if(username) {
      // Delete the session
      sessions.deleteSession(sid);
    }
  
    res.json({ wasLoggedIn: !!username }); 
  });
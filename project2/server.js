const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const sessions = require('./sessions');
const users = require('./users');
const chat = require('./chat');

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

  res.json({ username });
});

// Delete the current session (logout)
app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(sid) {
    res.clearCookie('sid');
  }

  if(username) {
    sessions.deleteSession(sid);
  }

  res.json({ wasLoggedIn: !!username });
});

// Messages
// get messages
app.get('/api/message', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const storedMessages = chat.getMessages();
  
  res.json({ username, storedMessages });
});

app.post('/api/message', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { message } = req.body;

  if(!message && message !== '') {
    res.status(400).json({ error: 'required-word' });
    return;
  }

  chat.addMessage(username, message);

  res.json({ username, storedMessages: message });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));


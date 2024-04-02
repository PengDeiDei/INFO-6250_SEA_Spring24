import { useState } from 'react';
import './App.css';
import Login from './Login';
import Message from './Message';
import Game from './Game';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  function onLogin(username){
    setUsername(username);
    setIsLoggedIn(true);
  }

  function onLogout() {
    setIsLoggedIn(false);
    setMessage('');
  }

  function onMessage(message){
    setMessage(message);
  }

  return (
    <div className='app'>
      { isLoggedIn 
      ? <div className='game__page'>
          <Game
            username={username}
            onMessage={onMessage}
            onLogout={onLogout}
          />
          <Message message={message}/>
        </div>
      : <div className='login__page'>
          <Login 
            onLogin={onLogin}
            onMessage={onMessage}
          />
          <Message message={message}/>
        </div>
      }
    </div>
  )
}

export default App

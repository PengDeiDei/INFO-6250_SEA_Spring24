import { useState, useEffect } from 'react';
import './App.css';

import {
  LOGIN_STATUS,
  CLIENT,
  SERVER,
} from './js/constants';
import {
  fetchLogin,
  fetchLogout,
  fetchSession,
  fetchWord,
  fetchNewWord,
} from './js/services';

import Status from './components/Status';
import LoginForm from './components/LoginForm';
import Controls from './components/Controls';
import UpdateWordForm from './components/UpdateWordForm';

function App() {
  const [ error, setError ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ loginStatus, setLoginStatus ] = useState(LOGIN_STATUS.PENDING);
  const [ word, setWord ] = useState('');
  const [ isWordPending, setIsWordPending ] = useState(false);

  function onLogin(username){
    setIsWordPending(true);
    fetchLogin(username)
    .then(() => {
      setError('');
      setUsername(username);
      setIsWordPending(false);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
      return fetchWord();
    })
    .catch( err => {
      return Promise.reject(err);
    })
    .then( response => {
      setWord(response.storedWord);
    })
    .catch( err => {
      setError(err?.error || 'ERROR');
    })
  }

  function onLogout(){
    setError('');
    setUsername('');
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    setWord('');
    fetchLogout()
    .catch( err => {
      setError(err?.error || 'ERROR');
    })
  }

  function onRefresh(){
    setError('');
    setIsWordPending(true);
    fetchWord()
    .then( response => {
      setWord(response.storedWord);
      setIsWordPending(false);
    })
    .catch( err => {
      setError(err?.error || 'ERROR');
    })
  }

  function onUpdateWord(word){
    setError('');
    setIsWordPending(true);
    fetchNewWord(word)
    .then( () => {
      setWord(word);
      setIsWordPending(false);
    })
    .catch( err => {
      setError(err?.error || 'ERROR');
    });
  }

  function checkForSession(){
    fetchSession()
    .then( session => {
      setUsername(session.username);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
      return fetchWord();
    })
    .catch( err => {
      if(err?.error === SERVER.AUTH_MISSING){
        return Promise.reject({error: CLIENT.NO_SESSION});
      }
      return Promise.reject(err);
    })
    .then( response => {
      setWord(response.storedWord);
    })
    .catch( err => {
      if(err?.error === CLIENT.NO_SESSION){
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        return;
      }
      setError(err?.error || 'ERROR');
    })
  }

  useEffect( () => {checkForSession();}, [] );

  return (
    <main>
      { error && <Status error={error}/>}
      { loginStatus === LOGIN_STATUS.PENDING && <div className="login__pending">Loading user...</div>}
      { loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm onLogin={onLogin}/>}
      { loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
        <div className='content'>
          <h1>Hello, {username} </h1>
          <Controls onLogout={onLogout} onRefresh={onRefresh}/>
          <div className="word">
            { isWordPending ? 
              <div className="word__pending">Loading user's word...</div> : 
              <div className="word__display">
                <span>Your word is: {word}</span>     
              </div>
            }
          </div>
          <UpdateWordForm onUpdateWord={onUpdateWord}/>
        </div>
      )}
    </main>
  );
}
export default App;
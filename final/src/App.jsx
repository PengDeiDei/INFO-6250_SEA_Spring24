import { useReducer, useEffect } from 'react';
import './App.css';
import reducer, { initialState } from './js/reducer';

import { 
  LOGIN_STATUS, 
  CLIENT, 
  SERVER,
  ACTIONS
} from './js/constants';
import {
  fetchLogin,
  fetchLogout,
  fetchSession,
} from './js/services';
import Status from './components/Status';
import Loading from './components/Loading';


function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className='app'>
      <main>
        { state.error && <Status error={ state.error }/> }
        { state.loginStatus == LOGIN_STATUS.PENDING && 
          <Loading className='login__waiting'> Loading user... </Loading> }
        { state.loginStatus == LOGIN_STATUS.NOT_LOGGED_IN }
        { state.loginStatus == LOGIN_STATUS.IS_LOGGED_IN  &&
          <div className='content'>
            <p>content</p>
          </div> 
        }
      </main>
    </div>
  )
}

export default App

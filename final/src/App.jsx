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
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchTransactions,
  fetchAddTransaction,
  fetchDeleteTransaction,
} from './js/services';

import LoginForm from './components/LoginForm';
import Controls from './components/Controls';
import Transactions from './components/Transactions';
import Status from './components/Status';
import Loading from './components/Loading';
import AddTransactionForm from './components/AddTransactionForm';


function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function onLogin( username ) {
    dispatch({ type: ACTIONS.START_LOADING_TRANSACTIONS });
    fetchLogin(username)
    .then( fetchTransactions => {
      dispatch({ type: ACTIONS.LOG_IN, username});
      dispatch({ type: ACTIONS.REPLACE_TRANSACTIONS, 
        transactions: fetchTransactions});
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
    });
  }

  function onLogout() {
    dispatch({ type: ACTIONS.LOG_OUT });
    fetchLogout() // We don't really care about server results
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function onRefresh() {
    dispatch({ type: ACTIONS.START_LOADING_TRANSACTIONS });
    fetchTransactions()
    .then( transactions => {
      dispatch({ type: ACTIONS.REPLACE_TRANSACTIONS, transactions });
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function onDeleteTransaction(id) {
    dispatch({ type: ACTIONS.START_LOADING_TRANSACTIONS });
    fetchDeleteTransaction(id)
      .then( () => {
        return fetchTransactions(); // Return the promise so we can chain
      })
      .then( transactions => {
        dispatch({ type: ACTIONS.REPLACE_TRANSACTIONS, transactions });
      })
      .catch( err => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
      });
  }

  function onAddTransaction({ category, amount }) {
    fetchAddTransaction({ category, amount })
    .then( transaction => {
      dispatch({ type: ACTIONS.ADD_TRANSACTION, transaction});
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function checkForSession() {
    fetchSession()
    .then( session => { // The returned object from the service call
      dispatch({ type: ACTIONS.LOG_IN, username: session.username });
      return fetchTransactions(); // By returning this promise we can chain the original promise
    })
    .catch( err => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION }) // Expected, not a problem
      }
      return Promise.reject(err); // Pass any other error unchanged
    })
    .then( transactions => {
      dispatch({ type: ACTIONS.REPLACE_TRANSACTIONS, transactions});
    })
    .catch( err => {
      if( err?.error === CLIENT.NO_SESSION ) { // expected "error"
        dispatch({ type: ACTIONS.LOG_OUT });
        // Not yet logged in isn't a reported error
        return;
      }
      // For unexpected errors, report them
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  useEffect( () => {
    checkForSession();
  }, []);

  return (
    <div className='app'>
      <main>
        { state.error && <Status error={ state.error }/> }
        { state.loginStatus == LOGIN_STATUS.PENDING && 
          <Loading className='login__waiting'> Loading user... </Loading> }
        { state.loginStatus == LOGIN_STATUS.NOT_LOGGED_IN && 
          <LoginForm onLogin={onLogin}/> }
        { state.loginStatus == LOGIN_STATUS.IS_LOGGED_IN  &&
          <div className='content'>
            <p>Hello, {state.username} </p>
            <Controls onLogout={onLogout} onRefresh={onRefresh}/>
            <Transactions
              isTransactionPending={state.isTransactionPending}
              transactions={state.transactions}
              lastAddedTransactionId={state.lastAddedTransactionId}
              onDeleteTransaction={onDeleteTransaction}
            />
            <AddTransactionForm onAddTransaction={onAddTransaction}/>
          </div> 
        }
      </main>
    </div>
  )
}

export default App

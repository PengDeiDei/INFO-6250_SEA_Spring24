import state, {err_msg} from './states';
import render, {renderMsg} from './render';
import {fetchLogin, fetchLogout, fetchSession, fetchMessage, fetchNewMessage} from './services';

const rootEl = document.querySelector('#root');

function getSession(){
    fetchSession()
    .then( response => {
        const {username} = response;

        if( username ){
            displayWord();
        }

        render(state, rootEl);
    }) 
    .catch( err => {
        state.error = err_msg[err.error];

        if(err.error == 'auth-missing' && !state.username){
            state.error = ``;
        }
        
        render(state, rootEl);
        return;
    });
}

function logout() {
    rootEl.addEventListener( 'click', e => {
        if(e.target.classList.contains( 'logout__btn' )){
           fetchLogout()
            .then( () => {
                // set states to logged out
                state.username = '';
                state.messages = [];
                state.sessions = {};
                state.error = '';
                state.isLoggedIn = false;
                state.isLoadingLogin = false;
                state.isLoadingMsg = false;

                render(state, rootEl);
            })
            .catch( err => {
                state.error = err_msg[err.error];
                render(state, rootEl);
                return;
            });
        }
    })
}

function login(){
    rootEl.addEventListener( 'click', e => {
        if(e.target.classList.contains( 'login__btn' )){
            const username = document.querySelector('#username').value;
            
            // set state to waiting to log in
            state.isLoadingLogin = true;
            state.error = '';
            render(state, rootEl);

            fetchLogin(username)
            .then( () => {
                // set states to logged in
                state.isLoggedIn = true;
                state.isLoadingLogin = false;
                displayMessage();
            })
            .catch( err => {
                // set states to not logged in
                state.isLoadingLogin = false;
                state.error = err_msg[err.error];
                render(state, rootEl);
                return;
            });
        }
    })
}

function setNewMessage(){
    rootEl.addEventListener( 'submit', e => {
        e.preventDefault();
        if(e.target.classList.contains( 'update__form' )){
           const newMessage = document.querySelector('#message').value;
           
           fetchNewMessage(newMessage)
           .then(() => {
                displayMessage();
           })
           .catch( err => {
                state.error = err_msg[err.error];
                render(state, rootEl);
                return;
            })
        }
    })
}

function displayMessage(){
    // set state to waiting to load message
    state.isLoadingMsg = true;
    state.error = '';
    render(state, rootEl);
    fetchMessage()
    .then( response => {
        const {username, storedMessages, storedSessions} = response;
        state.username = username;
        state.messages = storedMessages;
        state.sessions = storedSessions;
        state.isLoadingMsg = false;
        state.error = '';
        render(state, rootEl);
    })
    .catch( err => {
        state.isLoadingMsg = false;
        state.error = err_msg[err.error];
        render(state, rootEl);
        return;
    })
}

function refreshMessages(){
    if(state.isLoggedIn){

        fetchMessage()
        .then( response => {
            const {username, storedMessages, storedSessions} = response;
                state.username = username;
                state.messages = storedMessages;
                state.sessions = storedSessions;
                state.isLoadingMsg = false;
                state.error = '';
                renderMsg(state, rootEl);
        })
        .catch( err => {
            state.isLoadingMsg = false;
            state.error = err_msg[err.error];
            render(state, rootEl);
            return;
        })

    }
}

function pollMessages(){
    refreshMessages();
    setTimeout(pollMessages, 5000);
}

getSession();
login();
logout();
setNewMessage();
pollMessages();
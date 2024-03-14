import state, {err_msg} from './states';
import render from './renders';
import {fetchLogin, fetchLogout, fetchSession, fetchWord, fetchNewWord} from './services';

const rootEl = document.querySelector('#root');
const errorEl = document.querySelector('#error');

function login(){
    rootEl.addEventListener( 'click', e => {
        if(e.target.classList.contains( 'login__btn' )){
            const username = document.querySelector('#username').value;
            
            fetchLogin(username)
            .then( () => {
                displayWord();
            })
            .catch( err => {
                errorEl.innerHTML = `<p>${err_msg[err.error]}</p>`;
                return;
            });
        }
    })
}

function logout(){
    rootEl.addEventListener( 'click', e => {
        if(e.target.classList.contains( 'logout__btn' )){
           fetchLogout()
            .then( () => {
                state.username = '';
                state.word = '';
                errorEl.innerHTML = '';
                render(state, rootEl);
            })
            .catch( err => {
                errorEl.innerHTML = `<p>${err_msg[err.error]}</p>`;
                return;
            });
        }
    })
}

function displayWord(){
    fetchWord()
    .then( response => {
        const {username, storedWord} = response;
        state.username = username;
        state.word = storedWord;
        errorEl.innerHTML = '';
        render(state, rootEl);
    })
    .catch( err => {
        errorEl.innerHTML = `<p>${err_msg[err.error]}</p>`;
        return;
    })
}

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
        errorEl.innerHTML = `<p>${err_msg[err.error]}</p>`;

        if(err.error == 'auth-missing' && !state.username){
            errorEl.innerHTML = ``;
        }
        
        render(state, rootEl);
    });
}

function setNewWord(){
    rootEl.addEventListener( 'click', e => {
        if(e.target.classList.contains( 'update__btn' )){
           const newWord = document.querySelector('#word').value;
           
           fetchNewWord(newWord)
           .then(() => {
                displayWord();
           })
           .catch( err => {
                errorEl.innerHTML = `<p>${err_msg[err.error]}</p>`;
                return;
            })
        }
    })
}

getSession();

login();
logout();
setNewWord();
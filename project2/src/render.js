function render(state, rootEl){
    rootEl.innerHTML = `
    ${errorHtml(state)}
    ${loginHtml(state)}
    ${contentHtml(state)}
    `;
}

function errorHtml(state) {
    return state.error? 
    `<div class="error">
        <p class="error__message">${state.error}</p>
    </div>` : '';
}

function loginHtml(state) {
    if(state.isLoggedIn){
        return ``;
    }

    if(state.isLoadingLogin){
        return `
        <div class="login">
            <label class="login__lbl">
                <span> Loading user's information... </span>
            </label>
        </div>
        `;
    }

    return `
        <div class="login">
            <label class="login__lbl">
                <span> Username: </span>
                <input id="username" type="text" placeholder="Enter Your Username"/>
            </label>
            <button class="login__btn"> Login </button>
        </div>
    `;
}

function contentHtml(state) {
    if(!state.isLoggedIn){
        return ``;
    }

    if(state.isLoadingMsg){
        return `
        <div class="content">
         <h2> Welcome, ${state.username}</h2>
            <div class="data__display">
                <div class="messages__container">
                    <h3> Message Board</h3>  
                    <span> Loading message... </span>
                </div>
                <div class="users__container">
                    <h3> Users Onlined </h3>
                    <span> Loading onlined users...</span>
                </div>
            </div>
            <div class="content__update">
                <span> New Message: </span>
                <input id="message" type="text"/>
                <button class="update__btn"> Submit </button>
            </div>
            <div class="content__logout">
                <button class="logout__btn"> Logout </button>
            </div>
        </div>
        `;
    }

    return `
    <div class="content">
        <h2> Welcome, ${state.username}.</h2>
        <div class="content__display">
            <div class="messages__container">
                <h3> Message Board</h3> 
                ${getMessageList(state)}
            </div>
            <div class="users__container">
                <h3> Users Onlined </h3>
                ${getUserList(state)}
            </div>
        </div>
        <div class="content__update">
            <form class="update__form">
                <span> New Message: </span>
                <input id="message" type="text"/>
                <button type="submit" class="update__btn"> Submit </button>
            </form>
        </div>
        <div class="content__logout">
            <button class="logout__btn"> Logout </button>
        </div>
    </div>
    `;
}

function getMessageList(state) {
    return `<ol class="messages__list">` +
    Object.values(state.messages).map( message => `
      <li class="message__item">
        <div class="message__container">
            <span class="message__username">${message.sender}</span>
            <span class="message__text">${message.text}</span>
        </div>
      </li>
    `).join('') +
      `</ol>`;
  }

function getUserList(state){
    let uniqueUsername = {};
    Object.values(state.sessions).map( session => {
        const username = session.username;
        uniqueUsername[username] = uniqueUsername[username]+1||1;
    })

    return`<ol class="users__list">` +
    Object.keys(uniqueUsername).map( username => `
      <li class="user__item">
            <span class="user__username">${username}</span>
      </li>
    `).join('') +
      `</ol>`;
}

export function renderMsg(state, rootEl){
    const messageEl = rootEl.querySelector('.messages__container');
    const userEl = rootEl.querySelector('.users__container');

    messageEl.innerHTML = `<h3> Message Board</h3> ${getMessageList(state)}`;
    userEl.innerHTML = ` <h3> Users Onlined </h3> ${getUserList(state)}`;
}

export default render;
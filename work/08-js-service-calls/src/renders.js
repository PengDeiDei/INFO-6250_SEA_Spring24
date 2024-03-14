function renders(state, rootEl){
    if(!state.username && !state.word){
        rootEl.innerHTML = `
            <div class="login__page">
                <label class="login__lbl">
                    <span> Username: </span>
                    <input id="username" type="text" placeholder="Enter Your Username"/>
                </label>
                <button class="login__btn"> Login </button>
            </div>
        `;
    } else{
        rootEl.innerHTML = `
            <div class="data__page">
                <div class="data__display"> 
                    <span> Welcome, ${state.username}! </span>
                    <span> Your word is: ${state.word} </span>
                </div>
                <div class="data__update">
                    <span> New Word: </span>
                    <input id="word" type="text"/>
                    <button class="update__btn"> Submit </button>
                </div>
                <div class="data__logout">
                    <button class="logout__btn"> Logout </button>
                </div>
            </div>
        `;
    }
}

export default renders;
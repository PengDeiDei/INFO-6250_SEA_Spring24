import { useState } from "react";

function Login({ onLogin, onMessage }){
    const [username, setUsername] = useState('');

    function login( username ){
        username = username.trim();
        if(!username || !username.match(/^[A-Za-z0-9_]+$/)){
            onMessage("Invalid username, please check again.");
            return;
        }
        
        if(username.toLowerCase() === 'dog'){
            onMessage("Username can't be dog.");
            return;
        }
        
        onLogin(username);
        onMessage("");
    }

    return(
        <form className="login__form">
            <label className="login__lbl">
                <span> Username: </span>
                <input
                    value={username}
                    onInput={ e => setUsername(e.target.value)}
                />
            </label>
            <button
                className="login__btn"
                type='button'
                onClick={() => login(username)}
            > 
                Login 
            </button>
        </form>
    );
}

export default Login;
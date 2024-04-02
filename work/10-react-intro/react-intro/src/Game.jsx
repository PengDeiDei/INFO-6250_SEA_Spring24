import { useState } from "react";
import compare from "./compare";

function Game({username, onMessage, onLogout}){
    const [word, setWord] = useState('');
    function checkWord(word){
        if(word.length !==  5){
            onMessage(`${word} was not a valid word`);
            setWord(``);
            return;
        }

        const secretWord = "RECAT";
        const match = compare(word);
        
        if(word.toUpperCase() !== secretWord){
            onMessage(`${word} had ${match} letters in common`);
            setWord(``);
            return;
        }

        onMessage(`${word} is the secret word!`);
        setWord('');
    }

    return(
        <>
            <div className="user__section"> 
                <h2> Hello, {username}! </h2>
                <button 
                    className="logout__btn" 
                    onClick={onLogout}
                > 
                    Logout 
                </button>
            </div>
            <div className="game__section">
                <form className="game__form">
                    <label className="game__lbl">
                        <span> Enter your guess: </span>
                        <input 
                            value={word}
                            onInput={e => {setWord(e.target.value)}}
                        />
                    </label>
                    <button 
                        className="submit__btn"
                        type="button"
                        onClick={() =>{checkWord(word)}}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}

export default Game;
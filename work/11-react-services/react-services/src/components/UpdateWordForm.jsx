import { useState } from "react";

function UpdateWordForm( {onUpdateWord} ) {
    const [newWord, setNewWord] = useState('');

    function onSubmit(e) {
        e.preventDefault();
        setNewWord('');
        onUpdateWord(newWord);
    }

    function onTyping(e){
        setNewWord(e.target.value);
    }

    return (
        <form className="update__form" action="#/update" onSubmit={onSubmit}>
            <label>
                <span>Enter new word: </span>
                <input className="update__newWord" value={newWord} onChange={onTyping}/>
            </label>
            <button type="submit" className="update__button">Update</button>
        </form>
    );
}

export default UpdateWordForm;
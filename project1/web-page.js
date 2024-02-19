const webPage = {
    loginPage: function(){
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width">
            <link rel="stylesheet" href="css/styles.css">
            <link rel="stylesheet" href="css/login-page.css">
            <title>Login Page</title>
        </head>
        <body>
            <header>
                <img class="header__logo" src="//placekitten.com/100/100" alt="cat of logo"/>
                <h1 class="header__title">Can You Guess My Word?</h1>
            </header>
            <main>
                <div class="login__page">
                    <form class="login__form" action="/login" method="POST">
                        <label class="form__lbl login__lbl">
                        <span> Username: </span>
                        <input name="username" type="text" placeholder="Enter Your Username"/>
                        </label>
                        <button class="form__btn login__btn" type="submit"> Login </button>
                    </form>
                </div>
            </main>
            <footer>
                <a href="/">Privacy Policy</a>
            </footer>
        </body>
        </html>
        `;
    },

    errorPage: function(errorStatus, errorMsg){
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width">
            <link rel="stylesheet" href="css/styles.css">
            <link rel="stylesheet" href="css/error-page.css">
            <title>Error Page</title>
        </head>
        <body>
            <header>
                <img class="header__logo" src="//placekitten.com/100/100" alt="cat of logo"/>
                <h1 class="header__title">Opps, we meet an error!</h1>
            </header>
            <main>
                <div class="error__page">
                    <h2 class="error__status">Error ${errorStatus}: ${errorMsg}</h2>
                    <p><a href="/"> Click to Homepage </a></p>
                </div>
            </main>
            <footer>
                <a href="/">Privacy Policy</a>
            </footer>
        </body>
        </html>
        `;
    },

    gamePage: function(username, game, message) {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width">
            <link rel="stylesheet" href="css/styles.css">
            <link rel="stylesheet" href="css/game-page.css">
            <title>Game Page</title>
        </head>
        <body>
            <header>
                <img class="header__logo" src="//placekitten.com/100/100" alt="cat of logo"/>
                <h1 class="header__title">Let's play, ${username}!</h1>
            </header>
            <main>
            <div class="game-page">
                <div class="display__container">
                    <p class="display__msg">Make Guess From The List of Words Below</p>
                    <ul class="words__list">
                        ${webPage.getWordList(game)}
                    </ul>
                </div>
                <div class="guessedWords__container">
                    <p class="guessedWords__mgs">List of Guessed Words</p>
                    <p class="guessedWords__note">Record as {Guessed Word, Matched Letters, Unique Common Letters}</p>
                    <ul class="guessedWords__list">
                        ${webPage.getGuessedList(game)}
                    </ul>
                    <p class="guessedWords__mgs">You have made ${game.turns} turns of guessing.</p>
                </div>
                <div class="message__container">
                    <img class="avatar message__avatar" alt="avatar of amit" src="images/avatar-amit.jpg"/>
                    ${webPage.getGameMessage(message)}
                </div>
                <div class="guess__container">
                    <form class="guess__form" action="/guess" method="POST">
                        <label class="form__lbl guess__lbl">
                            <span> Enter your guess: </span>
                            <input name="guess" type="text"/>
                        </label>
                        <button class="form__btn game__btn" type="submit"> Guess </button>
                    </form>
                    <img class="avatar guess__avatar" alt="avatar of user" src="images/avatar-user.jpg"/>
                </div>
                <div class="new-game__container">
                    <form class="new-game__form" action="/new-game" method="POST">
                        <button class="form__btn new-game__btn" type="submit">New Game</button>
                    </form>
                </div>
                <div class="logout__container">
                    <form class="logout__form" action="/logout" method="POST">
                        <button class="form__btn logout__btn" type="submit"> Logout </button>
                    </form>
                </div>
            </div>
            </main>
            <footer>
                <a href="/">Privacy Policy</a>
            </footer>
        </body>
        </html>
        `;
    },

    getWordList: function(game){
        return game.wordList.map( word => `
               <li class="list__item">
                <span>${word}</span>
            </li>`
        ).join('');
    },

    getGameMessage: function(messages){
        return `
        <p class="game__message">
            ${messages}
        </p>
        `;
    },

    getGuessedList: function(game){
        return game.guesses.map( item => `
            <li class="list__item">
                <span>{${item.guess}, ${item.matches}, [${item.commons}]}</span>
            </li>
        `).join('');
    }
};

module.exports = webPage;
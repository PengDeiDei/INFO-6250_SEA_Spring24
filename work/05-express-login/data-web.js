const dataWeb ={
    loginPage: function(){
        return `
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width">
            <link rel="stylesheet" href="css/styles.css">
            <title>login-page</title>
        </head>
        <body>
            <div class="login__page">
                <form class="login__form" action="/login" method="POST">
                    <label class="form__lbl login__lbl">
                        <span> Username: </span>
                        <input name="username" type="text" placeholder="Enter Your Username"/>
                    </label>
                    <button class="form__btn login__btn" type="submit"> Login </button>
                </form>
            </div>
        </body>
        </html>
        `;
    },

    dataPage: function(username,word){
        return `
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width">
            <link rel="stylesheet" href="css/styles.css">
            <title>data-page</title>
        </head>
        <body>
            <div class="data__page">
                <div class="data__display">
                    <span> Welcome, ${username}! </span>
                    <span> Your word is: ${word} </span>
                </div>
                <form class="update__form" action="/update" method="POST">
                    <label class="form__lbl update__lbl">
                        <span>New Word: </span>
                        <input name="word" type="text"/>
                    </label>
                    <button class="form__btn update__btn" type="submit"> Submit </button>
                </form>
                <form class="logout__form" action="/logout" method="POST">
                    <button class="form__btn logout__btn" type="submit"> Logout </button>
                </form>
            </div>
        </body>
        </html>
        `;
    },

    errorPage: function({errorStatus, errorMsg}){
        return`
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width">
            <link rel="stylesheet" href="css/styles.css">
            <title>error-page</title>
        </head>
        <body>
            <div class="error__page">
                <h1 class="error__status">Error: ${errorStatus}</h1>
                <p>${errorMsg}</p>
                <a href="/">Click to homepage</a>
            </div>
        </body>
        </html>
        `; 
    }
};

module.exports = dataWeb;
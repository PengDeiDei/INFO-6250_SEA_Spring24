const { type } = require("os");

const sessions = {};
const words = {};

const isValidUsername = function(username){
    const clean = username.replace(/[^A-Za-z0-9_]+/g, '');
    let errorStatus = 0;
    let errorMsg = '';

    if(!username){
        errorStatus = 400;
        errorMsg = 'Username is Empty';
    }
    
    if(clean != username){
        errorStatus = 400;
        errorMsg = 'Username Contains Invalid Characters';
    }
    
    if(clean == 'dog'){
        errorStatus = 403;
        errorMsg = 'Username Cannot be Dog';
    }

    return {errorStatus,errorMsg};
};

const isValidSID = function(sid){
    return sessions[sid];
};

const data = {
    sessions,
    words,
    isValidUsername,
    isValidSID
};

module.exports = data;
const messages = [];

function getMessages(){
    return messages;
}

function addMessage(sender, text) { 
    messages.push({ sender: sender, text: text });
}

module.exports = {
    getMessages,
    addMessage,
};
  
var MessageController = {}
MessageController.HandleMessage = function(message){
    if(message.content === 'ping')
    {
        message.reply('pong');
    }
}
module.exports = MessageController;
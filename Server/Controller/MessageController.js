var MessageController = {}
MessageController.HandleMessage = function(message){
    if(message.content === 'ping')
    {
        message.reply('pong');
    }else if(message.content === '.me')
    {
        message.reply(message.author.id)
    }
    
}
module.exports = MessageController;
var DB = require('./DatabaseController');
var MessageController = {}
MessageController.HandleMessage = function(message){
    if(message.content === 'ping')
    {
        message.reply('pong');
    }else if(message.content === '.me')
    {
        message.reply(message.author.id)
        var c = DB.TESTcheckIfUserExists(message.author.id);
        if(c)
        {
            message.channel.send(c);
        }else {
            message.channel.send("I didn't find user in DB");
        }
    }
    
}
module.exports = MessageController;
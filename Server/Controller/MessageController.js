// https://discord.js.org/#/
var DB = require('./DatabaseController');
var MessageController = {}
MessageController.HandleMessage = function (message) {
    if (message.content === 'ping') {
        message.reply('pong');
    } else if (message.content === '.me') {
        DB.TESTcheckIfUserExists(message.author.id, function (c) {
            //console.log(message.author.username);
            if(c){
                message.reply("I Found You in Gamers DB " + message.author.username);
            }

        });


    }

}
module.exports = MessageController;
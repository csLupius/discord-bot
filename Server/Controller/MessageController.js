// https://discord.js.org/#/
var DB = require('./DatabaseController');
var MessageController = {}
MessageController.HandleMessage = function (message) {
    if (message.content === 'ping') {
        message.reply('pong');
    } else if (message.content === '.me') {
        message.reply(message.author.id)
        DB.TESTcheckIfUserExists(message.author.id, function (c) {
            console.log("VVVVVVVVVVVVV");
            console.log(c);
           // message.channel.send(c);
           console.log(c.discord_snowflake);
           console.log(message.client.users);
        });


    }

}
module.exports = MessageController;
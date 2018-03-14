// https://discord.js.org/#/
var DB = require('./DatabaseController');
var MessageController = {}
MessageController.HandleMessage = function (message) {
    if (message.content === 'ping') {
        message.reply('pong');
    } else if (message.content === '.me') {
        DB.TESTcheckIfUserExists(message.author.id, function (c) {
            message.guild.fetchMember(message.author).then(function (res) {
                if(res.user.id == c.discord_snowflake)
                    message.reply('I found you!');
                else{
                    message.reply('I coulnd\'t found you :/');
                }
            })

        });


    }

}
module.exports = MessageController;
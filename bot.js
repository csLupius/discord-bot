
console.log("//////////////////////////////");
const Discord = require("discord.js");
const client = new Discord.Client();
const MessageController = require('./Server/Controller/MessageController');
var db = require('./Server/Controller/DatabaseController');
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', function (message) {
    MessageController.HandleMessage(message);
});

client.login(process.env.BOT_TOKEN);

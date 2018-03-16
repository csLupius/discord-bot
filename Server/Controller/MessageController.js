// https://discord.js.org/#/
var Discord = require('discord.js');
var DB = require('./DatabaseController');
var MessageController = {
    Bot: {}
}
var _message = '';
MessageController.HandleMessage = function (message) {

    _message = message;
    if (message.author.id == MessageController.Bot.id) {
        return;
    }

    try {

    } catch (e) {
        console.log(e);
    }
    var parsed = commandParserT(message.content);
    // console.log(parsed);
    parsed = commandParserT(message.content);
    //console.log(parsed);
    if (parsed !== 0 && parsed !== -1) {
        console.log("\n-------------------------------\n\n");
        // /////TEST AREA///////////
        // var testString = "vv\ncommand = " +
        //     parsed.command;
        // for(var i = 0 ; i < parsed.args.length; i++){
        //     testString += " \narg[" + i +"] = " + parsed.args[i] ;
        // }
        // message.channel.send("Test Response: " + testString);
        // ////////
        try {
            var a = commandWrapper({
                command: parsed.command,
                args: parsed.args
            });
            if (a == -1) {
                message.reply("It seems your command string has a problem...");
                return;
            }
            var title = a.title;
            console.log("\n-------------------------------\n\n");
            console.log(a.value);
            console.log("\n-------------------------------\n\n");
            var field = '';
            if (a.value instanceof Array) {
                field = a.value.join('\n');
            } else {
                field = a.value;
            }
            message.channel.send({
                embed: {
                    // title: title,
                    color: 25777,
                    fields: [{
                        name: title,
                        value: field
                    }],
                    width: 1500
                }
            })
        } catch (err) {
            message.reply("That thing you said...\n it triggered me.. please don't say it again\n\n\n");
            console.log("\n-------------------------------\n\n");
            console.log(err);
        }
    } else if (parsed === -1) {
        message.reply("It seems your command string has a problem...");
        return;
    } else if (parsed === 0)
        return;
    // if (message.content === 'ping') {
    //     message.reply('pong');
    // } else if (message.content === '.me') {
    //     DB.TESTcheckIfUserExists(message.author.id, function (c) {
    //         //console.log(message.author.username);
    //         if (c) {
    //             message.reply("I Found You in Gamers DB " + message.author.username);
    //         }
    //     });
    // }
}

function commandWrapper(
    cmd = {
        command: '',
        args: []
    }) {

    //console.log("command wrapper :" + cmd.command);
    if (cmd.command == '') return -1;
    var arg = cmd.args;
    switch (cmd.command) {
        case ".help":
            return {
                title: "I will answer to these:",
                value: [
                    "```.help```",
                    "```.games```",
                    "```.gamers \"game name\"```",
                    "```.addgame \"game name\" [opt]\"game description\"```",
                    "```.editgame \"game name\" \"game description\"```",
                    "```.removegame \"game name\"```",
                    "```.iplay \"gamename\"```",
                    "```.idontplay \"gamename\"```",
                    "```.gamemoderator \"rolename\"```"
                ]
            };
        case ".games":
            return {
                title: "Games",
                value: DB.getAllGames()
            }
        case ".gamers":
            if (!arg[0])
                return -1;
            return {
                title: "players of " + args[0],
                value: DB.getPlayersof(args[0])
            }
        case ".addgame":
            if (!arg[0]) {
                console.log("arg yok");
                return -1;
            }
            if (DB.addGame(_message.author.id, arg[0], (arg[1] ? arg[1] : '')) != -1) {
                console.log("DB.addgame positive")
                return {
                    title: "Game added",
                    value: arg[0] + (arg[1] ? " : " + arg[1] : "")
                }
            } else {
                console.log("DB.addgame negative")
                console.log("arg1 = " + arg[1]);
                console.log(arg[0] + (arg[1] ? " : " + arg[1] : ""));
                return {
                    title: "Game add failed",
                    value: arg[0] + (arg[1] ? " : " + arg[1] : "")
                }
            }
        case ".editgame":
            if (!arg[0] || !arg[1])
                return -1;
            if (DB.editGame(_message.author.id, arg[0], arg[1]) != -1) {
                return {
                    title: "Game edited",
                    value: arg[0] + " : " + arg[1]
                }
            } else {
                return {
                    title: "Game edit failed",
                    value: [arg[0] + " : " + arg[1]]
                }
            }
        case ".removegame":
            if (!arg[0])
                return -1;
            if (DB.removeGame(_message.author.id, arg[0]) != -1) {
                return {
                    title: "Game Removed",
                    value: arg[0]
                }
            } else {
                return {
                    title: "Game Remove Failed",
                    value: arg[0]
                }
            }
        case ".iplay":
            if (!arg[0])
                return -1;
            if (DB.bindUserToGame(_message.author.id, arg[0]) != -1) {
                return {
                    title: "Bind to Game",
                    value: _message.author.username + " now bound to game " + arg[0]
                }
            } else {
                return {
                    title: "Binding Failed",
                    value: _message.author.username + " couldn't be bound to game " + arg[0]
                }
            }
        case ".idontplay":
            if (!arg[0])
                return -1;
            if (DB.unBindUserFromGame(_message.author.id, arg[0]) != -1) {
                return {
                    title: "Unbind from Game",
                    value: _message.author.username + " has broken chains with " + arg[0]
                }
            } else {
                return {
                    title: "Unbind Failed",
                    value: _message.author.username + " couldn't broke chains from game " + arg[0]
                }
            }
        case ".gamemoderator":
            if (!arg[0]) {
                return -1;
            }
            if (DB.setGameModerator(_message.author.id, arg[0]) != -1) {
                return {
                    title: "Set Game Moderator",
                    value: "Role of " + arg[0] + " can moderate games now"
                }
            } else {
                return {
                    title: "Failure at Setting Game Moderator",
                    value: "Can't add role " + arg[0] + " to moderators."
                }
            }
        default:
            return {
                title: "UNKNOWN COMMAND",
                desc: "UNKNOWN COMMAND",
                value: []
            };
    }
}

//.cmd Arg1 "Argument Number two"

//.command "Arg 1 TEST" "Arg 2 Test Deneme Woooooooooa"
//command : .command
//args [Arg 1 Test, Arg2 Test Deneme Woooooooooa]
function commandParserT(raw = '') {
    var rc = raw;
    if (!rc.startsWith('.')) {
        return 0;
    }
    if (rc == '.') {
        return 0;
    }
    var _args = [];
    var cmd = '';
    if (rc.includes('"')) {
        var cmd = rc.slice(0, rc.indexOf(' ', 0));
        var f = 0,
            l = 0;
        //.test "arg1" "arg2" "arg deneme"
        while (rc.indexOf('"', l + 2) > 0) {
            f = rc.indexOf('"', l) + 1;
            l = rc.indexOf('"', f);
            if (l == -1) {
                // console.log("son tırnak bulunamadı");
                return -1;
            }
            var arg = rc.slice(f, l);
            if (arg === ' ')
                continue;
            // console.log(f);
            // console.log(arg);
            // console.log(l);
            _args.push(arg);
        }
    } else {
        var cmd = rc;
    }
    if (cmd.indexOf("-") > 0 ||
        cmd.indexOf(' ') > 0 ||
        cmd.indexOf('!') > 0 ||
        cmd.indexOf('"') > 0
    ) {
        //console.log("command'ta sorun var");
        return -1;
    }
    return {
        command: cmd,
        args: _args
    }
}
module.exports = MessageController;
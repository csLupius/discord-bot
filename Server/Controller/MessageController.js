// https://discord.js.org/#/
var Discord = require('discord.js');
var DB = require('./DatabaseController');
var MessageController = {
    Bot: {}
}
var _message = '';
MessageController.HandleMessage = function (message) {

    _message = message;
    if (message.author.id !== MessageController.Bot.id) {
        var parsed = commandParserT(message.content);
        if (parsed !== 0 && parsed !== -1) {
            // console.log("\n-------------------------------\n\n");
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
                }, function (a) {
                    //res.title
                    //res.value
                    var title = a.title;
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
                });
                if (a == -1) {
                    message.reply("It seems your command string has a problem...");
                    return;
                }

            } catch (err) {
                message.reply("That thing you said...\n it triggered me.. please don't say it again\n\n\n");
                console.log("\n-------------------------------\n\n");
                console.log(err);
            }
        } else if (parsed === -1) {
            message.reply("It seems your command string has a problem...");
        } else if (parsed === 0) {

        }
    }
}

function commandWrapper(
    cmd = {
        command: '',
        args: []
    }, callback) {
    function _call(_title, _value) {
        var z = {
            title: _title,
            value: _value
        }
        callback(z);
    }
    //console.log("command wrapper :" + cmd.command);
    if (cmd.command == '') return -1;
    var arg = cmd.args;
    switch (cmd.command) {
        case ".help": //DONE
            _call("I will answer to these:", [
                "`.help`",
                "`.games`",
                "`.gamers \"game name\"`",
                "`.addgame \"game name\" [opt]\"game description\"`",
                "`.editgame \"game name\" \"game description\"`",
                "`.removegame \"game name\"`",
                "`.iplay \"gamename\"`",
                "`.idontplay \"gamename\"`",
                "`.gamemoderator \"rolename\"`"
            ]);
        case ".games": //DONE:
            DB.getAllGames(_message.guild.id, function (err, res) {
                if (err) {
                    _call("Failure..", "Couln't get any games..");
                } else {
                    var result = [];
                    for (var i = 0; i < res.rows.length; i++) {
                        result.push("**" + res.rows[i].gameName + "** | ` " + res.rows[i].gameDesc + " `");
                    }
                    if (result.length > 0) {
                        _call("All Games in " + _message.guild.name,
                            result
                        )
                    } else {
                        _call("All Games in " + _message.guild.name,
                            'There are no games yet... \n Use `.addgame` function to add games! \n For more information ask for `.help`'
                        )
                    }
                }
            })
            break;
        case ".gamers":
            if (!arg[0])
                return -1;
            DB.getPlayersof(_message.guild.id, args[0], function (err, res) {
                if (err) {

                }
            });
            break;
        case ".addgame":
            if (!arg[0]) {
                // console.log("arg yok");
                return -1;
            }
            var c = DB.addGame(_message.guild.id, _message.author.id, arg[0], (arg[1] ? arg[1] : ''), function (err, res) {
                if (err) {
                    console.log("FaILED");
                    _call("Add Game Failed", arg[0] + (arg[1] ? " : " + arg[1] : ""))
                } else {
                    console.log("Succes", res.rows[0]);
                    _call("Add Game Success", arg[0] + (arg[1] ? " : " + arg[1] : ""));
                }
            })
            break;
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
//
const {
  Client
} = require("pg");
//console.log(process.env.DATABASE_URL);
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

var e = {
  addGame: function (guildID, userID, gameTag, gameDesc = '', cb) {
    var query = {
      text: 'INSERT INTO "Games" ("gameName", "gameDesc", "guildID") VALUES (\'' + gameTag + '\',\'' + gameDesc + '\',\'' + guildID + '\') returning id;'
    }

    client.query(query, function (err, res) {
      cb(err, res);
    });
  },
  getAllGames: function (guildID, cb) {
    var query = {
      text: 'select * from "Games" g where g."guildID" like \'' + guildID + '\''
    }
    client.query(query, function (err, res) {
      cb(err, res);
    });
  },
  getPlayersof: function (guildID, gametag, cb) {
    var query = {
      text: `SELECT 
    "discord_snowflake"
    FROM 
    public."Games", 
    public."Users", 
    public."GameUserbind"
    WHERE 
    "Games".id = "GameUserbind".gameid AND
    "Users".id = "GameUserbind".userid AND
    "Games"."gameName" Like '${gametag}'`
    }
    client.query(query, function (err, res) {
      cb(err, res);
    });
  }

}
module.exports = (function () {
  client.connect();
  return e;
})();
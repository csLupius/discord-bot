const {
  Client
} = require("pg");
//console.log(process.env.DATABASE_URL);
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

var e = {
  TESTcheckIfUserExists: function (discordID, cb) {
    var _result = false;
    client.connect(); // !
    //console.log();

    var query = { // !
      text: 'SELECT * FROM "Users" where discord_snowflake like \'' + discordID + '\''
    }
    client.query(query).then(function (res) {
      cb(res.rows[0]);
    }).catch(function (er) {
      console.log("HATA HATA");
      console.error(er);
    });
    client.end(); //!
  },
  addGame : function(guildID,userID, gameTag, gameDesc ='', cb){
    var query = {
      text : 'INSERT INTO "Games" ("gameName", "gameDesc", "guildID") VALUES (\''+gameTag+'\',\''+gameDesc+'\',\''+guildID+'\') returning id;'
    }
    client.connect();
    client.query(query,cb);
  },
  getAllGames : function( guildID , cb ){
    var query = {
      text : 'select * from "Games" g where g."guildID" like \'' + guildID + '\''
    }
    console.log(query.text);
    client.connect();
    client.query(query,cb);
  },
  // getPlayersof(guildID, )
  
}
module.exports = e;
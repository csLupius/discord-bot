const { Client } = require("pg");
//console.log(process.env.DATABASE_URL);
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

var e = {
  TESTcheckIfUserExists : function(discordID){
    var _result = false;
    client.connect();
    var query = {
      text : 'select id from public.\"Users\" where discord_snowflake = \'$v\'',
      value : [discordID]
    }
    client.query(query, (err, res) => {
      console.log(query.text);
      if(err){
        console.log(err.stack);
        throw err;
      }else {
        _result = res.rows[0];
      }
    });
    return _result;
  }
}


// (function() {
//   try {
//     client.connect();
//     console.log("clientconnected");
//     try {
//       client.query('insert into Table_name(row_name) values("TEST ROW")');
//       console.log("query completed");
//     } catch (e) {
//       console.log("Query Hatası " + e);
//     }
//     client.end();
//     console.log("client ended");
//     console.log("test complete");
//   } catch (e) {
//     console.log("HATA " + e);
//   }
// })();
module.exports = e;

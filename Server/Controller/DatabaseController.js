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
    var res = client.query('select id from public."Users" where = "$v"',[discordID],function(err, res, fields){
      if(err) throw err;

      console.log("--- Query Fields ------")
      console.log(fields);
      console.log("--- Query Res ------")
      console.log(res);

      _result = res;
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

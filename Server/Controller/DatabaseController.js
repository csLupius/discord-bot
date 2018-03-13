const {
  Client
} = require("pg");
//console.log(process.env.DATABASE_URL);
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

var e = {
  TESTcheckIfUserExists: function (discordID,cb) {
    var _result = false;
    client.connect();
    console.log();
    var query = {
      text: 'SELECT * FROM public."Users"',
      //value : [discordID]
    }
    client.query(query, (err, res) => {
      if (err) {
        console.log(err.stack);
        throw err;
      }
      //console.log(res);
      _result = res.rows[0];
      console.log("------");
      console.log(_result);
      console.log("------")     
      cb(_result); 
    });
    
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
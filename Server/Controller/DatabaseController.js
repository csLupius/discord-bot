const { Client } = require("pg");
console.log(process.env.DATABASE_URL);
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

module.exports = (function() {
  try {
    client.connect();
    console.log("clientconnected");
    try {
      client.query('insert into Table_name(row_name) values("TEST ROW")');
      console.log("query completed");
    } catch (e) {
      console.log("Query Hatası " + e);
    }
    client.end();
    console.log("client ended");
    console.log("test complete");
  } catch (e) {
    console.log("HATA " + e);
  }
})();

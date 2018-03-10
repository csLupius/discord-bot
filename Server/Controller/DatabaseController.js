const { Client } = require('pg');


const client = new Client(
    {
        connectionString: process.env.DATABASE_URL,
        ssl:true
    }
);


module.exports = (function(){
    try{
    client.connect();
    console.log("clientconnected");
    client.query('insert into Table_name(row_name) values("TEST ROW")');
    client.end();
    console.log("client ended");
    console.log("test complete");
    }catch(e){
        console.log("HATA " + e);
    }
})();
var admin = require("firebase-admin");

//var c = require("../key.json");
/*var c = {
  "type": "service_account",
  "project_id": "skullsofrainbow-skullbot",
  "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
  "private_key": process.env.FIREBASE_PRIVATE_KEY,
  "client_email": "firebase-adminsdk-wqfdw@skullsofrainbow-skullbot.iam.gserviceaccount.com",
  "client_id": "105747545999842209605",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-wqfdw%40skullsofrainbow-skullbot.iam.gserviceaccount.com"
}*/
console.log(process.env.FIREBASE_CONFIG);
var config = {
  credential : admin.credential.cert(),
  databaseURL : "https://skullsofrainbow-skullbot.firebaseio.com"
}


//admin.initializeApp(config);


module.exports = {
  TEST: function () {
    admin.database().ref('TEST/' + 22).set({
      test: "TEST COMPLETE"
    });
  }
}
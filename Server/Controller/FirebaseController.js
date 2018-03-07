var admin = require("firebase-admin");
var cs = JSON.parse(process.env.FIREBASE_CONFIG);
var config = {
  credential : admin.credential.cert(cs),
  databaseURL : "https://skullsofrainbow-skullbot.firebaseio.com"
}
admin.initializeApp(config);
var db = admin.database();

var firebase = {
  /*TEST: function () {
    admin.database().ref('TEST/' + admin.database().ref('TEST/').).set({
      test: "TEST COMPLETE"
    });
  }*/
}

module.exports = firebase;
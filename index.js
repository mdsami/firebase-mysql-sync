const firebase = require("firebase-admin");
const mysql = require("mysql");

const syncUsers = require("./lib/sync_users.js");


function firebaseInit() {
  const serviceAccount = require("./firebase.json");

  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://agularfire-44397.firebaseio.com"
  });

  return firebase;
}

function mysqlInit() {
  const credentials = require("./mysql.json");
  const connection = mysql.createConnection(credentials);

  return connection;
}

function main() {
  const firebaseDb = firebaseInit().database();

  const mysqlDb = mysqlInit();
  mysqlDb.connect();
  

  syncUsers.setup(firebaseDb, mysqlDb);


  // mysqlDb.end();
}

main();

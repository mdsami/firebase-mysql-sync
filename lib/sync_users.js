const firebase = require("firebase-admin");
const utility = require("./utility.js");

function deconstructFirebaseUser(id, user, useDefaultValue) {
  const set = utility.enterIfValid;
  const val = (x) => useDefaultValue?x:undefined;

  let dbUser = {};

  dbUser = set(dbUser, "id", id);
  dbUser = set(dbUser, "email", user["email"] || val(""));
  dbUser = set(dbUser, "address", user["address"] || val(""));
  dbUser = set(dbUser, "phone", user["phone"] || val(""));

  const names = utility.deconstructFirebaseName(user["first_name"] || val(""));
  dbUser = set(dbUser, "first_name", names["first_name"] || val(""));
  dbUser = set(dbUser, "last_name", user["last_name"] || val(""));
  dbUser = set(dbUser, "username", user["username"] || val(""));

  return dbUser;
}

function insertUser(mysqlDb, id, user) {
  const dbUser = deconstructFirebaseUser(id, user, true);

  mysqlDb.query("INSERT INTO user SET ?", dbUser, (error, results, fields) => {
    if (error !== null) console.error(error);
  });
}

function updateUser(mysqlDb, id, user) {
  const dbUser = deconstructFirebaseUser(id, user);

  mysqlDb.query("UPDATE user SET ? WHERE user_id = ?", [dbUser, id], (error, results, fields) => {
    if (error !== null) console.error(error);
  });
}

function deleteUser(mysqlDb, id) {
  mysqlDb.query("DELETE FROM user WHERE user_id = ?", id, (error, results, fields) => {
    if (error !== null) console.error(error);
  });
}

function setup(firebaseDb, mysqlDb) {
  // Clear users.
  console.log("Resetting table user...");
  mysqlDb.query("TRUNCATE TABLE user", (error, results, fields) => {
    if (error !== null) console.error(error);
  });

  // Update users with new data.
  console.log("connecting to firebase...");
  const userRef = firebaseDb.ref("user");

  // userRef.once("value", (snapshot) => {
  //   const users = snapshot.val();

  //   Object.keys(users).map((key) => {
  //     const user = users[key];
  //     console.log("inserting user: " + user.name);
  //     insertUser(mysqlDb, key, user);
  //   });

  //   console.log("done");
  // });

  userRef.on("child_added", (snapshot) => {
    const key = snapshot.key;
    const user = snapshot.val();

    console.log("inserting user: " + user.name);
    insertUser(mysqlDb, key, user);
    
    console.log("done");
  });

  userRef.on("child_changed", (snapshot) => {
    const key = snapshot.key;
    const user = snapshot.val();

    console.log("updating user: " + user.name);
    updateUser(mysqlDb, key, user);
    
    console.log("done");
  });

  userRef.on("child_removed", (snapshot) => {
    const key = snapshot.key;

    console.log("deleting user of key: " + key);
    deleteUser(mysqlDb, key);

    console.log("done");
  });
}

exports.setup = setup;
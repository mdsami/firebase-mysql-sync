## MySQL DB Sync with Firebase Realtime DB

### Show some :heart: and star the repo for the project
[![GitHub stars](https://img.shields.io/github/stars/mdsami/firebase-mysql-sync.svg?style=social&label=Star)](https://github.com/mdsami/firebase-mysql-sync) [![GitHub forks](https://img.shields.io/github/stars/mdsami/firebase-mysql-sync.svg?style=social&label=Fork)](https://github.com/mdsami/firebase-mysql-sync/fork) [![GitHub watchers](https://img.shields.io/github/watchers/mdsami/firebase-mysql-sync.svg?style=social&label=Watch)](https://github.com/mdsami/firebase-mysql-sync) [![GitHub followers](https://img.shields.io/github/followers/mdsami.svg?style=social&label=Follow)](https://github.com/mdsami/firebase-mysql-sync)  
[![Twitter Follow](https://img.shields.io/twitter/follow/mdsami5.svg?style=social)](https://twitter.com/mdsami5)

This repository containing Node JS Script to sync  Local Mysql DB  with Firebase DB.


## Setup

1. Make sure to install [node and npm](https://nodejs.org/en/download).

2. Run `npm install`

3. On your firebase console, go to your Project Settings page and navigate to Service Accounts.

4. At the bottom, click `Generate New Private Key` button.

5. Move the downloaded json in this folder and rename to `firebase.json`.

6. Change  databaseURL: "https://xx.firebaseio.com" in index.js


7. Chnage your Local Mysql credentials to `mysql.json`.

## Running the application

1. Run `npm start`

require('dotenv').config();
const express = require('express');
const path = require('path');
//const mongodb = require('mongodb') ; 
const {
  answerHandler,
  questionHandler
} = require('./apiHandler');
const {
  setupDB
} = require('./dataHandler');

const PORT = process.env.PORT || 5000
const FRONT_DIR = process.env.FRONT_DIR 

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true
});
client.connect(err => {

  if (err) {
    console.log(err);
    process.exit(1);
  }
  setupDB(client);

  express()
    .use(express.static(FRONT_DIR))
    .use(express.json()) // for parsing application/json
    .use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    })
    .get('/api/questions', questionHandler)
    .post('/api/answers', answerHandler)
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))
});
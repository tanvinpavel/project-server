const MongoClient = require("mongodb").MongoClient;
const mongoose = require('mongoose');
require("dotenv").config();

// const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.zjops.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const uri = `mongodb+srv://yoodaDB:12345@cluster0.zjops.mongodb.net/?retryWrites=true&w=majority`;
var db;

module.exports = {
  connectToServer: (callback) => {
    MongoClient.connect(uri, { useNewUrlParser: true }, function (err, client) {
      db = client.db("yooda");
      return callback(err);
    });
  },

  getDb: function () {
    return db;
  },

  connectToMongoose: (callback) => {
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, family: 4})
      .then(callback)
      .catch(callback)
  }
};

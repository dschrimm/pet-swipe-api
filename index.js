require('dotenv').config();

const express = require ('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var app = express();

const MongoClient = require('mongodb').MongoClient

MongoClient.connect(process.env.PETSWIPE_API, (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(8081, () => {
    console.log('listening on 8081');
  });
});

// var router = require('./services/router');

app.use(bodyParser.json());
// app.use('/v1', router);
// app.use('/v1', ./);

// const uuid = require('uuid');
//
var Schema = mongoose.Schema;
//
//
var userSchema = new Schema({
   email: {
     type: String,
     unique: true
   },
   password: {type: String},
   todos: [
     {
       text: {type: String}
     }
   ],
   favorites: [
     {
       id: {type: Number}
     }
   ]
});
//
// userSchema.pre('save', function(next) {
//   console.log('About to save');
//   var user = this;
//   user.password = uuid.v4();
//   next();
// })
//
// var User = mongoose.model('user', userSchema);
//
var email = 'test1@test.com';
// // var user = new User({
//   // email: email
// // })
// //
// // user.save(function(err) {
// //   if (err) {
// //     return console.log(err);
// //   } else {
// //     return console.log('User was saved!');
// //   }
// // })
//

var findUrl = process.env.PETFINDER_FIND;
var getUrl = process.env.PETFINDER_GET;
var breedsUrl = process.env.PETFINDER_BREEDS;


app.get('/favorites', function (req, res) {
  var cursor = db.collection('favorites').find().toArray(function (err, results) {
    res.json(results);
  });
});

app.get('/rejections', function (req, res) {
  var cursor = db.collection('rejections').find().toArray(function (err, results) {
    res.json(results);
  });
});

app.get('/search', function (req, res) {
  var size = '&size=' + req.headers.size;
  var location = '&location=' + req.headers.location;
  var animal = '&animal=' + req.headers.animal;
  var breed;
  if (req.headers.breed == null) {
    breed = '';
  } else {
    breed = '&breed=' + req.headers.breed;
  }

  res.redirect(findUrl + animal + location + size + breed);
});

app.get('/get', function (req, res) {
  var id = '&id=' + req.headers.id;

  res.redirect(getUrl + id);
});

app.get('/breeds', function(req, res) {
  var animal = '&animal=' + req.headers.animal;
  res.redirect(breedsUrl + animal);
});

app.post('/favorites', (req, res) => {
  db.collection('favorites').save(req.body, (err, result) => {
    if (err) return console.log(err);
    res.redirect('/favorites');
  });
});

app.post('/rejections', (req, res) => {
  db.collection('rejections').save(req.body, (err, result) => {
    if (err) return console.log(err);
    res.redirect('/rejections');
  });
});

app.delete('/favorites/:petId', (req, res) => {
  db.collection('favorites').findOneAndDelete({petId: req.params.petId}, (err, result) => {
    if (err) return res.send(500, err);
    res.send('Animal removed from favorites');
  });
});

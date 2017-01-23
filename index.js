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

app.use(bodyParser.json());

var Schema = mongoose.Schema;

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

var email = 'test1@test.com';

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
  if (req.headers.size === '') {
    size = '';
  }
  var location = '&location=' + req.headers.location;
  var animal = '&animal=' + req.headers.animal;
  var breed = '&breed=' + req.headers.breed;
  if (req.headers.breed === '') {
    breed = '';
  }
  var sex = '&sex=' + req.headers.sex;
  if (req.headers.sex === '') {
    sex = '';
  }
  var age = '&age=' + req.headers.age;
  if (req.headers.age === '') {
    age = '';
  }

  var url = findUrl + animal + location + size + breed + sex + age;

  res.redirect(url);
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

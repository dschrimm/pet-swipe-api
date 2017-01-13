require('dotenv').config();

const express = require ('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var app = express();
mongoose.connect(process.env.PETSWIPE_API, (err, database) => {
  if (err) return console.log(err);
  // db = database;
  // console.log(db);
  app.listen(3000, () => {
    console.log('listening on 3000');
  });
});

var router = require('./services/router');

app.use(bodyParser.json());
app.use('/v1', router);


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
var text = "this is another todo";
var favId = 4321;
// console.log(app);

// User.findOne({email: email}, function(err, user) {
//   if (err) {
//     return console.log(err);
//   }
//   if (!user) {
//     return console.log('couldn\'t find user');
//   }
//
//   var count = user.todos.push({
//     text: text,
//   });
//
//   var count = user.favorites.push({
//     id: favId
//   });
//
//   console.log(count);
//   user.save(function(err) {
//     if (err) {
//       return console.log(err);
//     } else {
//       return console.log('saved');
//     }
//   });
// });

//
var id = '5877cfc517007d4080925e83';
//
// User.update({email: email}, { $pull: { todos: { _id: id } } }, function(err) {
//   if (err) {
//     return console.log(err);
//   } else {
//     return console.log('removed that todo');
//   }
// });

// User.find({email: email})

var findUrl = process.env.PETFINDER_FIND;
var getUrl = process.env.PETFINDER_GET;


router.get('/favorites', function (req, res) {
  user.find({email: 'test1@test.com'}, function (err, user){
    res.json(user[0].favorites);
  });
});

router.get('/search', function (req, res) {
  var size = '&size=' + req.headers.size;
  var location = '&location=' + req.headers.location;
  var animal = '&animal=' + req.headers.animal;

  res.redirect(findUrl + animal + location + size);
});

router.get('/get', function (req, res) {
  var id = '&id=' + req.headers.id;

  res.redirect(getUrl + id);
});

router.route('/favorites')
.post(function(req, res) {
 favorite =
 favorite.save();
 console.log('favorite saved');
})

router.post('/favorites', function (req, res) {
  db.collection('users').save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.redirect('/')
  });
});

module.exports = router;

// favorites/:id

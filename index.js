require('dotenv').config();

console.log(process.env.PETSWIPE_API);

const express = require ('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var app = express();
mongoose.connect(process.env.PETSWIPE_API);

var router = require('./services/router');

app.use(bodyParser.json());
app.use('/v1', router);

app.listen(3000, () => {
    console.log('listening on 3000')
  })

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

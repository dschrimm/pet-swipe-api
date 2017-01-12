const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var validateEmail = (email) => {
//   return (/\S+@\S+\.\S+/).test(email);
// }

var userSchema = new Schema({
  //  email: {
  //    type: String,
  //    unique: true,
  //    lowercase: true,
  //    required: 'Email address is required',
  //    validate: [validateEmail, 'Please enter a valid email' ]
  //  },
  //  password: {type: String},
   favorites: [
     {
       id: {type: Number}
     }
   ],
   rejects: [
     {
       id: {type: Number}
     }
   ]
});

module.exports = mongoose.model('user', userSchema);

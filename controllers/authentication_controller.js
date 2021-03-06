const User = require('../models/user');

exports.signup = function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  if (!email) || (!password) {
    return res.status(422).json({error: "You must provide an email and password"});
  }

  User.findOne({email: email}, function(err, existingUser) {
    if (err) { return next(err) }
    if (existingUser) {return res.status(422).json({error: "Email taken"})}
    var user = new User({
      email: email,
      password: password

    })
    user.save(function(err) {
      if (err) {return next(err)}
      res.json({user_id: user._id});
    });
  })
}

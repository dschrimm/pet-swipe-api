const express = require ('express');
const mongoose = require('mongoose');

 var router = require('express').Router();
 var user = require('../models/user');

function favorites(req, res, next) {
  user.find({email: 'test1@test.com'}, function (err, user){
    res.json(user[0].favorites);
  });
}

function search(req, res) {
  // console.log(req.headers.size);
  console.log(req.headers);
  var size = ('&size=' + req.headers.size);
  var location = ('&location=' + req.headers.location);
  var animal = '&animal=' + req.headers.animal;
  console.log('>>>>> im in search');
  // console.log(req);
  var baseUrl = base;
  console.log(baseUrl + animal + location + size);
  res.redirect(baseUrl + animal + location + size);
}

 router.route('/favorites')
 .get(favorites);

 router.route('/search')
 .get(search);

 module.exports = router;

// favorites/:id

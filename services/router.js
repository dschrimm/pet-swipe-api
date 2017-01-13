require('dotenv').config()

const express = require ('express');
const mongoose = require('mongoose');

 var router = require('express').Router();
 var user = require('../models/user');

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

 router.post('/favorites', function (req, res) {
   db.collection('users').save(req.body, (err, result) => {
     if (err) return console.log(err);
     console.log('saved to database');
     res.redirect('/')
   });
 });

 module.exports = router;

// favorites/:id

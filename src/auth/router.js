'use strict';
const express = require('express');
const router = express.Router();
const basicAuth = require('./middleware/basicAuth');
const usersModel = require('./models/users-model');
const bcrypt = require('bcrypt');


// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
router.post('/signin',basicAuth,(req, res) => {
  res.status(200).json(req.body.user);
});

// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup usernmae=john password=foo
router.post('/signup', async (req, res) => {

  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = new usersModel(req.body);
    const record = await user.save(req.body);
    res.status(201).json(record);
  } catch (e) { res.status(403).send("Error Creating User"); }
});

module.exports = router;
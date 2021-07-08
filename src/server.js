'use strict';

// 3rd Party Resources
const express = require('express');
const router = require('./auth/router')
const cors = require('cors');


// Prepare the express app
const app = express();

// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.post('/signin',router);
app.post('/signup',router);

function start(port){
  app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
  })
}

module.exports={
  app,start
};
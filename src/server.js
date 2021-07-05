'use strict';

const express = require('express');
const cors = require('cors');
const router=require('./auth/router')
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.post('/signup' , router)
app.post('/signin' , router)

module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
  
};


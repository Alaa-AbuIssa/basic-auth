'use strict';

const supergoose = require('@code-fellows/supergoose');
const { app } = require('../src/server');
const request = supergoose(app);
const base64=require('base-64')


describe('Server Tests', ()=>{

  it('Handles Creating a New User', async ()=>{
    let userObj ={
      username: "alaa",
      password: "1234"
    }
    const response = await request.post('/signup').send(userObj);
    expect(response.body.username).toEqual("alaa");
    expect(response.status).toEqual(201);
  });

  it('Handles Signing in and tests middleware', async ()=>{   

    let encoded =`Basic ${base64.encode("alaa:1234")}`
    let response = await request.post('/signin').set({Authorization : encoded});
    expect(response.body.username).toEqual("alaa");
    expect(response.status).toEqual(200);

  });
});

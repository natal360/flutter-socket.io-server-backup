const express = require('express');
const path = require('path');
require('dotenv').config(); // npm i dotenv

// app Express
const app = express();

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server); // npm i socket.io
require('./sockets/socket');



// Path Public
const publicPath = path.resolve( __dirname, 'public' );

app.use( express.static( publicPath ));


server.listen(process.env.PORT, (err)=>{
  console.log('Client connect');

  if(err) throw new Error(err);

  console.log('Server run! http://localhost:3000',process.env.PORT);
});
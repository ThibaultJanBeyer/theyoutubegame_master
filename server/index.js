const express = require('express');
const path = require('path');
const WebSocketServer = require('ws').Server;
const url = require('url');
const game = require('./Game');
const wss = new WebSocketServer( {
  port: 40510
} );

// Setup
////////////////////////////////////////////////////////////////////////
const app = express();

// Define port to run server on
var port = process.env.APPLICATION_PORT || 8080 ;

app.use( express.static( './app' ) );
app.set( 'view engine', 'html' ) ;

// Sockets
////////////////////////////////////////////////////////////////////////

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});

// Frontend Routes
////////////////////////////////////////////////////////////////////////

app.use( '/m/:gameId', function(req, res) {
  res.sendFile(path.resolve('app/master/index.html'));
} );

app.use( '/s/:gameId', function(req, res) {
  res.sendFile(path.resolve('app/slave/index.html'));
} );

app.use( '*', function(req, res) {
  res.sendFile(path.resolve('app/home/index.html'));
} );

// Start Server
////////////////////////////////////////////////////////////////////////

app.listen( port, '0.0.0.0' ) ;
console.log( 'Listening on port %s...', port ) ;

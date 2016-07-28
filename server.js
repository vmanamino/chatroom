var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

var count = 0;
var first = '';

io.on('connection', function (socket) {
    count += 1;
    console.log('Client connected');
    first = socket.id
    console.log(socket.id)
    console.log(socket.adapter.nsp.adapter.rooms[first]);
    // console.log(io.sockets.connected)
    // console.log('count');
    // console.log(count);
    
    socket.on('message', function(message) {
        console.log('Received message:', message);
        socket.broadcast.emit('message', message);
    });
});

server.listen(8080);
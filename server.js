var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

var count = 0;
var first = '';
var store = [];

io.on('connection', function (socket) {
    count += 1;
    console.log('Client connected');
    store.push(socket.id);
    console.log(socket.id)
    console.log(socket.adapter.nsp.adapter.rooms[socket.id]);
    console.log('store'+store[0]);
    socket.emit('messageUser', store);
    socket.on('messageUser', function(store){
        console.log('received store', store)
        socket.broadcast.emit('messageUser', store)
    })
    
    socket.on('message', function(message) {
        console.log('Received message:', message);
        socket.broadcast.emit('message', message);
    });
});

server.listen(process.env.PORT || 8080);
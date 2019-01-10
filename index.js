var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname));

app.get('/', function(req, res){
  res.send(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('1 user connected');
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
    socket.on('disconnect', function(){
        console.log('1 user disconnected');
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
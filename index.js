var express = require('express');
var socket = require('socket.io');

var app = express();

var server = app.listen(8000, function(){
    console.log("The server is listening on port 8000");
});

var io = socket(server);// this socket io will work on this server
//console.log("index IO : -==== " + io.toString());

io.on('connection', function(socketClient){  // here we are setting up connection  server and client socket. this call back function returning socket of client.
    
    console.log("MADE SOCKET CONNECTION");
    console.log(socketClient.id);
    socketClient.on("chat", function(data){
        console.log("data is padding index : " + JSON.stringify(data));
        io.sockets.emit("chat", data);  // all sockets connected to chat ie all user in chat will be reflected with this.
    });

    socketClient.on("typing", function(data){
        socketClient.broadcast.emit("typing",data)
    })
})

app.use(express.static('public')); 
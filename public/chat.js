
// making connection(here we already have socket library access in <script> in HTML) and this socket is for front end.
var socketClient = io.connect("http://localhost:8000", {reconnect: true});

//var socket = io();

//console.log(socket);

// Query DOM
var message = document.getElementById("message");

var handle = document.getElementById("handle");

var btn = document.getElementById("send");

var output = document.getElementById("output");

var feedback = document.getElementById("feedback");

// Emit events
btn.addEventListener("click", function(){
    socketClient.emit("chat", {message:message.value, 
                          handle:handle.value
                        }); // here chat is message and object is message ans handle.
});

message.addEventListener("keypress", function(data){
    socketClient.emit("typing",handle.value);
})

// Listen for events
socketClient.on("chat", function(data){
    feedback.innerHTML = "";
    console.log("data is padding Client chat : " + JSON.stringify(data));
    output.innerHTML +='<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
});

socketClient.on("typing", function(data){
    feedback.innerHTML = '<p>' + data + ' is typing...' + '</p>';   
});

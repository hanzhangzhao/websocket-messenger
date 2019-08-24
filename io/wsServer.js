var app = require('http').createServer();
var io = require('socket.io')(app)

var PORT = 3000;

var clientCount = 0;

app.listen(PORT)

io.on('connection',function(socket) {
    clientCount++;
    socket.id = "user" + clientCount;
    io.emit("enter", socket.id + " comes in.");

    socket.on('message', function(str) {
        io.emit('message', socket.id +" says: " + str);
    })

    socket.on('disconnect', function() {
        io.emit('leave',  socket.id + " has left.");
    })
})

console.log("websocket server is listening on port " + PORT);
// var server = ws.createServer(function (conn) {
//     console.log("New connection")
//     clientCount++;
//     conn.id = "user" + clientCount;
//     var mes = {};
//     mes.type = "enter";
//     mes.data = conn.id + " comes in.";
//     broadcast(JSON.stringify(mes));
// 	conn.on("text", function (str) {
//         console.log("Received " + str)
//         var mes = {};
//         mes.type = "mess";
//         mes.data = conn.id +" says: " + str;
//         broadcast(JSON.stringify(mes));
// 	})
// 	conn.on("close", function (code, reason) {
//         console.log("Connection closed")
//         var mes = {};
//         mes.type = "leave";
//         mes.data = conn.id + " has left.";
//         broadcast(JSON.stringify(mes));
//     })
//     conn.on("error",function(err){
//         console.log("handle err")
//         console.log(err)
//     })
// }).listen(PORT)
// 
// 
// function broadcast(str){
//     server.connections.forEach(function (connection){
//         connection.sendText(str);
//     })
// }
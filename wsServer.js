var ws = require("nodejs-websocket")

var PORT = 3000;

var clientCount = 0;

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
    console.log("New connection")
    clientCount++;
    conn.id = "user" + clientCount;
    var mes = {};
    mes.type = "enter";
    mes.data = conn.id + " comes in.";
    broadcast(JSON.stringify(mes));
	conn.on("text", function (str) {
        console.log("Received " + str)
        var mes = {};
        mes.type = "mess";
        mes.data = conn.id +" says: " + str;
        broadcast(JSON.stringify(mes));
	})
	conn.on("close", function (code, reason) {
        console.log("Connection closed")
        var mes = {};
        mes.type = "leave";
        mes.data = conn.id + " has left.";
        broadcast(JSON.stringify(mes));
    })
    conn.on("error",function(err){
        console.log("handle err")
        console.log(err)
    })
}).listen(PORT)

console.log("websocket server is listening on port " + PORT);

function broadcast(str){
    server.connections.forEach(function (connection){
        connection.sendText(str);
    })
}
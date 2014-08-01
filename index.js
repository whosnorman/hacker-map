var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);
var io = require('socket.io')(server);
var request = require('request');

app.use("/public", express.static(__dirname + '/public'));
app.use("/js", express.static(__dirname + '/public/js'));
app.use("/css", express.static(__dirname + '/public/css'));

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/public/index.html');
});


var port = Number(process.env.PORT || 5000);
server.listen(port, function() {
   console.log("Listening on " + port);
});
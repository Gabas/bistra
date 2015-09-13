var http = require('http');
var express = require('express');
var app = express();


app.get('/home', function(req, res){
	res.send('Hi, from Roman');
});


var server = app.listen(3001, function() {
	console.log('Server up');
});
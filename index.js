var http = require('http');
var bistra = require('./bistra');


// bistra.get('/home', function(req, res){
// 	res.send('Hi, from Roman');
// })


// var server = http.createServer(bistra.route);
var server = http.createServer(function(req, res) {
	res.writeHead(200, {"Content-Type": "text/plain"});
    res.write("Hi from Vanilla Node");
    return res.end();
});


server.listen(3000, function() {
	console.log('Server up');
});
var http = require('http');
var Bistra = require(__dirname + "/lib/bistra");
var port = 3000;
var bistra = Bistra();


var server = http.createServer(bistra.route);


bistra.get('/home', function(req, res){
 res.send('string');
});

bistra.post('/upload', function(req, res){
 req.upload('upload.sample', function() {
   console.log('upload callback operational');
   return res.end();
 });
});

bistra.mkapi('/api');

bistra.mkapi('/api2');


server.listen(port);
console.log("Server listening to port: " + port);

module.exports = require(__dirname + "/lib/bistra");
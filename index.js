var http = require('http');
var Bistra = require(__dirname + "/lib/bistra");
var bistra = Bistra();
var port = 3000;

bistra.get('/home', function(req, res){
  res.send('string');
});

bistra.get('/test', function(req, res) {
  res.json({"JSONObject": "getsSentTo/home"});
});

bistra.post('/upload', function(req, res){
 req.upload('upload.sample', function() {
   console.log('upload callback operational');
   return res.end();
 });
});

bistra.mkapi('/api');

var server = http.createServer(bistra.route);
server.listen(port);
console.log("Server listening to port: " + port);
var http = require('http');
module.exports = exports = function extendResponse(req, res) {
  
  http.ServerResponse.prototype.send = function(data) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write(data);
    return res.end();
  };

  http.ServerResponse.prototype.json = function(data) {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.write(JSON.stringify(data));
    return res.end();
  };

  // Set req methods
  http.IncomingMessage.prototype.upload = function(filePath, callback) {
    req.on('data', function(data) {
      fs.writeFile(filePath, data.toString(), function(err) {
        if(err) return err;
      });
    });
    req.on('end', function() {
      callback();
    });
  };
};
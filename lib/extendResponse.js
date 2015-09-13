module.exports = exports = function extendResponse(req, res) {
  res.send = function(data) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write(data);
    return res.end();
  };
  res.json = function(data) {
    res.writeHead(200, {"Content-Type": "application/JSON"});
    res.write(data);
    return res.end();
  };

  // Set req methods
  req.download = function(filePath, callback) {
    req.on('data', function(data) {
        fs.writeFile(filePath, data.toString(), function(err) {
            if(err) return err;
        });
    });
    req.on('end', function() {
        callback();
    });
  };
}
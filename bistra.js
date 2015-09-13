var fs = require('fs');

var routes = {
  'GET': {},
  'POST': {},
  'PUT': {},
  'PATCH': {},
  'DELETE': {}
};

module.exports = {"route": route, "routes": routes, "get": get, "post": post};

function route(req, res){
  if(routes[req.method][req.url]){
    
    // Set methodes to be used on res object
    res.send = function(data) {
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.write(data);
      return res.end();
    };
     res.json = function(data) {
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.write(JSON.stringify(data));
      return res.end();
    };

    // Set req methods
    req.upload = function(filePath, callback) {
      req.on('data', function(data) {
        fs.writeFile(filePath, data.toString(), function(err) {
          if(err) return err;
        });
      });
      req.on('end', function() {
        callback();
      });
    };
    

    routes[req.method][req.url](req, res);
    

    return;
  }
  res.writeHead(404, {"Content-Type": "text/plain"});
  res.write("Sorry, page not found");
  return res.end();
}

function get(path, callback) {
  routes['GET'][path] = callback;
}

function post(path, callback) {
  routes['POST'][path] = callback;
}

function put(path, callback) {
  routes['PUT'][path] = callback;
}

function patch(path, callback) {
  routes['PATCH'][path] = callback;
}

function del(path, callback) {
  routes['DELETE'][path] = callback;
}

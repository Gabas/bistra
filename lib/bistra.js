var fs = require('fs');
var url = require('url');
var mkapi = require(__dirname + "/mkapi");
var extendResponse = require(__dirname + "/extendResponse");

var routes = {
  'GET': {},
  'POST': {},
  'PUT': {},
  'PATCH': {},
  'DELETE': {}
};

var Router = function() {
};

module.exports = exports = function() {
  return new Router();
};

Router.prototype.mkapi = mkapi;

Router.prototype.route = function(req, res){
    extendResponse(req, res);
    //Get pathname from the URL
    var parsedRoute = url.parse(req.url).pathname;
    //removes the final '/' from pathname
    if (parsedRoute[parsedRoute.length - 1] == '/') {
        parsedRoute = parsedRoute.substring(0, parsedRoute.length - 1);
    }
    if(routes[req.method][parsedRoute]){
      routes[req.method][parsedRoute](req, res);
    return;
  }
  res.writeHead(404, {"Content-Type": "text/plain"});
  res.write("Sorry, page not found");
  return res.end();
};

Router.prototype.get = function(path, callback) {
  routes['GET'][path] = callback;
};

Router.prototype.post = function(path, callback) {
  routes['POST'][path] = callback;
};

Router.prototype.put = function(path, callback) {
  routes['PUT'][path] = callback;
};

Router.prototype.patch = function(path, callback) {
  routes['PATCH'][path] = callback;
};

Router.prototype.delete2 = function(path, callback) {
  routes['DELETE'][path] = callback;
};

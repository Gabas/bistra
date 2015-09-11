var routes = {
  'GET': {},
  'POST': {}
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
      res.writeHead(200, {"Content-Type": "application/JSON"});
      res.write(data);
      return res.end();
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
  routes['POST'][path] = callback
}





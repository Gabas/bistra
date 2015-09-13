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

	module.exports = {
		"route": route,
		"routes": routes,
		"get": get,
		"post": post,
		"mkapi": mkapi
	};

	function route(req, res){
    	extendResponse(req, res);
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

	function delete2(path, callback) {
		routes['DELETE'][path] = callback;
	}

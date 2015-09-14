	var fs = require('fs');
	var url = require('url');
	// var mkapi = require(__dirname + "/mkapi");
	var extendResponse = require(__dirname + "/extendResponse");

	var routes = {
		'GET': {},
		'POST': {},
		'PUT': {},
		'PATCH': {},
		'DELETE': {}
	};

	var Bistra = function() {
	};

	module.exports = exports = function() {
		return new Bistra();
	};

	Bistra.prototype.route = function(req, res){
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

	Bistra.prototype.mkapi = function(path) {
		
		var fileName = __dirname + '/data' + path + '.json';
		
		console.log('api1');
		fs.readdir(__dirname + '/data', function(err, files) {
			if (err) {
				fs.mkdir(__dirname + '/data', function() {
					fs.writeFile(fileName, function(err) {
						if (err){
							console.log(err);
						}
						console.log("New file created at: " + fileName);
					});
				});
			} else {
				fs.writeFile(fileName, '{}' , function(err) {
					if (err){
						console.log(err);
					}
					console.log("New file created at 2: " + fileName);
				});
			}
		});

		this.get(path, function(req, res) {
			
			var parsedUrl = url.parse(req.url, true);
			console.log(parsedUrl.query);
            fs.readFile(fileName, function(err, data) {
                if (err) console.log(err);
                var fileObject = JSON.parse(data);
                var searchKey = parsedUrl.query.find;
                if (fileObject[searchKey]) {
					res.writeHead(200, {"Content-Type": "application/JSON"});
					res.write('{' + searchKey + ':' + fileObject[searchKey] + '}');
					return res.end();
                }
            });
		});

		this.post(path, function(req, res) {
			var parsedUrl = url.parse(req.url, true);
            fs.readFile(fileName, function(err, data) {
                if (err) console.log(err);
                var fileObject = JSON.parse(data);
                for(key in parsedUrl.query) {
                    fileObject[key] = parsedUrl.query[key];
                }
                fs.writeFile(fileName, JSON.stringify(fileObject) , function(err) {
                    if (err) console.log(err);
                    res.writeHead(200, {"Content-Type": "text/plain"});
                    res.end();
                });
            });
		});
	};

	Bistra.prototype.get = function(path, callback) {
		routes['GET'][path] = callback;
	}

	Bistra.prototype.post = function(path, callback) {
		routes['POST'][path] = callback;
	}

	Bistra.prototype.put = function(path, callback) {
		routes['PUT'][path] = callback;
	}

	Bistra.prototype.patch = function(path, callback) {
		routes['PATCH'][path] = callback;
	}

	Bistra.prototype.delete2 = function(path, callback) {
		routes['DELETE'][path] = callback;
	}

var fs = require('fs');
var url = require('url');
var bistra = require(__dirname + "/bistra");

module.exports = exports = function(path) {
		
		var fileName = __dirname + '/data' + path + '.json';
		
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

		bistra.get(path, function(req, res) {
			
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

		post(path, function(req, res) {
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
}
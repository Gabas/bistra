# Bistra - the quick HTTP framework

## Getting Started

Bistra makes it quick to set up and use HTTP servers in Node.js. In order
to use Bistra in your server simply download it into the same file as
your server, and require it in the top of your server file like this:

```javascript
var bistra = require(__dirname = '/bistra');
```

Then just let Bistra do the routing for you! When you create your server,
just use the routing function as the callback as such:

```javascript
http.createServer(bistra.route);
```

Bistra will handle 404 errors for you.

## Requests

Making a request is very simple with Bistra simply call the request you
want from Bistra in dot notation with the parameters of the url, and the
callback you want enacted. An example would be:

```javascript
bistra.get("/home", function (req, res) {
  console.log("This callback runs when a 'GET' request is sent to the 
               '/home' page!");
});
```
The five REST operations supported are:

### GET

```
bistra.get(url, callback);
```

### POST

```
bistra.post(url, callback);
```

### PUT

```
bistra.put(url, callback);
```

### PATCH

```
bistra.patch(url, callback);
```

### DELETE

```
bistra.del(url, callback);
```

## .send(string)

Bistra modifies the response object to allow you to call a send method on 
it. The send method takes a string and writes it out to the url of the response
object it is called on. It will also write the head response and end the 
response for you. An example would look like this:

```javascript
bistra.get('/home', function(req, res){
  res.send('This string will be written to the "/home" page when a "GET"
            request is made to it.');
});
```

## .json(data)

Bistra modifies the response object to allow you to call a JSON method on 
it. The JSON method takes a JSON object and writes it out to the url of the response
object it is called on. It will also write the head response and end the 
response for you. An example would look like this:

```javascript
bistra.get('/home', function(req, res){
  res.json({"JSONObject": "getsSentTo/home"});
});
```

## .upload(filePath, callback)

Bistra modifies the request object to have an upload method. It will write
all data recieved as a string to the file specified by filePath, then it will execute
the give callback after all data has been written. An example would be:

```javascript
bistra.post('/upload', function(req, res){
  req.upload('upload.sample', function() {
    console.log('If you post the JSON object {"thisIs": "aTest"} to "/upload"
                 it will be saved in a new file called "upload.sample"');
    return res.end();
  });
});
```
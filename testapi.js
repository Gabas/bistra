var apiBenchmark = require('api-benchmark');
 
var service = {
  server1: "localhost:3000"
};
 
var routes = { route1: '/home'};
 
apiBenchmark.measure(service, routes, function(err, results){
  console.log(err);
  // displays some stats! 
});
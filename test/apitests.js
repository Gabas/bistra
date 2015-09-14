var apiBenchmark = require('api-benchmark');
 
var services = {
  "nodeJS": "http://localhost:3000/",
  // "ExpressJS": "http://localhost:3001/"

};
 
var routes = {
  "getUsers": "home",
};
 
var options = { debug: true, minSamples: 1000, maxTime: 20 };
 
apiBenchmark.compare(services, routes, options, function(err, results){
	console.log(results);
  /* displays:s
 
.NET/getUsers x 58.37 ops/sec ±16.98% (173 runs sampled)
nodeJS/getUsers x 188 ops/sec ±0.99% (179 runs sampled)
======================================
Fastest is nodeJS/getUsers
.NET/getUserInfo x 49.16 ops/sec ±12.71% (153 runs sampled)
nodeJS/getUserInfo x 106 ops/sec ±1.19% (180 runs sampled)
======================================
Fastest is nodeJS/getUserInfo
======================================
Fastest Service is nodeJS
 
{ '.NET': 
   { getUsers: 
      { name: '.NET/getUsers',
      	href: 'http://localhost:57382/my-api/v1/users/get',
        stats: [Object],
        cycles: 3,
        hz: 58.36824401380643 },
     'getUserInfo': 
      { name: '.NET/getUserInfo',
      	href: 'http://localhost:57382/my-api/v1/users/12345/get-info',
        stats: [Object],
        cycles: 3,
        hz: 49.16409187790408 },
     isSlowest: true },
  nodeJS: 
   { getUsers: 
      { name: 'nodeJS/getUsers',
      	href: 'http://localhost:3000/my-api/v1/users/get',
        stats: [Object],
        cycles: 2,
        hz: 187.5014849827169 },
     'getUserInfo': 
      { name: 'nodeJS/getUserInfo',
      	href: 'http://localhost:3000/my-api/v1/users/12345/get-info',
        stats: [Object],
        cycles: 3,
        hz: 105.85228376312513 },
     isFastest: true } }
 
  */
});
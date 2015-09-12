var chai = require('chai');
var expect = chai.expect;
var bistra = require(__dirname + "/../bistra.js");
var chaiHttp = require('chai-http');

require(__dirname + "/../testHttpServer.js");

chai.use(chaiHttp);

describe('POST', function() {
  it('should have a function req.download that saves a file to disk', function(done) {
    var testJson = {"thisIs": "a test"};
    chai.request('localhost:3000')
      .post('/download')
      .send(testJson)
      .end(function(err, res) {
        var fileContents = fs.readFileSync('download.sample');
        expect(fileContents).to.eql(JSON.stringify(testJson));
        done();
      });
  });
});
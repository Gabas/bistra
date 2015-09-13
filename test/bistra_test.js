var chai = require('chai');
var expect = chai.expect;
var bistra = require(__dirname + "/../bistra.js");
var chaiHttp = require('chai-http');
var fs = require('fs');


require(__dirname + "/../testHttpServer.js");

chai.use(chaiHttp);

describe('GET', function() {
  it('should have a function res.send that writes text to a page', function(done) {
    chai.request('localhost:3000')
      .get('/home')
      .end(function(err, res) {
        expect(res.text).to.eql('testString');
        done();
      });
  });
  it('should have a function res.json that writes json to a page', function(done) {
    chai.request('localhost:3000')
      .get('/json')
      .end(function(err, res) {
        expect(res.text).to.eql('{"test":"JSON"}');
        done();
      });
  });
});
describe('POST', function() {
  it('should have a function req.download that saves a file to disk', function(done) {
    var testJson = {"thisIs": "a test"};
    chai.request('localhost:3000')
      .post('/upload')
      .send(testJson)
      .end(function(err, res) {
        var fileContents = fs.readFileSync('upload.sample').toString();
        expect(fileContents).to.eql(JSON.stringify(testJson));
        done();
      });
  });
});
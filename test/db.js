'use strict';
var request = require('supertest'),
  chai = require('chai'),
  expect = chai.expect,
  nock = require('nock'),
  riaktor = require('../lib/riaktor');

var db = Object.create(riaktor);
db.init_config('localhost', '8098');

// var riakmock = nock('http://localhost:8098')
//   .get('/ping')
//   .reply(200, 'OK');

describe('riaktor', function() {
  it("should return OK on a successful database ping", function (done) {
    db.ping(function(res) {
      expect(res).to.equal('OK');
      done();
    });
  });
});
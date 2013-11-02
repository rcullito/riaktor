'use strict';
var request = require('supertest'),
  chai = require('chai'),
  expect = chai.expect,
  riaktor = require('../lib/riaktor');

var db = Object.create(riaktor);
db.init_config('localhost', '8098');

describe('riaktor', function() {
  it("should return OK on a successful database ping", function (done) {
    db.ping(function(res) {
      expect(res).to.equal('OK');
      done();
    });
  });
});
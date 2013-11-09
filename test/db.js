'use strict';
var request = require('supertest'),
  chai = require('chai'),
  expect = chai.expect,
  nock = require('nock'),
  _ = require('lodash'),
  // for chai expects to pass
  riaktor = require('../lib/riaktor');
  var util = require('util');
  var qs = require('qs');


var db = Object.create(riaktor);

db.init_config('localhost', '8098');


describe('riaktor', function() {
  it("should return correct object for a given key", function (done) {
  nock('http://localhost:8098')
    .get('/riak/people/rculliton')
    .reply(200, '{ "email":"rob@wampum.io"}', { 'content-type': 'application/json' });

    db.get_value_from_key('people', 'rculliton', function(res) {
      expect(qs.stringify(res.body)).to.equal(qs.stringify({email:'rob@wampum.io'}));
      done();
    });
  });
});
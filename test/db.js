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


describe('a riak key and value', function() {
  it("should return object data for a given key", function (done) {
  nock('http://localhost:8098')
    .get('/riak/people/rculliton')
    .reply(200, '{ "email":"rob@wampum.io"}', { 'content-type': 'application/json' });

    db.get_value_from_key('people', 'rculliton', function(res) {
      expect(qs.stringify(res.body)).to.equal(qs.stringify({email:'rob@wampum.io'}));
      done();
    });
  });
  it("should return a 204 when posted", function (done) {
    var wizard_data = {email: 'gandalf@gmail.com'};

    nock('http://localhost:8098')
      .post('/riak/people/wizard')
      .reply(204, { 'content-type': 'application/json' });
    db.post_value_to_key('people', 'wizard', wizard_data, function(res) {
      expect(res.statusCode).to.equal(204);
      done();
    });
  });
  it("should return a 204 when updated", function (done) {
    var wizard_data = {email: 'radagast@gmail.com'};
    nock('http://localhost:8098')
      .put('/riak/people/wizard')
      .reply(204, { 'content-type': 'application/json' });

    db.update_value_in_key('people', 'wizard', wizard_data, function(res) {
      expect(res.statusCode).to.equal(204);
      done();
    });
  });
  it('should return a 204 or 404 when deleted', function (done) {
    nock('http://localhost:8098')
      .delete('/riak/people/wizard')
      .reply(204, { 'content-type': 'application/json' });

    db.delete_value_in_key('people', 'wizard', function(res) {
      expect([204, 404]).to.include(res.statusCode);
      done();
    });
  });
  // delete in next post
});

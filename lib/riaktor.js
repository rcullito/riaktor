'use strict';

var request = require('superagent');
var _ = require('lodash');
var nock = require('nock');
var qs = require('qs');

var construct_url = function() {
  return "http://" + this.host + ":" + this.port;
};

var Riaktor = {
  init_config: function (host, port) {
    this.host = host;
    this.port = port;
  },
  about_my_config: function() {
    console.log("I'm riaktor and I am running on " + construct_url.call(this));
  },
  construct_path: function() {
    var base_url = [construct_url.call(this)];
    var all_url_components = base_url.concat(_.values(arguments));
    return all_url_components.join('/');
  },
  ping: function(callback) {
    request
      .get(this.construct_path('ping'))
      .end(function(res){
          callback(res.text);
        });
  },
  get_buckets: function(callback) {
    request
      .get(this.construct_path('riak?buckets=true'))
      .end(function(res) {
        callback(res.body.buckets);
      });
  },
  get_keys_in_bucket: function(bucket, callback) {
    request
      .get(this.construct_path('buckets', bucket, 'keys?keys=true'))
      .end(function(res) {
        callback(res.body.keys);
      });
  },
  get_value_from_key: function(bucket, key, callback) {
    request
      .get(this.construct_path('riak', bucket, key))
      .end(function(res) {
        callback(res);
      });
  }
};

module.exports =  Riaktor;

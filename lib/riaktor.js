'use strict';

var request = require('superagent');


var ping_url = 'http://localhost:8098/ping';

var construct_url = function() {
  return "http://" + this.host + ":" + this.port;
};

// use a higher order function to call this but always with a different argument


var Riaktor = {
  init_config: function (host, port) {
    this.host = host;
    this.port = port;
  },
  about_my_config: function() {
    console.log("I'm riaktor and I am running on " + construct_url.call(this));
  },
  ping: function(callback) {
    request
      .get([construct_url.call(this), 'ping'].join('/'))
      .end(function(res){
          callback(res.text);
        });
  },
  get_buckets: function(callback) {
    request
      .get([construct_url.call(this), 'riak?buckets=true'].join('/'))
      .end(function(res) {
        callback(res.body.buckets);
      });
  },

  get_keys_in_bucket: function(bucket, callback) {
    request
      .get([construct_url.call(this), 'buckets', bucket, 'keys?keys=true'].join('/'))
      .end(function(res) {
        callback(res.body.keys);
      });
  }


    // post: function(bucket, data, callback) {
  //   request
  //     .post()
  // }
};

module.exports =  Riaktor;



// request
//  .get('http://localhost:8098/riak/emails/I2IH5s0DalZgt8NJHiSKB3wsQpU')
//  .end(function(res){
//     console.log(res.body);
//   });
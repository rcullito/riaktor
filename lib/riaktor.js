'use strict';

var request = require('superagent');
var _ = require('lodash');

exports.construct_url = function(host, port) {
  return "http://" + host + ":" + port;
};

exports.about_my_config = function(url) {
  console.log("I'm riaktor and I am running on " + url);
};

var construct_path = function(url) {
  var base_url = [url];
  var all_url_components = _.values(arguments);
  return all_url_components.join('/');
};

var generate_request_url = function(res) {
  return res.req._headers.host + res.req.path;
}

exports.ping = function(url, callback) {
  request
    .get(construct_path(url, 'ping'))
    .end(function(err, res){
        if (err) {
          return callback(err);
        }
        var response = {
          request_url: generate_request_url(res),
          value: res.text,
        }
        callback(response);
      });
};

exports.post_value_without_key = function(url, bucket, data, callback) {
  request
    .post(construct_path(url, 'riak', bucket, '?returnbody=true'))
    .set('Content-Type', 'application/json')
    .send(data)
    .end(function(err, res) {
      if (err) {
        return callback(err);
      }
      var key = _.last(res.header.location.split('/'));
      var response = {
        request_url: generate_request_url(res),
        id: key,
        data: res.body,
      };
      callback(response);
    });
};


exports.get_buckets = function(url, callback) {
  request
    .get(construct_path(url, 'riak?buckets=true'))
    .end(function(err, res) {
      if (err) {
        return callback(err);
      }
      var response = {
        request_url: generate_request_url(res),
        value: res.body.buckets
      }
      callback(response);
    });
};

exports.get_keys_in_bucket = function(url, bucket, callback) {
  request
    .get(construct_path(url, 'buckets', bucket, 'keys?keys=true'))
    .end(function(err, res) {
      if (err) {
        return callback(err);
      }
      var response = {
        request_url: generate_request_url(res),
        data: res.body.keys,
      }
      callback(response);
    });
};


// add error handling for wrong number of arguments
// look into something like json gate
exports.get_value_from_key = function(url, bucket, key, callback) {
  request
    .get(construct_path(url, 'riak', bucket, key))
    .end(function(err, res) {
      if (err) {
        return callback(err);
      }
      var response = {
        request_url: generate_request_url(res),
        id: key,
        data: res.body,
      };
      callback(response);
    });
};
exports.post_value_to_key = function(url, bucket, key, data, callback) {
  request
    .post(construct_path(url, 'riak', bucket, key, '?returnbody=true'))
    .set('Content-Type', 'application/json')
    .send(data)
    .end(function(err, res) {
      if (err) {
        return callback(err);
      }
      var response = {
        request_url: generate_request_url(res),
        id: key,
        data: res.body,
      };
      callback(response);
    });
},
exports.update_value_in_key = function(url, bucket, key, data, callback) {
  request
    .put(construct_path(url, 'riak', bucket, key, '?returnbody=true'))
    .set('Content-Type', 'application/json')
    .send(data)
    .end(function(err, res) {
      if (err) {
        return callback(err);
      }
      var response = {
        request_url: generate_request_url(res),
        id: key,
        data: res.body,
      };
      callback(response);
    });
};

exports.delete_value_in_key = function(url, bucket, key, callback) {
  request
  .del(construct_path(url, 'riak', bucket, key))
  .end(function(err, res) {
    if (err) {
      return callback(err);
    }
    var response = {
      request_url: generate_request_url(res),
      value_deleted: res.ok,
    }
    callback(response);
  });
}


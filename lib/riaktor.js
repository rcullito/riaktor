'use strict';

var request = require('superagent');
var _ = require('lodash');

exports.construct_url = function(host, port) {
  return "http://" + host + ":" + port;
};



exports.about_my_config = function(url) {
  console.log("I'm riaktor and I am running on " + exports.construct_url(url));
};



var construct_path = function(url) {
  var base_url = [url];
  var all_url_components = base_url.concat(_.values(arguments));
  return all_url_components.join('/');
};


exports.ping = function(url, callback) {
  request
    .get(construct_path(url, 'ping'))
    .end(function(err, res){
        if (err) {
          return callback(err);
        }
        callback(res.text);
      });
};
// get_buckets: function(callback) {
//   request
//     .get(this.construct_path('riak?buckets=true'))
//     .end(function(err, res) {
//       if (err) {
//         return callback(err);
//       }
//       callback(res.body.buckets);
//     });
// },
// get_keys_in_bucket: function(bucket, callback) {
//   request
//     .get(this.construct_path('buckets', bucket, 'keys?keys=true'))
//     .end(function(err, res) {
//       if (err) {
//         return callback(err);
//       }
//       callback(res.body.keys);
//     });
// },
// get_value_from_key: function(bucket, key, callback) {
//   request
//     .get(this.construct_path('riak', bucket, key))
//     .end(function(err, res) {
//       if (err) {
//         return callback(err);
//       }
//       callback(res);
//     });
// },
// post_value_to_key: function(bucket, key, data, callback) {
//   request
//     .post(this.construct_path('riak', bucket, key))
//     .set('Content-Type', 'application/json')
//     .send(data)
//     .end(function(err, res) {
//       if (err) {
//         return callback(err);
//       }
//       callback(res);
//     });
// },
// post_value_without_key: function(bucket, data, callback) {
//   request
//     .post(this.construct_path('riak', bucket, '?returnbody=true'))
//     .set('Content-Type', 'application/json')
//     .send(data)
//     .end(function(err, res) {
//       if (err) {
//         return callback(err);
//       }
//       var key = _.last(res.header.location.split('/'));
//       var response = {
//         key: key,
//         value: res.body,
//       };
//       callback(response);
//     });
// },
// update_value_in_key: function(bucket, key, data, callback) {
//   request
//     .put(this.construct_path('riak', bucket, key))
//     .set('Content-Type', 'application/json')
//     .send(data)
//     .end(function(err, res) {
//       if (err) {
//         return callback(err);
//       }
//       callback(res);
//     });
// },
// delete_value_in_key: function(bucket, key, callback) {
//   request
//   .del(this.construct_path('riak', bucket, key))
//   .end(function(err, res) {
//     if (err) {
//       return callback(err);
//     }
//     callback(res);
//   });
// }


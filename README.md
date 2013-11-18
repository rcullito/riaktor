<img src="http://4.bp.blogspot.com/_TaxA4M5bjX8/S-Hg34oB_sI/AAAAAAAAAEI/_BMipkv-0w8/s640/4a60d7e53af5d,Arc-Reactor-RELOADED.png" alt="the riaktor" width="300px;"/>

# Riaktor [![Build Status](https://travis-ci.org/wampum/riaktor.png?branch=master)](https://travis-ci.org/wampum/riaktor)

### a lightweight wrapper for riak built with superagent.

Initialize

    var riaktor = require('riaktor');

    var db = Object.create(riaktor);

    db.init_config('localhost', '8098');

    db.about_my_config();
    => I'm riaktor and I am running on http://localhost:8098


Check Health

    db.ping(function(res) {
      console.log(res);
    });
    => OK

Bucket Operations

    db.get_buckets(function(res) {
      console.log(res);
    });
    => ['bucket_name_1', 'bucket_name_2']

    db.get_keys_in_bucket('people', function(res) {
      console.log(res);
    });
    => ['key_name_1', 'key_name_2']

Key Operations

    db.get_value_from_key('people', 'rculliton', function(res) {
      console.log(res.body);
    });
    => {example_key_1: 'example_value_1'}

    var data = {email: 'claire@wampum.io'};

    db.post_value_to_key('people', 'cbelle', data, function(res) {
      console.log(res.status);
    });
    => 204

    db.post_value_without_key('people', data, function(res) {
      console.log(res);
    });
    =>  {
          key: 'a8ohPGekcC98v2NqdNEKf8otX4Z',
          value: {
            email: 'clairebelle@wampum.io'
          }
        }

    var new_data = {email: 'clairebelle@wampum.io'};

    db.update_value_in_key('people', 'cbelle', new_data, function(res) {
      console.log(res.status);
    });
    => 204

    db.delete_value_in_key('people', 'cbelle', function(res) {
      console.log(res.statusCode);
    });
    => 204
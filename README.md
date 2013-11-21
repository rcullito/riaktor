<img src="http://4.bp.blogspot.com/_TaxA4M5bjX8/S-Hg34oB_sI/AAAAAAAAAEI/_BMipkv-0w8/s640/4a60d7e53af5d,Arc-Reactor-RELOADED.png" alt="the riaktor" width="300px;"/>

# Riaktor [![Build Status](https://travis-ci.org/wampum/riaktor.png?branch=master)](https://travis-ci.org/wampum/riaktor)

### a functional style riak wrapper for node

Initialize

    var db = require('riaktor');

    var url = db.construct_url('localhost', '8098');

    db.about_my_config(url);
    => I'm riaktor and I am running on http://localhost:8098


Check Health

    db.ping(url, function(res) {
      console.log(res);
    });
    => { request_url: 'localhost:8098/ping', data: 'OK' }

Bucket Operations

    db.get_buckets(url, function(res) {
      console.log(res);
    });
    =>  {
          request_url: 'localhost:8098/riak?buckets=true',
          data: [ 'wizard', 'people' ]
        }

    db.get_keys_in_bucket(url, 'people', function(res) {
      console.log(res);
    });
    =>  {
          request_url: 'localhost:8098/buckets/people/keys?keys=true',
          data: [ 'rculliton', 'john_maynard_keynes' ]
        }

Key Operations

    db.get_value_from_key(url, 'people', 'rculliton', function(res) {
      console.log(res);
    });
    =>  {
          request_url: 'localhost:8098/riak/people/rculliton',
          id: 'rculliton',
          data: { email: 'rob@wampum.io' }
        }

    var data = {email: 'claire@wampum.io'};

    db.post_value_to_key(url, 'people', 'cbelle', data, function(res) {
      console.log(res);
    });
    =>  {
          request_url: 'localhost:8098/riak/people/cbelle/?returnbody=true',
          id: 'cbelle',
          data: { email: 'claire@wampum.io' }
        }

    db.post_value_without_key(url, 'emails', data, function(res) {
      console.log(res);
    });
    =>  {
          request_url: 'localhost:8098/riak/emails/?returnbody=true',
          id: '4azFyFHu0toaQcc2QRIUTRRqNUy',
          data: { email: 'claire@wampum.io' }
        }

    var new_data = {email: 'clairebelle@wampum.io'};

    db.update_value_in_key(url, 'people', 'cbelle', new_data, function(res) {
      console.log(res);
    });
    =>  {
          request_url: 'localhost:8098/riak/people/cbelle/?returnbody=true',
          id: 'cbelle',
          data: { email: 'clairebelle@wampum.io' }
        }

    db.delete_value_in_key(url, 'people', 'cbelle', function(res) {
      console.log(res);
    });
    =>  {
          request_url: 'localhost:8098/riak/people/cbelle',
          value_deleted: true
        }
<img src="images/riaktor.png" alt="the riaktor" width="300px;"/>

# Riaktor

Riaktor is a lightweight wrapper for riak built with superagent.

Initialize

    var riaktor = require('riaktor');

    var db = Object.create(riaktor);

    db.init_config('localhost', '8098');

    db.about_my_config();
    => I'm riaktor and I am running on http://localhost:8098


Check health

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

    db.delete_value_in_key('people', 'cbelle', function(res) {
      console.log(res.statusCode);
    });
    => 204
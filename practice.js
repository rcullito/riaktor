var riaktor = require('./lib/riaktor');

// This will be the basis for documentation

var db = Object.create(riaktor);
db.init_config('localhost', '8098');
db.about_my_config();
db.ping(function(res) {
  console.log(res);
});

db.get_buckets(function(res) {
  console.log(res);
});

db.get_keys_in_bucket('emails', function(res) {
  console.log(res);
});

// db.put()



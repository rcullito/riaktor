var riaktor = require('./lib/riaktor');

// This will be the basis for documentation

var db = Object.create(riaktor);

db.init_config('localhost', '8098');

// db.about_my_config();

// db.ping(function(res) {
//   console.log(res);
// });

// db.get_buckets(function(res) {
//   console.log(res);
// });

db.get_keys_in_bucket('people', function(res) {
  console.log(res);
});

// make note about whether you are retrieving body 
// or text based off the content type of how the value for 
// a given key was stored
db.get_value_from_key('people', 'rculliton', function(res) {
  console.log(res.body);
});

var cbelle_data = {email: 'claire@wampum.io'};

db.post_value_to_key('people', 'cbelle', cbelle_data, function(res) {
  console.log(res);
});



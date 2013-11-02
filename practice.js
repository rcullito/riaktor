var riaktor = require('./lib/riaktor');

var db = Object.create(riaktor);
db.init_config('localhost', '8098');
db.about_my_config();
db.ping(function(res) {
  console.log(res);
});

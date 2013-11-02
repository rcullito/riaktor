var riaktor = require('./lib/riaktor');



var db = Object.create(riaktor);
db.init_config('localhost', '8098');
db.about_me();
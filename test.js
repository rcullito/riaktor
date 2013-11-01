var request = require('superagent');

request
 .get('http://localhost:8098/riak/emails/I2IH5s0DalZgt8NJHiSKB3wsQpU')
 .end(function(res){
    console.log(res.body);
  });
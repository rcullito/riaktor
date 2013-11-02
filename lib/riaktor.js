var request = require('superagent');

var Riaktor = {
  init_config: function (host, port) {
    this.host = host;
    this.port = port;
  },
  about_my_config: function() {
    console.log("I'm riaktor and I am running on " + this.host + ":" + this.port);
  },
  ping: function(callback) {
    request
      .get('http://localhost:8098/ping')
      .end(function(res){
          callback(res.text);
      });
  }
};

module.exports =  Riaktor;



// request
//  .get('http://localhost:8098/riak/emails/I2IH5s0DalZgt8NJHiSKB3wsQpU')
//  .end(function(res){
//     console.log(res.body);
//   });
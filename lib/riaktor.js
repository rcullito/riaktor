var request = require('superagent');



function setPort (port_number) {
  var riak_port = port_number;
};

// pass in host and port

var Riaktor = function(host, port) {
  this.host = host;
  this.port = port;
  this.aboutme = function() {
    console.log("Hi I'm a riaktor object on " + this.host + ":" + this.port);
  }
};

Riaktor.prototype = new Riaktor();

module.exports =  Riaktor;


// var riaktor = new Riaktor('localhost', '8098');
// console.log(riaktor.aboutme());




// function setPort(port_number) {
//   var port_number = port_number;
// }

// request
//  .get('http://localhost:8098/riak/emails/I2IH5s0DalZgt8NJHiSKB3wsQpU')
//  .end(function(res){
//     console.log(res.body);
//   });

var net = require('net');

var Request = require('./request'),
  Response = require('./response');

var Server = function Server(requestListener) {
  this.tcpServer = net.createServer(function(socket) {
    socket.on('data', function(message) {
      var req = new Request(message, socket);
      var res = new Response(socket);
      requestListener(req, res);
      socket.end();
    });
  });
};

Server.prototype.listen = function listen(port, hostname, backlog, callback) {
  this.tcpServer.listen(port, hostname, backlog, callback);
};

module.exports = Server;

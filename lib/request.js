
var HTTPStatus = require('http-status');

var utils = require('./utils');

var Request = function Request(message, socket) {
  var message = message.toString().split('\n');

  if (message.length <= 0) {
    return false;
  }
  // parse request line
  var requestLine = message.shift().split(/\s/);
  this.method = requestLine[0];
  this.url = requestLine[1];
  this.version = requestLine[2].split('/')[1];

  // parse headers and body
  var parseHeader = true;
  this.body = '';
  this.rawHeaders = '';
  this.headers = {};
  for (var l in message) {
    var line = message[l];
    if (line == '\r') {
      // parseHeader should be false when the first blank line is found
      parseHeader = false;
    }
    if (parseHeader) {
      var hvPair = line.split(':');
      this.headers[hvPair.shift()] = hvPair.join(':');
      this.rawHeaders += line + '\r';
    }
    else {
      this.body += line + '\n';
    }
  }

  this.host = this.headers['Host'];
  this.socket = socket;
};

module.exports = Request;

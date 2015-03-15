
var HTTPStatus = require('http-status');

var utils = require('./utils');

var parseRequest = function parseRequest(message, socket) {
  var request = {},
    message = message.toString().split('\n');

  if (message.length <= 0) {
    return false;
  }

  // parse request line
  var requestLine = message.shift().split(/\s/);
  request.method = requestLine[0];
  request.url = requestLine[1];
  request.version = requestLine[2].split('/')[1];

  // parse headers and body
  var parseHeader = true;  // state is either 'header'
  request.headers = {};
  request.body = '';
  request.rawHeaders = '';
  message.forEach(function parseLine(line) {
    if (!line) {
      // parseHeader should be false when the first blank line is found
      parseHeader = false;
    }
    if (parseHeader) {
      var hvPair = line.split(':', 1);
      request.headers[hvPair[0]] = hvPair[1];
      request.rawHeaders += line + '\n';
    }
    else {
      request.body += line + '\n';
    }
  });
  request.host = request.headers['Host'];
  request.socket = socket;
  return request;
};

var Request = function Request(message, socket) {
  var parsed = parseRequest(message, socket);
  Object.keys(parsed).forEach(function(key) {
    this[key] = parsed[key];
  });
};

module.exports = Request;

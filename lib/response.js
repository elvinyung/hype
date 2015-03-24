
var HTTPStatus = require('http-status');

var utils = require('./utils');

var compileResponse = function compileResponse(body, status, statusMessage, headers) {
  body = body || '';
  status = status || 200;
  headers = headers || {};

  var message = '';
  message += utils.format('HTTP/1.1 {statusCode} {statusMessage}', {
    statusCode: status,
    statusMessage: statusMessage || HTTPStatus[status]
  }) + '\r';
  Object.keys(headers).forEach(function writeHeader(header) {
    var val = utils.parseHeader(headers[header]);
    message += utils.format('{header}: {val}', {
      header: header,
      val: val
    }) + '\r';
  });
  message += '\r';
  message += body;

  return message;
};

var Response = function Response(socket) {
  this.socket = socket;
  this.headers = {}
  this.body = '';
  this.status = 200;
};

Response.prototype.setHeader = function setHeader(name, value) {
  this.headers[name.toLowerCase()] = value;
  return this;
};

Response.prototype.writeHead = function writeHead(statusCode, statusMessage, headers) {
  this.status = statusCode;
  this.statusMessage = statusMessage;
  Object.keys.forEach(function addHeader(name) {
    this.setHeader(name, headers[name]);
  });
  return this;
};

Response.prototype.write = function write(chunk, encoding) {
  this.body += chunk;
  return this;
};

Response.prototype.end = function end(data, encoding, callback) {
  if (typeof data !== 'function') {
    this.write(data, encoding);
  }
  else {
    callback = data;
  }

  this.socket.write(compileResponse(
    this.body, this.statusCode, this.statusMessage, this.headers));
  return this;
}

module.exports = Response;

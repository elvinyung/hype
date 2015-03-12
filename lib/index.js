'use strict';

var Server = require('./server');

var hype = module.exports = {};

hype.createServer = function createServer(requestListener) {
  return new Server(requestListener);
};


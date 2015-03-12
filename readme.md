# Hype
### by [Elvin Yung](https://github.com/elvinyung)

Implementation of an HTTP server using TCP that attempts to emulate the Node HTTP API.

### Install
Download [from NPM](https://www.npmjs.com/package/hype-server).

### Quickstart
```javascript
var hype = require('../../lib');

var server = hype.createServer(function(req, res) {
  res.end('something');
});

server.listen(3000);
```

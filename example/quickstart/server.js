var hype = require('../../lib');

var server = hype.createServer(function(req, res) {
  res.end('asfdasdfdf');
});

console.log('server listening on port 3000');
server.listen(3000);

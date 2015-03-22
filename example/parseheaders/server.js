var hype = require('../../lib');

var server = hype.createServer(function(req, res) {
  console.log(req.headers);
  res.status = 200;
  res.end('parsed headers');
});

console.log('server listening on port 3000');
server.listen(3000);

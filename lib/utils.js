
module.exports.format = function format(str, ctx) {
  return Object.keys(ctx).reduce(function (acc, name) {
    return acc.replace(new RegExp('{' + name + '}', 'g'), ctx[name]);
  }, str);
};

module.exports.parseUrl = function parseUrl(url) {
  // regex derived from RFC 1945 BNF, section 3.2.2
  var matchRegex = /(.*):\/\/([^\/:]+)(:(\d*))?(\/.*)?/,
    match = url.match(matchRegex);

  return {
    protocol: match[1],
    host: match[2],
    hostname: match[2],
    port: Number(match[4]),
    path: match[5]
  };
};


// TODO: make this less hardcodey
module.exports.parseHeader = function parseHeader(header, val) {
  if (header === 'Content-Length') {
    return Number(val);
  }
  else if (header === 'Date') {
    return new Date(Date.parse(val));
  }
  return val;
};

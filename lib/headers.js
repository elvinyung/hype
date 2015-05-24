// TODO: make this less hardcodey
module.exports.parseHeader = function parseHeader(header, val) {
  if (header === 'Content-Length') {
    return Number(val);
  }
  else if (header === 'Date' ||
           header === 'If-Modified-Since' ||
           header === 'If-Unmodified-Since') {
    return new Date(Date.parse(val));
  }
  return val;
};


module.exports.encodeHeader = function encodeHeader(header, val) {
  return header + ': ' + val;
};

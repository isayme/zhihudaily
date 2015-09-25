var qiniu = require('qiniu');
var config = require('config');
var debug = require('debug')('zhihudaily:qiniu');

qiniu.conf.ACCESS_KEY = config.qiniu.accessKey;
qiniu.conf.SECRET_KEY = config.qiniu.secretKey;

var client = new qiniu.rs.Client();

function uptoken(key) {
  var scope = config.qiniu.bucketName;
  if (key) {
    scope += ':' + key;
  }
  var putPolicy = new qiniu.rs.PutPolicy(scope);

  return putPolicy.token();
}

function stat(key, callback) {
  client.stat(config.qiniu.bucketName, key, function(err, ret) {
    debug('qiniu.stat:', err, ret);
    callback(err, ret);
  });
}

function upload(key, data, callback) {
  var token = uptoken(key);

  qiniu.io.put(token, key, data, null, function(err, ret) {
    debug('qiniu.upload:', err, ret);
    callback(err, ret);
  });
}

module.exports = {
  stat: stat,
  upload: upload
};

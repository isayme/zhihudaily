var redis = require('redis');
var config = require('config');

var debug = require('debug')('zhihudaily:redis');

debug('redis config:', config.redis);

var client = redis.createClient(config.redis.port, config.redis.host);

if (config.redis.password) {
  client.auth(config.redis.password, function (err) {
   if (err) {
     debug('redis auth error:', err);
     throw err;
   }
  });
}

client.on('ready', function() {
  debug('redis ready');
});

client.on('error', function(err) {
 debug('redis error:', err);
});

module.exports = client;

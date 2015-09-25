process.env.NODE_ENV = 'production';
process.env.DEBUG = 'zhihudaily:*';

var redis = require('../lib/services/redis');

redis.on('ready', function() {
  redis.get('lastet', function(err, val) {
    console.log(err, val);
  });
});

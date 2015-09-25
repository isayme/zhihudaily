process.env.NODE_ENV = 'production';
process.env.DEBUG = 'zhihudaily:*';

var redis = require('../lib/services/redis');

redis.on('ready', function() {
  redis.set('latest', 5, function(err, val) {
    console.log(err, val);
    redis.expire('latest', 5);
  });
});

var url = require('url');

var urllib = require('urllib');
var CronJob = require('cron').CronJob;
var async = require('async');
var debug = require('debug')('zhihudaily:cron');
var config = require('config');

var zhihu = require('../services/zhihu');
var qiniu = require('../services/qiniu');
var redis = require('../services/redis');

function downloadAndUpload(url, key, callback) {
  var options = {
    method: 'GET',
    gzip: true
  };

  urllib.request(url, options, function(err, data) {
    if (err) {
      return callback(err);
    }

    qiniu.upload(key, data, callback);
  });
}

function uploadLatest(data, callback) {
  var date = data.date;
  var redisKey = 'zhihudaily:' + date;

  async.map(data.news, function(ele, next) {
    redis.sismember(redisKey, ele.id, function(err, isMember) {
      debug('isMember:', err, isMember);
      if (isMember) {
        return next(null, 0);
      }

      var key = date + url.parse(ele.image).pathname;
      downloadAndUpload(ele.image, key, function(err) {
        if (err) {
          return next(err);
        }
        redis.sadd(redisKey, ele.id, next);
        redis.expire(redisKey, config.zhihudaily.expire);
      });
    });
  }, callback);
}

var job = new CronJob('0 */30 * * * *', function() {
  debug('cron job');

  zhihu.getLatestNews(function(err, data) {
    if (err) {
      return debug(err, date);
    }

    uploadLatest(data, function(err, results) {
      debug('uploadLatest', err, results);
      if (!err) {
        newItems = results.reduce(function(pre, cur) {
          return pre + cur;
        });

        if (newItems) {
          var content = JSON.stringify(data);

          qiniu.upload('api/2/news/latest.json', content, function(err, ret) {
            debug('upload latest:', err, ret);
          });

          qiniu.upload('api/2/news/before/' + data.date + '.json', content, function(err, ret) {
            debug('upload latest:', err, ret);
          });
        }
      }
    });
  });
}, null, true);

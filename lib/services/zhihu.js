var async = require('async');
var urllib = require('urllib');
var debug = require('debug')('zhihudaily:zhihu');

var qiniu = require('./qiniu');
var redis = require('./redis');

function request(url, callback) {
  var options = {
    method: 'GET',
    dataType: 'json',
    gzip: true
  };

  urllib.request(url, options, function(err, data) {
    debug(err, data);
    callback(err, data);
  });
}

function getLatestNews(callback) {
  request('http://news.at.zhihu.com/api/2/news/latest', callback);
}

module.exports = {
  getLatestNews: getLatestNews
};

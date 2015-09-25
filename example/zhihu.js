process.env.NODE_ENV = 'production';
// process.env.DEBUG = 'zhihudaily:*';

var zhihu = require('../lib/services/zhihu');

zhihu.getLatestNews(function() {
  console.log(arguments);
});

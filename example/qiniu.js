process.env.NODE_ENV = 'production';

var qiniu = require('../lib/services/qiniu');

// qiniu.upload('test', 'connnn', function() {
//   console.log(arguments);
// });

qiniu.stat('test', function() {
  console.log(arguments);
});

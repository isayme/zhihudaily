define([
  'jquery',
  'underscore',
  'backbone',
  'models/news'
], function($, _, Backbone, NewsModel) {

  var NewsCollection = Backbone.Collection.extend({
    model: NewsModel,

    url: function(year, month, day) {
      var _url = 'http://7xi577.com1.z0.glb.clouddn.com/api/2/news/';
      if (year) {
        _url = _url + 'before/' + this.dateFormat(year, month, day) + '.json';
      } else {
        var date = new Date();
        // about 10min cache
        _url = _url + 'latest.json?t=' + (date.getTime() >> 19);
      }
      
      return _url;
    },
    
    parse: function(resp) {
      if (!resp || !resp.news) {
        return [];
      }

      for (var i = 0; i < resp.news.length; i++) {
        var thumbnail = resp.news[i].image;

        var idx = thumbnail.indexOf('://')
        if (idx >= 0) {
          thumbnail = thumbnail.substr(idx + 3);
        }
        var idx = thumbnail.indexOf('/')
        thumbnail = thumbnail.substr(idx);
        thumbnail = 'http://7xi577.com1.z0.glb.clouddn.com/' + resp.date + thumbnail;
        resp.news[i].thumbnail =  thumbnail;
      }
      return resp.news;
    },
    
    dateFormat: function(year, month, day) {
      year = Number(year);
      month = Number(month) - 1;
      day = Number(day) + 1;
      
      var d = new Date(year, month, day);
      var date = String(d.getFullYear());
      date = date + ((d.getMonth() < 9) ? '0' : '') + (d.getMonth() + 1);
      date = date + ((d.getDate() < 10) ? '0' : '') + d.getDate();
      
      return date;
    }
  });

  return new NewsCollection();

})

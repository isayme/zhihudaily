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
      return _url + this.dateFormat(year, month, day);
    },
    
    parse: function(resp) {
      if (!resp || !resp.news) {
        return [];
      }

      this.trigger('date:changed', resp.display_date);
      
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
      var date = new Date();
      var d = new Date(year, Number(month) - 1, 1 + Number(day));
      
      // about 10min cache
      var format = 'latest.json?t=' + (date.getTime() >> 19);

      if (!_.isNaN(d.getTime())) {
        date.setDate(date.getDate() + 1);
        // date is today, return lastet data.
        if (date.toLocaleDateString() !== d.toLocaleDateString()) {
          format = 'before/' + this.dateToStr(d) + '.json';
        }
      }
      
      return format;
    },
    
    dateToStr: function(date) {
      var format = '';
      
      format = format + date.getFullYear();
      format = format + ((date.getMonth() < 9) ? '0' : '') + (date.getMonth() + 1);
      format = format + ((date.getDate() < 10) ? '0' : '') + date.getDate();
      
      return format;
    }
  });

  return new NewsCollection();
})

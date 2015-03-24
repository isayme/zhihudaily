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
      
      // about 10min cache
      var format = 'latest.json?t=' + (date.getTime() >> 19);
      
      if (!year) {
        return format;
      }
      
      year = Number(year);
      month = Number(month) - 1;
      day = Number(day) + 1;
      var d = new Date(year, month, day);
      
      if ((date.getDate() + 1) === d.getDate()
        && date.getMonth() === d.getMonth()
        && date.getFullYear() === d.getFullYear())
      {
        return format;
      }
      
      var format = 'before/' + d.getFullYear();
      format = format + ((d.getMonth() < 9) ? '0' : '') + (d.getMonth() + 1);
      format = format + ((d.getDate() < 10) ? '0' : '') + d.getDate();
      format = format + '.json';
      
      return format;
    }
  });

  return new NewsCollection();

})

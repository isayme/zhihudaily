define([
  'jquery',
  'underscore',
  'backbone',
  'models/news'
], function($, _, Backbone, NewsModel) {

  var NewsCollection = Backbone.Collection.extend({
    model: NewsModel,

    url: function(date) {
      var _url = 'http://7xi577.com1.z0.glb.clouddn.com/api/2/news/';

      if (date) {
        _url = _url + 'before/' + date + '.json';
      } else {
        _url = _url + 'latest.json';
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
    
  });

  return new NewsCollection();

})

define([
  'jquery',
  'underscore',
  'backbone',
  'models/news'
], function($, _, Backbone, NewsModel) {

  var NewsCollection = Backbone.Collection.extend({
    model: NewsModel,

    url: function(date) {
      var _url = 'http://7xi577.com1.z0.glb.clouddn.com/api/4/news/';

      if (date) {
        _url = _url + 'before/' + date + '.json';
      } else {
        _url = _url + 'latest.json';
      }
      
      return _url;
    },
    
    parse: function(resp) {
      return resp.stories;
    },
    
  });

  return new NewsCollection();

})

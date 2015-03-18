define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

  var Router = Backbone.Router.extend({
    routes: {
      '(!/)': 'news',
      '(!/)news/:date': 'news'
    },

    news: function(date) {
      require([
        'views/news'
      ], function(newsView) {
        newsView.render(date);
      });
    },

    defAction: function(permalink) {
      console.log('[router] 404: ' + permalink);
    }
  });

  return new Router();

})

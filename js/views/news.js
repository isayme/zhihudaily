define([
  'jquery',
  'underscore',
  'backbone',
  'collections/news',
  'views/title'
], function($, _, Backbone, newsCollection) {

  var IndexView = Backbone.View.extend({
    el: '#content',
    
    template: _.template($('#news-template').html()),

    initialize: function() {
      this.renderLoading();
      this.listenTo(newsCollection, 'reset', this.updateNews);
    },
    
    updateNews: function(collection) {
      this.$el.html('');
      for (var i = 0, l = collection.length; i < l; i++) {
        var model = collection.at(i);
        this.$el.append(this.template(model.attributes));
      }

      return this;
    },

    render: function(year, month, day) {
      this.renderLoading();
      newsCollection.fetch({
        reset: true,
        url: newsCollection.url(year, month, day),
        error: this.renderError.bind(this)
      });
      
      return this;
    },
    
    renderError: function(collection, resp, options) {
      newsCollection.trigger('date:changed');
      
      if (resp.status === 404) {
        this.$el.html(
          '<div class="error">\
            <h2>Not Found.</h2>\
            <p>呀, 等等呗, 这天的数据还没同步呢!</p>\
          </div>');
      } else {
        this.$el.html(
          '<div class="error">\
            <h2>Whoops.</h2>\
            <p>嗯, 检查你的网络先~</p>\
          </div>');
      }
    },
    
    renderLoading: function() {
      this.$el.html('<div class="loading"><img src="img/loading-bubbles.svg" /></div>');
    }
  });

  return new IndexView();
})

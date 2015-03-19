define([
  'jquery',
  'underscore',
  'backbone',
  'collections/news'
], function($, _, Backbone, newsCollection) {

  var IndexView = Backbone.View.extend({
    el: '#content',
    
    template: _.template($('#news-template').html()),

    initialize: function() {
      this.listenTo(newsCollection, 'reset', this.update_news);
      //newsCollection.fetch();
    },
    
    update_news: function(collection) {
      for (var i = 0, l = collection.length; i < l; i++) {
        var model = collection.at(i);
        this.$el.append(this.template(model.attributes));
      }

      return this;
    },

    render: function(date) {
      newsCollection.fetch({reset: true, url: newsCollection.url(date)})
      this.$el.html('');
      
      return this;
    }
  });

  return new IndexView();
})

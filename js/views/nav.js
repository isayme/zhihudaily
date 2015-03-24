define([
  'jquery',
  'underscore',
  'backbone',
  'collections/news'
], function($, _, Backbone, newsCollection) {

  var NavView = Backbone.View.extend({
    el: '#nav',
    
    events: {
      'click .prev': 'prevDay',
      'click .next': 'nextDay'
    },

    initialize: function() {
      this.curdate = new Date();
      this.sysdate = this.curdate;
      this.listenTo(newsCollection, 'date:changed', this.dateChanged);
    },
    
    dateChanged: function(date) {
      if (!date) return;
      date = date.split(' ')[0]
      var arr = date.split('.');
      this.curdate = new Date(Number(arr[0]), Number(arr[1]) - 1, Number(arr[2]));
    },
    
    navigateDay: function(th) {
      var date = new Date(
        this.curdate.getFullYear(),
        this.curdate.getMonth(),
        this.curdate.getDate() + th);
      
      var route = '#!/news/'
        + date.getFullYear() + '/'
        + (date.getMonth() + 1) + '/'
        + date.getDate();
      
      window.router.navigate(route, {trigger: true});
    },
    
    prevDay: function() {
      this.navigateDay(1);
    },
    
    nextDay: function() {
      this.navigateDay(-1);
    }
  });

  return new NavView();
})

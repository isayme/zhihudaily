define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

  var NavView = Backbone.View.extend({
    el: '#nav',
    
    events: {
      'click .prev': 'prevDay',
      'click .next': 'nextDay'
    },

    initialize: function() {
      this.curdate = new Date();
      this.listenTo(window.router, 'route:news', this.routeChanged);
    },
    
    routeChanged: function(year, month, day) {
      date = new Date(year, month - 1, day);
      if (!_.isNaN(date.getTime())) {
        this.curdate = date;
      }
    },
    
    navigateDay: function(th) {
      var date = new Date(this.curdate);
      date.setDate(date.getDate() + th);
      
      var route = '#!/news/' + date.toLocaleDateString('zh');
      
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

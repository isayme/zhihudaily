define([
  'jquery',
  'underscore',
  'backbone',
  'router'
], function($, _, Backbone, router) {

  var NavView = Backbone.View.extend({
    el: '#nav',
    
    events: {
      'click .prev': 'prevDay',
      'click .next': 'nextDay'
    },

    initialize: function() {
      this.curdate = new Date();
      this.listenTo(router, 'route:news', this.routeChanged);
      
      $('body').keydown(function(e) {
        if(e.which == 37) { // left keypress
           $('.prev').trigger('click');
        } else if(e.which == 39) { // right keypress
           $('.next').trigger('click');
        }
      });
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

      var route = '#!/news/'
        + date.getFullYear() + '/'
        + (date.getMonth() + 1) + '/'
        + date.getDate();
      
      router.navigate(route, {trigger: true});
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

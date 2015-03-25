define([
  'jquery',
  'underscore',
  'backbone',
  'router'
], function($, _, Backbone, router) {

  var App = {
    initialize: function() {
      var welcome = '\n\n' +
          '     **   ********\n' + 
          '    //   **//////\n' + 
          '     ** /**          ******     **   **  **********    *****\n' +
          '    /** /*********  //////**   //** **  //**//**//**  **///**\n' +
          '    /** ////////**   *******    //***    /** /** /** /*******\n' +
          '    /**        /**  **////**    /**      /** /** /** /**////\n' +
          '    /**  ********  //********   **       *** /** /** //******\n' +
          '    //  ////////    ////////   **       ///  //  //   //////\n' +
          '                              //\n\n';
      
      console.log(welcome);
      
      require([
        'views/nav'
      ], function() {
        Backbone.history.start();
      });
      
    }
  };

  return App;

});

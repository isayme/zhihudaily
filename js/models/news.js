define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

  var NewsModel = Backbone.Model.extend({
    defaults: {
      images: ['http://7xi577.com1.z0.glb.clouddn.com/default.jpg'],
      type: 0,
      id: 0,
      ga_prefix: '',
      title: ''
    }
  });
  
  return NewsModel;
})

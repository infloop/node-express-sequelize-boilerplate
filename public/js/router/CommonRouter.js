define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
  
  var CommonRouter = Backbone.Router.extend({
    
    initialize: function(options) {
      console.log('Inicializando');
    },

    routes: {
      'index': 'index'
    },

    index : function(){
      console.log('Hola index')
    }
  });

  return CommonRouter;
});
define([
  'jquery',
  'underscore',
  'backbone',
  'router/CommonRouter',

], function($, _, Backbone, CommonRouter){
  
  var initialize = function(){
    
    initializeAllRouters();

    Backbone.history.start();
    Backbone.history.navigate('index', true);
     
  };

  var initializeAllRouters = function(){

    this.commonRouter = new CommonRouter();

  };

  return {
    initialize: initialize
  };

});
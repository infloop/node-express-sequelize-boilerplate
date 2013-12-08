var logger = require("../../config/logger");

module.exports = function(sequelize, DataTypes) {
  
  var Permission = sequelize.define('permission', {
    
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true
    },

    name: {
    	type : DataTypes.STRING,
    	validate: {
    		notNull: true,
    		notEmpty: true,
    	}
    },
  
  }, {

	validate : {

	},

  instanceMethods: {
  }

  });

  return Permission;

};
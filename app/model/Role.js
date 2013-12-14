var logger = require("../../config/logger");

module.exports = function(sequelize, DataTypes) {
  
  var Role = sequelize.define('role', {
    
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

  return Role;
};

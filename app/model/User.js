var logger = require("../../config/logger");

module.exports = function(sequelize, DataTypes) {
  
  var User = sequelize.define('user', {
    
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true
    },

    username: {
    	type : DataTypes.STRING,
    	validate: {
    		notNull: true,
    		notEmpty: true,
    	}
    },

    password: {
      type : DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    }
  
  }, {

	validate : {

	}

  });

  User.sync({}).error(function(error){
      logger.error(error);
  });

  return User;

};
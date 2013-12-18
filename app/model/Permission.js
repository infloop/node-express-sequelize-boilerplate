var logger = require("../../config/logger");

module.exports = function(sequelize, DataTypes) {

    var Permission = sequelize.define('permission', {

        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true
        },

        httpVerb: {
            type : DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true,
            }
        },

        uri: {
            type : DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true,
            }
        }

    }, {

        validate : {

        },

        instanceMethods: {
        }

    });

    //Permission.sync({force:true});

    return Permission;

};

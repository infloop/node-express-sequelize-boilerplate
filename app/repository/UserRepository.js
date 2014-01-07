/**
 * This module represents a repository for the table user
 * @param {Sequelize} userModel the model created by sequelize
 */

var userModelReference;

module.exports.init = function(userModel) {

    userModelReference = userModel;
    return this;
}

module.exports.getModel = function() {
    return userModelReference;
}

/**
 * finds all results of the user table according to the params offset and limit
 */
module.exports.getAllUsers = function(options, success, error) {

    var opts = {};

    if(options.offset){
        opts.offset = options.offset;
    }

    if(options.limit){
        opts.limit = options.limit;
    }

    var where = {};

    if(options.username){
        where.username = options.username;
    }

    if(options.email){
        where.email = options.email;
    }

    opts.where = where;

    userModelReference.findAndCountAll(opts).success(success).error(error);
}

module.exports.findByUsername = function(username, success, error){
    userModelReference.find({where: {username: username}}).success(success).error(error);
}

module.exports.findById = function(id, success, error){
    userModelReference.find({where: {id: id}}).success(success).error(error);
}

module.exports.updateById = function(id, updatedUser, success, error) {

    //encrypt password if requested
    if(updatedUser.password){	
        var instance = userModel.build();
        var encryptedPassword = instance.encryptPassword(updatedUser.password);
        updatedUser.password = encryptedPassword;
    }

    // update(updated entity, where clause)
    userModelReference.update(updatedUser, {id: id}).success(success).error(error);
}

module.exports.deleteById = function(id, success, error) {
    userModelReference.destroy({id: id}).success(success).error(error);
}

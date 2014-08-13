var bcrypt = require('bcrypt');
var dottie = require('dottie');
var uuid   = require('node-uuid');

var users = [];

var User = function() {

    this._id = 0;
    this.fullName = '';
    this.email = '';

    this.local = {
        password: ''
    };

    this.facebook = {
        id: '',
        token: '',
        name: ''
    };

    this.twitter = {
        id: '',
        token: '',
        displayName: '',
        username: ''
    };

    this.google = {
        id: '',
        token: '',
        name: ''
    };

};

User.prototype.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

User.prototype.save = function(callback) {
    var foundUser = false;
    if ( this._id ) {
        for ( var i=0; i<users.length; i++ ) {
            var user = users[i];
            if ( user._id == this._id ) {
                foundUser = true;
                users[i].email = this.email;
                // ... other fields update
            }
        }
    }
    if (!foundUser) {
        this._id = uuid.v4();
        users.push(this);    
    }
    callback();
};

User.findById = function(id,callback) {
    User.findOne({_id:id},callback);
};

User.findOne = function(query,callback) {
    var key = Object.keys(query)[0];
    var value = query[key];
    var foundUser = false;
    for ( var i=0; i<users.length; i++ ) {
        var user = users[i];    
        var userValue = dottie.get(user,key);
        if ( userValue == value ) {
            foundUser = user;
        }
    }
    callback(null, foundUser);  
};

User.findByEmailOrQuery = function(email,query,callback) {
    var key = Object.keys(query)[0];
    var value = query[key];
    var foundUser = false;
    for ( var i=0; i<users.length; i++ ) {
        var user = users[i];    
        var userValue = dottie.get(user,key);
        if ( userValue == value || user.email == email ) {
            foundUser = user;
        }
    }
    callback(null, foundUser);
};

User.dump = function() {
    console.log(users);
};

module.exports = User;
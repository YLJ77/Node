// Dependencies
let _data = require('./data');
// Define the handlers
let handlers = {};
let helpers = require('./helpers');

// Users
handlers.users = (data, callback)=>{
    let acceptableMethods = ['post', 'get', 'put', 'delete'];
    if (acceptableMethods.indexOf(data.method) > -1) {
        handlers._users[data.method](data, callback);
    } else {
        callback(405);
    }
}

// Container for the users submethods
handlers._users = {};

// Users - post
handlers._users.post = (data, callback)=>{
    // Check that all required fieds are filled out
    let firstName = data.payload.firstName;
    let lastName = data.payload.lastName;
    let phone = data.payload.phone;
    let password = data.payload.password;
    let tosAgreement = data.payload.tosAgreement;

    if (firstName && lastName && phone.trim().length === 10 && password && tosAgreement) {
        // Make sure that the user doesnt already exit
        _data.read('users', phone, (err,data)=>{
            if (err) {
                let hashPassword = helpers.hash(password);
                let userObject = {
                    'firstName': firstName,
                    'lastName': lastName,
                    'phone': phone,
                    'hashPassword': hashPassword,
                    'tosAgreement': tosAgreement
                }

                // Store the user
                _data.create('users',phone,userObject,err=>{
                    if (!err) {
                        callback(200);
                    } else {
                        console.log(err);
                        callback(500,{'Error': 'Could not create the new user'});
                    }
                });
            } else {
                callback(500, {'Error': 'A user with that phone number already exists'});
            }
        });
    } else {
        callback(400, {'Error': 'Missing required fields'});
    } 
} 

// Users - get
// Required data: phone
// Optional data: none
// @TODO Only let an authenticated user access their object. Don't let them acccess anyone else
handlers._users.get = (data, callback)=>{
    // Check that the phone number is valid
    let phone = data.queryStringObject.phone;
    phone = phone && phone.trim().length === 10 ? phone.trim() : false;
    if (phone) {
        // Lookup the user
        _data.read('users',phone,(err,data)=>{
            if (!err && data) {
                // Remove the hashed password from the user object before returning it to the request
                delete data.hashPassword;
                callback(200,data);
            } else {
                callback(404);
            }
        })
    } else {
        callback(400,{'Error': 'Missing required field'});
    }
}

// Users - put
// Required data: phone
// Optional data: firstName, lastName, password (at least one must be specified)
// @TODO Only let an authenticatedticated user update their own object. Don't let them update anyone else's
handlers._users.put = (data, callback)=>{
    // Check for the required field
    let phone = data.payload.phone;
    phone = phone && phone.trim().length === 10 ? phone.trim() : false;

    // Check for the optional fields
    let firstName = data.payload.firstName;
    let lastName = data.payload.lastName;
    let password = data.payload.password;
    
    // Error if the phone is invalid
    if (phone) {
        // Error if nothing is sent to update
        if (firstName || lastName || password) {
            // Lookup the user
            _data.read('users',phone,(err,userData)=>{
                if (!err && userData) {
                    // Update the fields necessary
                    firstName && (userData.firstName = firstName);
                    lastName && (userData.lastName = lastName);
                    password && (userData.hashPassword = helpers.hash(password));
                    // Store the new updates
                    _data.update('users',phone,userData,err=>{
                        if (!err) {
                            callback(200);
                        } else {
                            console.log(err);
                            callback(500, {'Error': 'Could not update the user'});
                        }
                    });
                } else {
                    callback(400,{'Error': 'The specified user does not exist'});
                }
            });
        } else {
            callback(400,{'Error': 'Missing fields to update'});
        }
    } else {
        callback(400,{'Error': 'Missing required field'});
    }
}

// Users - delete
// Require field: phone
// @TODO Only let an authenticated user delete their object. Dont let them delete anyone else's
// @TODO Cleanup (delete) any other data files associated with this user
handlers._users.delete = (data, callback)=>{
    // Check that the phone number is valid
    let phone = data.queryStringObject.phone;
    phone = phone && phone.trim().length === 10 ? phone.trim() : false;
    if (phone) {
        // Lookup the user
        _data.read('users',phone,(err,data)=>{
            if (!err && data) {
                _data.delete('users', phone, err=>{
                    if (!err) {
                        callback(200);
                    } else {
                        callback(500, {'Error': 'Could not delete the specified user'});
                    }
                });
            } else {
                callback(400, {'Error': 'Could not find the specified user'});
            }
        })
    } else {
        callback(400,{'Error': 'Missing required field'});
    }

}

// Ping handler
handlers.ping = (data, callback)=>{
    callback(200);
}

// Not found handler
handlers.notFound = (data, callback)=>{
    callback(404);
}

module.exports = handlers;

// Dependencies
let _data = require('./data');
// Define the handlers
let handlers = {};

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
    let phone = data.payload.phone.trim().length === 10;
    let password = data.payload.password;
    let tosAgreement = data.payload.tosAgreement;

    if (firstName && lastName && phone && password && tosAgreement) {
        // Make sure that the user doesnt already exit
        _data.read('users', phone, (err,data)=>{
            
        });
    } else {
        callback(400, {'Error': 'Missing required fields'});
    }
} 

// Users - get
handlers._users.get = (data, callback)=>{

}

// Users - put
handlers._users.put = (data, callback)=>{

}

// Users - delete
handlers._users.delete = (data, callback)=>{

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

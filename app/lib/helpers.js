/*
 * Helpers for various tasks
 *
 */

// Dependencies
let crypto = require('crypto');
let config = require('../config');

// Container for all the helpers
let helpers = {};

// Create a SHA256 hash
helpers.hash = str=>{
    let hash = crypto.createHmac('SHA256',config.hashingSecret).update(str).digest('hex');
    return hash;
}

// Parse a JSON string to an object in all cases,with throwing
helpers.parseJsonToObject = str=>{
    try {
        return JSON.parse(str);
    } catch(err) {
        return {};
    }
}

module.exports = helpers;

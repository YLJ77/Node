/*
 *Primary file for the API
 *
 */

// Dependencies
let http = require('http');
let url = require('url');
let StringDecoder = require('string_decoder').StringDecoder;
let config = require('./config');


// Define the handlers
let handlers = {};

// Sample handler
handlers.sample = (data, callback)=>{
    // Callback a http status code, and a payload object
    callback(406, {'name': 'sample handler'});
}

// Not found handler
handlers.notFound = (data, callback)=>{
    callback(404);
}

// Define a request router
let router = {
    'sample': handlers.sample
}


// The server should respond to all requests with a string
let server = http.createServer((req,res)=>{

    // Get the URL and parse it
    let parseUrl = url.parse(req.url, true);

    // Get the path
    let path = parseUrl.pathname;
    let trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the query string as an object
    let queryStringObject = parseUrl.query;

    // Get the HTTP Method
    let method = req.method.toLowerCase();

    // Get the headers as an object
    let headers = req.headers;

    // Get the payload, if any
    let decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', data=>{
        buffer += decoder.write(data);
    });
    req.on('end', ()=>{
        buffer += decoder.end();

        // Choose the handler this request should go to. If one is not found, use the notFound handler
        let chosenHandler =  router[trimmedPath] || handlers.notFound;

        // Construct the data object to send to the handler
        let data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': buffer
        }

        // Route the request to the handler specified in the router
        chosenHandler(data, (statusCode, payload)=>{
            // Use the status code called back by the handler, or default to 200 
            statusCode = typeof(statusCode) === 'number' ? statusCode : 200;

            // Use the payload called back by the handler, or default to empty object
            payload = typeof(payload) === 'object' ? payload : {};

            // Convert the payload to a string
            let payloadString = JSON.stringify(payload);

            // Send the response
            res.setHeader('Content-type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);

            console.log('Returning this response: ', statusCode, payload);
        })

    })

});


// Start the server, and have it listen on port 3000
server.listen(config.port,()=>{
    console.log(`The server is listening on port ${config.port} in ${config.envName} mode `);
});



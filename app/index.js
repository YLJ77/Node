/*
 *Primary file for the API
 *
 */

// Dependencies
var http = require('http');
var url = require('url');


// The server should respond to all requests with a string
var server = http.createServer((req,res)=>{

    // Get the URL and parse it
    let parseUrl = url.parse(req.url, true);

    // Get the path
    let path = parseUrl.pathname;
    let trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Send the response
    res.end('Hello World\n');

    // Log the request path
    console.log('Request received on path: '+trimmedPath);
});


// Start the server, and have it listen on port 3000
server.listen(3000,()=>{
    console.log('The server is listening on port 3000');
});

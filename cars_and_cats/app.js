// get the http module:copy
var http = require('http');
// fs module allows us to read and write content for responses!!
var fs = require('fs');
// creating a server using http module:
var server = http.createServer(function (request, response){
    // see what URL the clients are requesting:
    console.log('client request URL: ', request.url);
    // this is how we do routing:

    if(request.url === '/') { // request.method == 'GET'
        fs.readFile('./views/cars.html', 'utf8', function (errors, contents){
            if (errors) { console.log(errors); }
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents);
            response.end();
        });
    }
    else if(request.url === '/cars') {
        fs.readFile('./views/cars.html', 'utf8', function (errors, contents){
            if (errors) { console.log(errors); }
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents);
            response.end();
        });
    }

    else if(request.url === '/cats') {
        fs.readFile('./views/cats.html', 'utf8', function (errors, contents){
            if (errors) { console.log(errors); }
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents);
            response.end();
        });
    }
    else if(request.url === '/cars/new') {
        fs.readFile('./views/cars_new.html', 'utf8', function (errors, contents){
            if (errors) { console.log(errors); }
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents);
            response.end();
        });
    }

    else if(request.url === '/styles/main.css'){
        fs.readFile('./styles/main.css', 'utf8', function(errors, contents){
            if (errors) { console.log(errors); }
            response.writeHead(200, {'Content-type': 'text/css'});
            response.write(contents);
            response.end();
        })
    }    

    else if(request.url === '/images/catt.jpg'){
        // notice we won't include the utf8 encoding
        fs.readFile('./images/catt.jpg', function(errors, contents){
            if (errors) { console.log(errors); }
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents);
            response.end();
        })
    }    
    else if(request.url === '/images/cat2.jpg'){
        // notice we won't include the utf8 encoding
        fs.readFile('./images/cat2.jpg', function(errors, contents){
            if (errors) { console.log(errors); }
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents);
            response.end();
        })
    }    
    else if(request.url === '/images/cat3.jpg'){
        // notice we won't include the utf8 encoding
        fs.readFile('./images/cat3.jpg', function(errors, contents){
            if (errors) { console.log(errors); }
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents);
            response.end();
        })
    }    

    else if(request.url === '/images/lambo.png'){
        // notice we won't include the utf8 encoding
        fs.readFile('./images/lambo.png', function(errors, contents){
            if (errors) { console.log(errors); }
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents);
            response.end();
        })
    }    
    else if(request.url === '/images/ferrari.gif'){
        // notice we won't include the utf8 encoding
        fs.readFile('./images/ferrari.gif', function(errors, contents){
            if (errors) { console.log(errors); }
            response.writeHead(200, {'Content-type': 'image/gif'});
            response.write(contents);
            response.end();
        })
    }    
    else if(request.url === '/images/bugatti.png'){
        // notice we won't include the utf8 encoding
        fs.readFile('./images/bugatti.png', function(errors, contents){
            if (errors) { console.log(errors); }
            response.writeHead(200, {'Content-type': 'image/png'});
            response.write(contents);
            response.end();
        })
    }    

    else { // request didn't match anything:                                        
        response.writeHead(404);
        response.end('File not found!!!');
    }
});
// tell your server which port to run on
server.listen(8000);
// print to terminal window
console.log("Running in localhost at port 8000");
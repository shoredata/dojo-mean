// Load the express module and store it in the variable express 
// (Where do you think this comes from?)
var express = require("express");
// console.log("Let's find out what express is", express);

// invoke express and store the result in the variable app
var app = express();
// console.log("Let's find out what app is", app);

// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views'); 
console.log("views located: " + __dirname + "/views");

// Now lets set the view engine itself so that express knows that we are using ejs 
// as opposed to another templating engine like jade
app.set('view engine', 'ejs');

// this is the line that tells our server to use the "/static" folder for static 
// content
app.use(express.static(__dirname + "/static"));
console.log("static located: " + __dirname + "/static");
// two underscores before dirname
// try printing out __dirname using console.log to see what it is and why we 
// use it

app.get("/cars", function (request, response){
    // hard-coded user data
    var cars_array = [
        {filename: "/images/bugatti.png"}, 
        {filename: "/images/ferrari.gif"}, 
        {filename: "/images/lambo.png"} 
    ];
    response.render('cars', {cars: cars_array});
})
app.get("/cats", function (request, response){
    // hard-coded user data
    var cats_array = [
        {filename: "/images/catt.jpg"}, 
        {filename: "/images/cat2.jpg"}, 
        {filename: "/images/cat3.jpg"} 
    ];
    response.render('cats', {cats: cats_array});
})
app.get("/form", function (request, response){
    // hard-coded user data
    response.render('form', {});
})



// tell the express app to listen on port 8000, always put this at the end 
// of your server.js file
app.listen(8000, function() {
  console.log("listening on port 8000");
})

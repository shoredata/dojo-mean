// require express
var express = require("express");

const axios = require('axios');

var util = require('util');


// path module -- try to figure out where and why we use this
var path = require("path");

// create the express app
var app = express();

// static content
app.use(express.static(path.join(__dirname, "./static")));

// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// root route to render the index.ejs view
app.get('/', function (req, res) {
    console.log("**********\nIndex");

    // swapi.get('http://swapi.co/api/people/').then((result) => {
    //     console.log(result, "A");
    //     // console.log(result.nextPage(), "AA");
    //     // return result.nextPage();
    // }).then((result) => {
    //     console.log(result, "B");
    //     // console.log(result.previousPage(), "BB");
    //     // return result.previousPage();
    // }).then((result) => {
    //     console.log(result, "C");
    // }).catch((err) => {
    //     console.log(err, "D");
    // });

    // var request = require('request');
    // request('http://swapi.co/api/people/', function (error, resp, body) {
    //     if (!error && resp.statusCode == 200) {
    //         console.log("====================================================================================\nbody: " + body); // Print the google web page.
    //         console.log("------------------------------------------------------------------------------------\nresponse: " + resp); // Print the google web page.
    //         for (var obj in resp)
    //         { console.log(resp[obj]); }
    //     }
    // })

    res.render("index", { allpeople: [], allplaces:[] } );
})



var url = "http://swapi.co/api/people/";


function getDetail(apiURL) {
    axios.get(apiURL).then(function (response) {
        showDetail(response.data);
    });
}

var ipersonpage = 0;
var iplacepage = 0;

function showDetail(data) {
    ipersonpage += 1;
    console.log("Person page # " + ipersonpage.toString());
    for (i = 0; i < data.results.length; i++) {
        names = names + data.results[i].name + "\n";
        // name1.innerText = name1.innerText + "\n" + data.results[i].name;
    }
    if (data.next) {
        getDetail(data.next);
    } else {
        console.log(names); // name1.innerText = names;
        console.log("^^^^ PEOPLE COMPLETE ", ipersonpage.toString() + " pages of data...");
    }
}


var names = "";

app.get('/people', function (req, res) {

    // use the axios .get() method - provide a url and chain the .then() and .catch() methods
    axios.get('https://swapi.co/api/people/')
        .then(data => {

            // console.log(util.inspect(data))

            // let jsondata = CircularJSON.stringify(data);
            // log the data before moving on! 
            console.log(data);
            // rather than rendering, just send back the json data!
            // res.json(data);
            res.json(data);
        })
        .catch(error => {
            // log the error before moving on!
            // console.log(error);
            console.log(util.inspect(error))
            res.json(error);
        })


    console.log("^^^^ GETTING PEOPLE ");
    ipersonpage = 0;
    getDetail("https://swapi.co/api/people");

});















// tell the express app to listen on port 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
});


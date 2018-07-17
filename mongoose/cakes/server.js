'use strict'
const express = require('express');
const app = express();
const utils = require("./server/config/utils");
const path = require('path');

require('./server/models'); //invokes /server/models/index.js
require('./server/config/mongoose');
require('./server/config/middleware')(app)
// require('./server/config/routes')(app)
require('./server/config/routes.js')(app)

// app.all("*", (req,res,next) => {
//     res.sendFile(path.resolve("./public/dist/public/index.html"))
// });

app.listen(8000, function () {
	console.log('Cake Ratings Server running on port 8000 ' + utils.formatDate(new Date()));
})
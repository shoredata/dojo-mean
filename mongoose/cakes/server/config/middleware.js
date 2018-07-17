const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
// const session = require("express-session")

module.exports = function(app) {
    'use strict';
	app.use(express.static(__dirname + '/public/dist/public'))
    app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json())
	// app.use(session({secret: "code"}));
	console.log('Middleware initialized');
};

var utils = require('./utils');


var fs = require("fs");
/*
  * initializes all models and sources them as .model-name
*/
console.log("checking " , __dirname);
fs.readdirSync(__dirname).forEach(function(file) {
    if (file !== 'index.js') {
        var moduleName = file.split('.')[0];
        exports[moduleName] = require('./' + moduleName);
    }
});
  
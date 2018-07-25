// initialize all models and sources them as .model-name
var fs = require("fs");
console.log(" Reading Models... " , __dirname);
fs.readdirSync(__dirname).forEach(function(file) {
    if (file !== 'index.js') {
        var moduleName = file.split('.')[0];
        console.log(" Exporting Model: " + moduleName);
        exports[moduleName] = require('./' + moduleName);
    }
});

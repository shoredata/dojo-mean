var schedule = require("node-schedule");
var rule = new schedule.RecurrenceRule();
//rule.minute = 40;
rule.second = 0;
var jj = schedule.scheduleJob(rule, function(){
    console.log("Seconds is 0 - check status..", Date.now());
});

var j1 = schedule.scheduleJob('*/10 * * * * *', function(){
    console.log("Every 10 sec - poll status..", Date.now());
});

// when minutes = 50
var j = schedule.scheduleJob('50 * * * *', function(){
    console.log('Today is recognized by Rebecca Black!');
});


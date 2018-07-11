// TaskSchema ={
//     title: String,
//     completed: { type: Boolean, default: false },
//     description: String,
//     updated_at: { type: Date, default: Date.now },
//     created_at: { type: Date, default: Date.now }
// };

// // restful routing = 7 routes in crud:
// // rooutes starting with api indicate returning json *not* html
// //basic crud routes:
// route         type        function
// =================================
// /api/tasks        get        read all
// /api/tasks/id     get        read 1 
// /api/tasks/id     delete     delete 
// /api/tasks/id     put/patch  update (put replaces, patch updates a piece)
// /api/tasks        post       create 
// /api/tasks        get        new 
// /api/tasks        get        edit 
// /api/tasks        get        index (same as read all ...)

const express = require("express");
const trans = require("./server/routes");
import { router } from "./routes"

const app = express();

app.listen(8000, function() {
    console.log(Array(50).join("*") + "\nLOGIN+REGISTRATION Node Server Listening on Port 8000 .. " + format_date(new Date()));
});


// HELPERS -----------------------------------------------------

function format_date(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
}

exports.formatDate = function(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    var strTime = hours + ':' + minutes + ':' + seconds + " " + ampm;
    return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
}


// exports.isNumeric = function(number) {
//     // validate:     {
//     //     validator: function(e) {
//     //         // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
//     //         // As it currently stands, nameRegex isn't a regex but a string and String doesn't have test functon which is why you are getting that error.
//     //         // Remove the quotes around your regex. That is the literal form of regex.
//     //         // refer to https://gist.github.com/gregseth/5582254
//     //         var email_regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
//     //         // var email_regex_2 = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/;
//     //         // First argument is a boolean, whether validator succeeded
//     //         // 2nd argument is an optional error message override
//     //         console.log("Verifying email via regex");
//     //         return email_regex.test(e);
//     //     },
//     //     message: "email must conform to RFC2822, see gist.github.com/gregseth/5582254"
//     // }

//     return false;
// }

// from here: https://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric
exports.isNumeric = function(value){
    return !isNaN(value - parseFloat(value));
}

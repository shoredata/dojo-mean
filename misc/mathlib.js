module.exports = function (){
    return {
        add: function(num1, num2) { 
            // add code here 
            console.log("add: ", num1, num2, num1 + num2);
            return num1 + num2;
        },
        multiply: function(num1, num2) {
            // add code here 
            console.log("multiply: ", num1, num2, num1 * num2);
            return num1 * num2;
        },
        square: function(num) {
            // add code here 
            console.log("square: ", num, num * num);
            return num * num;
        },
        random: function(num1, num2) {
            // add code here
            var rnd = Math.floor(Math.random() * num2) + num1;
            console.log("random: ", num1, num2, rnd);
            return rnd;
        }
    }
};
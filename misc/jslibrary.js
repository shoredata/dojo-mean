var _ = {
    // map: function (args, callback) {
    //     //code here;
    //     console.log("map");
    //     console.log(args, callback);
    //     // callback.apply(this, args);
    //     console.log(callback.apply(this, args));
    // },
    map: function (obj, iteratee, context) {
        iteratee = cb(iteratee, context);
        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length,
            results = Array(length);
        for (var index = 0; index < length; index++) {
            var currentKey = keys ? keys[index] : index;
            results[index] = iteratee(obj[currentKey], currentKey, obj);
        }
        return results;
    },
    reduce: function () {
        // code here;
        console.log("reduce");
    },
    find: function () {
        // code here;
        console.log("find");
    },
    filter: function () {
        // code here;
        console.log("filter");
    },
    reject: function () {
        // code here;
        console.log("reject");
    }
}
// you just created a library with 5 methods!


var evens = _.filter([1, 2, 3, 4, 5, 6], function (num) { return num % 2 == 0; });
console.log(evens); // if things are working right, this will return [2,4,6].


function myFunc(args, callback) {
    //do stuff
    //...
    //execute callback when finished
    callback.apply(this, args);
}

function eat(food1, food2) {
    console.log("I like to eat " + food1 + " and " + food2);
}
var food = ["pickles", "peanut butter"];
//alerts "I like to eat pickles and peanut butter"
// myFunc(eat, food); 
// _.map(food, eat);

_.map([1, 2, 3], function (num) { return num * 3; });


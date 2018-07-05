// Binary Search
// Objectives:
// Familiarity with binary search, a method of searching that greatly reduces the 
// time needed to find a value in a sorted array.
// Given an array of sorted numbers and a value (also a number), return whether the 
// array contains that value. Return the index position of the value if it exists and -1 if it does not exist. 

// Do not sequentially iterate through the array. Take advantage of the fact that 
// the array is sorted and use a 'divide and conquer' technique. Very similar to when 
// we are searching for a word in a dictionary (the book kind) we may: 

// Start our search in the center and determine whether we need to search the back half or the front half. 
// Choose a spot around the center of the half of the array we still need to search.
// From here, determine which quarter of the array we still need to search. 
// In this way our search is very rapidly narrowed until we find out whether the value 
// we are searching for is in the array or not.
// Example: binarySearch([1, 3, 8, 10, 12, 15, 17, 20, 22, 34, 38, 40, 50, 52, 
//     78, 87, 90, 91, 92, 94, 200], 93) returns -1 and should only take about 4 iterations.

// Example: binarySearch([1, 3, 8, 10, 12, 15, 17, 20, 22, 34, 38, 40, 50, 52, 
//     78, 87, 90, 91, 92, 94], 15)returns 5.

// BONUS: What is the Big O time complexity of binary search?

// BONUS: If you solved this problem with recursion (if your function is calling itself), 
// solve it without recursion. Otherwise, solve it again with recursion.

function binarySearchIterative(arr, val) {
    var min = 0, max = arr.length-1, mid = Math.floor(arr.length/2);
    while (min < max) {
        console.log("check", min, mid, max);
        if (arr[mid] == val) { return true; }
        else if ( val < arr[mid] ) { max = mid - 1; }
        else { min = mid + 1; }
        mid = min + Math.floor((max - min)/2);
    }
    return false;
}
console.log(binarySearchIterative([1, 3, 8, 10, 12, 15, 17, 20, 22, 34, 38, 40, 50, 52, 78, 87, 90, 91, 92, 94, 200], 93));
console.log(binarySearchIterative([1, 3, 8, 10, 12, 15, 17, 20, 22, 34, 38, 40, 50, 52, 78, 87, 90, 91, 92, 94], 15));
console.log(binarySearchIterative([2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97],67));


// function factorial(num) {
//     var nextNum = num - 1;
//     // Base case
//     if (num === 1) {
//         return num; // return 1;
//     }
//     return num * factorial(nextNum);
// }
// factorial(5);      // 120


function binarySearchRecursive(arr, val, min = 0, max = arr.length-1, mid = Math.floor(arr.length/2)) {
    console.log("rcheck", min, mid, max);
    if (arr[mid] == val) 
        { return true; }
    else if ( val < arr[mid] ) 
        { max = mid - 1; }
    else 
        { min = mid + 1; }
    mid = min + Math.floor((max - min)/2);
    if (min <= max ) 
        { return binarySearchRecursive(arr, val, min, max, mid); }
    else 
        { return false; }
}

console.log(binarySearchRecursive([1, 3, 8, 10, 12, 15, 17, 20, 22, 34, 38, 40, 50, 52, 78, 87, 90, 91, 92, 94, 200], 93));
console.log(binarySearchRecursive([1, 3, 8, 10, 12, 15, 17, 20, 22, 34, 38, 40, 50, 52, 78, 87, 90, 91, 92, 94], 15));
console.log(binarySearchRecursive([2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97],67));

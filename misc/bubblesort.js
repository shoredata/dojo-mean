// // Bubble Sort
// // Objectives:
// // Familiarity with nested loops.
// // Familiarity with a classic sorting algorithm.
// // Google CEO Eric Schmidt once asked Senator Barack Obama what the best way to sort a million 32-bit integers would be. Obama responded with,

// // "I think the bubble sort would be the wrong way to go."
// // Maybe it isn't the most efficient sort out there, but there are times when it is an appropriate choice!

// // This gif demonstrates how it works to sort an array of numbers:


// // It's called Bubble Sort because we can imagine we are sliding a bubble along the array. 

// // The bubble encompasses two neighboring values. 
// // If the larger number is to the left, we swap those values. 
// // Then we slide the bubble over one position. 
// // Once the bubble reaches the end of the array, we know that the largest value is in its 
// proper position. 
// // We can then repeat the process for all the values except for the last value, since we know that 
// it is already in place. 
// // And then we'll do it again, and again, and again, until we know all values are in their proper 
// positions.

// // BONUS 1: Imagine you had to watch the gif above sort an array with 8000 elements - 1000x more 
// elements than it currently has. How long would that take? Would it take 1000 times longer? No, much 
// much worse! It would take 1000^2 times longer, or 1,000,000 times longer! But what if the array was 
// already sorted, or very close to sorted? Bubble sort has the advantage that we may simultaneously 
// detect whether the array is already sorted as we're sorting. If so, we may terminate the algorithm 
// early. This is known as a fast exit. Implement a fast exit in your bubble sort.

// // BONUS 2: Big O Notation is how we express the time and space complexities of our algorithms. 
// Big O is used to describe the worst case scenario of the algorithm - for example, the absolute maximum 
// amount of time required to run the algorithm. However, we cannot put a number on how long the algorithm 
// would take. The actual time required would be dependent on the inputs provided and the hardware being 
// used to run the algorithm. What we can do is describe how the time or space required would change 
// depending on the inputs. The Big O Time complexity of this algorithm is O(n^2) (read as "O of n squared"). 
// This means that as the array provided gets longer, the amount of time required will increase exponentially. 
// That's not very good and is why the bubble sort is often scorned. Only under special circumstances may we 
// do a fast exit and possibly complete in just O(n) time, meaning the time required only increases 
// linearly with the length of the array provided. Take some time to research O(1), O(N), O(N^2), and 
// O(log N). 

// Classify each of the following functions according to their Big O Time complexity:

function printArray(arr){
    for(var i=0; i<arr.length; i++){
        console.log(arr[i]);
    }
}
// O(n)

function findNth(arr, n){
    console.log(arr[n]);
}
// O(1)

function halving(n){
    var count = 0;
    while(n > 1){
        n = n/2;
        count++;
    }
    return count;
}
// O(log(n))

function identityMatrix(n){
    var matrix = [];
    for(var i=0; i < n; i++){
        var row = [];
        for(var j=0; j < n; j++){
            if(j == i){
                row.push(1);
            }
            else{
                row.push(0);
            }
        }
        matrix.push(row);
    }
    return matrix;
}
// O(N^2)
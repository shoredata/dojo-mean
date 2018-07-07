// from here:
// https://www.nczonline.net/blog/2012/11/27/computer-science-in-javascript-quicksort/

function swap(arr, i1, i2) {
    var tmp = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = tmp;
}
function part(arr, left, right) {
    var pivot = arr[Math.floor((right + left) / 2)],
        i = left,
        j = right;
    while (i <= j) {
        while (arr[i] < pivot) { i++; }
        while (arr[j] > pivot) { j--; }
        if (i <= j) {
            swap(arr, i, j);
            i++;
            j--;
        }
    }
    return i; // the platform said to return j and they are fucked
}

function quicksort(array, i, j) {
    var index;
    console.log("qs:", i, j)
    if (array.length > 1) {
        index = part(array, i, j);
        if (i < index - 1){
            quicksort(array, i, index-1); }
        if (index < j) {
            quicksort(array, index, j); }
    }
    return array;
}

// For this array, the pivot is the value 8.
// Notice that the values are not sorted, but everything to the left of 8 is smaller than 8.
// Everything to the right is larger than 8.
var ar1 = [1, 4, 2, 7, 6, 3, 8, 20, 9, 15, 12, 10, 30];
console.log(quicksort(ar1, 0, ar1.length-1));

// For this array, the pivot is the value 3.
// Notice that the pivot may be placed anywhere in the array, not necessarily in the center.
var ar2 = [1, 3, 5, 4, 8, 30, 20, 17, 7];
console.log(quicksort(ar2, 0, ar2.length-1));


// output::
// =============================================================
// [nodemon] starting`node quicksort.js`
// qs: 0 12
// qs: 0 6
// qs: 0 4
// qs: 0 1
// qs: 2 4
// qs: 3 4
// qs: 5 6
// qs: 7 12
// qs: 7 9
// qs: 8 9
// qs: 10 12
// qs: 10 11
// [1, 2, 3, 4, 6, 7, 8, 9, 10, 12, 15, 20, 30]
// qs: 0 8
// qs: 0 4
// qs: 0 2
// qs: 0 1
// qs: 3 4
// qs: 5 8
// qs: 5 6
// qs: 7 8
// [1, 3, 4, 5, 7, 8, 17, 20, 30]
// [nodemon] clean exit - waiting for changes before restart
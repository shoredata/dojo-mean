// Min heap - insert
// Objectives:
// Implement a min heap
// Be able to insert values into a min heap
// A min heap is an array, but it is organized just enough so that we always know that the minimum value is at index 1. 
// Do not place anything at index 0. 

// Create a function that accepts an array and a value. 
// Assuming that the array is either an empty array or a valid min heap, 
// insert the value into the array so that it remains a valid min heap.

// Remember these steps, as shown in the diagram in the previous module:

// Check if the array is empty and never place anything at index 0.
// Push the new value into the array.
// You should be able to determine the index where the value was placed.
// Determine what the parent value is.
// Compare the parent value and the inserted value.
// If the inserted value is not greater than the parent, swap the two values.
// Repeat steps 3 and 4 until the inserted value is either greater than its parent or is at at the top of the heap (which is index 1).



// sample outputs:
// insertIntoHeap([], 13);  // alters the empty array to be [undefined, 13]
// insertIntoHeap([undefined, 3, 8, 10, 11, 9, 20, 14], 7); // alters the array to [undefined, 3, 7, 10, 8, 9, 20, 14, 11]
// BONUS: Use object oriented programming for this assignment. Write an object constructor for a heap and make the insert method.

'use strict';
var BinaryHeap = function () {
    this.list = [];
};

BinaryHeap.prototype.print = function() {
    console.log(this.list);
}

BinaryHeap.prototype.buildHeap = function (values) {
    var nodeArray = [];
    for (var i = 0; i < values.length; i++) {
        nodeArray.push(new Node(values[i]));
    }
    buildHeapFromNodeArray(this, nodeArray);
};

function buildHeapFromNodeArray(heap, nodeArray) {
    heap.list = nodeArray;
    for (var i = Math.floor(heap.list.length / 2); i >= 0; i--) {
        heapify(heap, i);
    }
}

// function buildHeapFromRandomNodeArray(heap, nodeArray) {
//     heap.list = nodeArray;
//     for (var i = heap.list.length-1; i >= 0; i--) {
//         heapify(heap, i);
//     }
// }


BinaryHeap.prototype.clear = function () {
    this.list.length = 0;
};

  


BinaryHeap.prototype.insert = function (value) {
    var i = this.list.length;
    var node = new Node(value);
    this.list.push(node);
    var parent = getParent(i);
    while (typeof parent !== 'undefined' &&
        this.compare(this.list[i], this.list[parent]) < 0) {
        swap(this.list, i, parent);
        i = parent;
        parent = getParent(i);
    }
    return node;
};



BinaryHeap.prototype.compare = function (a, b) {
    if (a.value > b.value) {
        return 1;
    }
    if (a.value < b.value) {
        return -1;
    }
    return 0;
};


function heapify(heap, i) {
    var l = getLeft(i);
    var r = getRight(i);
    var smallest = i;
    if (l < heap.list.length &&
        heap.compare(heap.list[l], heap.list[i]) < 0) {
        smallest = l;
    }
    if (r < heap.list.length &&
        heap.compare(heap.list[r], heap.list[smallest]) < 0) {
        smallest = r;
    }
    if (smallest !== i) {
        swap(heap.list, i, smallest);
        heapify(heap, smallest);
    }
}
  

function buildHeapFromNodeArray(heap, nodeArray) {
    heap.list = nodeArray;
    for (var i = Math.floor(heap.list.length / 2); i >= 0; i--) {
        heapify(heap, i);
    }
}
  

function swap(array, a, b) {
    var temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}
  
function getParent(i) {
    if (i === 0) {
        return undefined;
    }
    return Math.floor((i - 1) / 2);
}
  
function getLeft(i) {
    return 2 * i + 1;
}
  
function getRight(i) {
    return 2 * i + 2;
}
  
function Node(value) {
    this.value = value;
}
    


BinaryHeap.prototype.extractMinimum = function () {
    if (!this.list.length) {
        return undefined;
    }
    if (this.list.length === 1) {
        return this.list.shift();
    }
    var min = this.list[0];
    this.list[0] = this.list.pop();
    heapify(this, 0);
    return min;
};

BinaryHeap.prototype.findMinimum = function () {
    return this.isEmpty() ? undefined : this.list[0];
};
  
BinaryHeap.prototype.isEmpty = function () {
    return !this.list.length;
};
  
BinaryHeap.prototype.size = function () {
    return this.list.length;
};


  
var h1 = new BinaryHeap();

h1.insert(13);  // alters the empty array to be [undefined, 13]
h1.print();
h1.buildHeap([3, 12, 8, 11, 9, 20, 14, 7]); // alters the array to [undefined, 3, 7, 10, 8, 9, 20, 14, 11]
h1.print();
console.log(h1.extractMinimum());
h1.print();
h1.buildHeap([8]);
console.log(h1.extractMinimum());
h1.print();

h1.buildHeap([20, 3, 8, 14, 9, 6, 2]);
h1.print();

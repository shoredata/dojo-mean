// Binary Search Trees
// ===================

// (Note: binary search trees are often implemented to not allow duplicate values. 
//     If you have a need to store duplicate values in your binary search tree, you may 
//     decide whether values of equal value should go to the left or to the right. 
//     At Coding Dojo, we generally put values of equal value to the right.)

// These are our basic object constructors:

// function BST(){
//     this.root = null;    // the root attribute will be assigned to a node later
// }
// function Node(val){
//     this.value = val;   // the value attribute will be assigned based on user input when a node is instantiated
//     this.left = null;   // the left attribute will be assigned to a node later
//     this.right = null;  // the right attribute will be assigned to a node later
// }
// In order to make an instance of a binary search tree, we'll need to invoke the BST object constructor. 
// Don't forget the new keyword! We can then instantiate a node and assign it to the tree's root attribute. 
// However, this would be incredibly tedious to do for very long. 
// It would be much better to write an insert method that we can call upon to add our nodes for us!

// var first = new BST();      // make an instance of a BST and store it in a variable
// first.root = new Node(30);  // assign our instance's root attribute to an instance of a node
// // but wouldn't it be nicer to be able to call a method that would do this for us?

// from here:
// https://www.geeksforgeeks.org/implementation-binary-search-tree-javascript/

// also here:
// https://khan4019.github.io/front-end-Interview-Questions/bst.html    

class Node {
    constructor (val) {
        this.value = val;   // the value attribute will be assigned based on user input when a node is instantiated
        this.left = null;   // the left attribute will be assigned to a node later
        this.right = null;  // the right attribute will be assigned to a node later
    }
}
class BinarySearchTree {
    constructor () {
        this.root = null;    // the root attribute will be assigned to a node later
    }

    getRoot() {
        return this.root;
    }

    insertNode(node, newNode) {
        if (newNode.value < node.value){
            if (node.left === null) {
                node.left = newNode;
            }
            else{
                this.insertNode(node.left, newNode);
            }
        }
        else{
            if (node.right === null) {
                node.right = newNode;
            }
            else{
                this.insertNode(node.right, newNode);
            }
        }
    }

    insert(val) {
        let node = new Node(val);
        if (this.root === null) {
            this.root = node;
        }
        else{
            //start at root, find node insertion point
            this.insertNode(this.root, node);
        }
    }

    findMinNode(node)
    {
        // if left of a node is null it must be minimum
        if(node.left === null)
            return node;
        else
            return this.findMinNode(node.left);
    }
    
    remove(value) {
        this.root = this.removeNode(this.root, value);
    }
    removeNode(node, value){
        if (node === null) {
            return null;
        }
        else if (value < node.value) {
            node.left = this.removeNode(node.left, value);
            return node;
        }
        else if (value > node.value) {
            node.right = this.removeNode(node.right, value);
            return node;
        }
        else{
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }
            else if (node.left === null) {
                node = node.right;
                return node;
            }
            else if (node.right === null) {
                node = node.left;
                return node;
            }
            else {
                // Deleting node with two children
                var temp = this.findMinNode(node.right);
                node.value = temp.value;
                node.right = this.removeNode(node.right, temp.value);
                return node;            
            }
        }
    }

    preOrder(node)
    {
        if(node != null)
        {
            console.log(node.value);
            this.preOrder(node.left);
            this.preOrder(node.right);
        }
    }

    inOrder(node)
    {
        if(node !== null)
        {
            this.inOrder(node.left);
            console.log(node.value);
            this.inOrder(node.right);
        }
    }

    postOrder(node)
    {
        if(node != null)
        {
            this.postOrder(node.left);
            this.postOrder(node.right);
            console.log(node.value);
        }
    }

    height(node){
        if(node===null) {
            return 0; 
        }
        else {
            var lHeight = this.height(node.left);
            var rHeight = this.height(node.right);
            return Math.max(lHeight, rHeight) + 1;
        }
    }
     
}



// create an object for the BinarySearchTree
var BST = new BinarySearchTree();
 
console.log("\ninserts ..");
// Inserting nodes to the BinarySearchTree
BST.insert(15);
BST.insert(25);
BST.insert(10);
BST.insert(7);
BST.insert(22);
BST.insert(17);
BST.insert(13);
BST.insert(5);
BST.insert(9);
BST.insert(27);
console.log("Height: " + BST.height(BST.getRoot()));
                         
//          15
//         /  \
//        10   25
//       / \   / \
//      7  13 22  27
//     / \    /
//    5   9  17 
 
// var root = BST.getRoot();
             
// prints 5 7 9 10 13 15 17 22 25 27
BST.inOrder(BST.getRoot());
             


console.log("\nremove 5 ..");
// Removing node with no children 
BST.remove(5);
             
             
//          15
//         /  \
//        10   25
//       / \   / \
//      7  13 22  27
//       \    /
//        9  17 
             
                         
// var root = BST.root;
             
// prints 7 9 10 13 15 17 22 25 27
BST.inOrder(BST.getRoot());
             


console.log("\nremove 7 ..");
// Removing node with one children 
BST.remove(7);
             
//          15
//         /  \
//        10   25
//       / \   / \
//      9  13 22  27
//            /
//           17 
             
             
// var root = BST.root;
 
// prints 9 10 13 15 17 22 25 27
BST.inOrder(BST.getRoot());
             



console.log("\nremove 15 ..");
// Removing node with two children 
BST.remove(15);
     
//          17
//         /  \
//        10   25
//       / \   / \
//      9  13 22  27
 
// var root = BST.root;
BST.inOrder(BST.getRoot());


console.log("\ninorder traversal");
// prints 9 10 13 17 22 25 27
BST.inOrder(BST.getRoot());
             
console.log("\npostorder traversal");
BST.postOrder(BST.getRoot());

console.log("\npreorder traversal");
BST.preOrder(BST.getRoot());

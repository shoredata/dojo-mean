function HashMap() {
    return;
}
// Hash map - insert
// Objectives:
// Implement a hash map.
// Create a function that will mimic the process of creating a hash map. 

// We will use an array to store our key-value pairs. We first need to set the capacity of this array, which we may do by defining its length.

// var hashMap = [];
// hashMap.length = 30;  // set the capacity by defining the length of the array
// Given a key, a value, and the array we are using for our hash map, the function should hash the key and mod it based on the array's length. Add a 2-element array containing  the key and the value to the nested array at the index determined by modding the hash.

// We may use prototype to give all strings the ability to generate their hash code with the following code:

// String.prototype.hashCode = function(){
//     var hash = 0;
//     if(this.length == 0){
//         return hash;
//     }
//     for(i=0; i<this.length; i++){
//         var char = this.charCodeAt(i);
//         hash = ((hash<<5)-hash) + char;  // bitwise operators are used to manipulate the string in binary
//         hash &= hash;                
//     }
//     return hash;                         // by the end of the loop, the hash is unique to this string
// }
// // Now, when we need a particular string's hash code, we may call its hashCode method, which we just created
// var hashedKey = "role".hashCode();
// The above code uses the << and &= operators, which are known as bitwise operators. Bitwise operators perform their operations on the binary representations of the arguments passed to them. You may read more about bitwise operators here.

// After generating a hash code, we will need to mod it so that we can generate an index position that is within the capacity we set for our array. With the following function, we may pass the given hash code and the capacity of the array, and it will return a number within the capacity.

// function mod(input, div){
//     return (input % div + div) % div;
// }
// // use the function to get the index position where we should store our data
// var idx = mod(hashedKey, hashMap.length);
// Remember that each key may only be used once. With any key-value pairs, if we assign a value to a key that does not exist, then the key will be created. If the key already exists, then the key will be reassigned to the new value.

// Do not alter the capacity of the array once it is set. In other words, you may not use the .push() or .pop() methods with this array anymore. Altering the capacity would result in different results by hashing and modding the keys and would make look-up impossible.
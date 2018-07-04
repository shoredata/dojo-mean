var tigger = { character: "Tigger" }; // start with just the character attribute

var pooh = { character: "Winnie the Pooh" };
tigger.north = pooh; // add more attributes, where we are actually storing the memory location for the other object
pooh.south = tigger;

var piglet = { character: "Piglet"};        // create Piglet's home object with just the character attribute
piglet.east = tigger.north;          // Piglet's east attribute is Tigger's north attribute, which is a memory address
tigger.north.west = piglet;          // Follow Tigger's north attribute to a location in memory
// Assign that object's west attribute to piglet

var bees = { character: "bees"};
bees.west = pooh;
bees.west.west = piglet;
bees.north = rabbit;

var gopher = { character: "gopher"};
var rabbit = { character: "rabbit"};
var chris = { character: "Christopher Robin"};
var owl = { character: "owl"};
var kanga = { character: "kanga"};
var eeyore = { character: "eeyore"};
var heffalumps = { character: "heffalumps"};


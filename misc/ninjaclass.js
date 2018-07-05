// Assignment: Ninja Class
// Create a new object constructor called Ninja with the following attributes:

// name
// health
// speed (private)
// strength (private)
// Speed and strength should be 3 by default. Health should be 100 by default.

// Ninja should have the following methods:

// sayName() - This should log that Ninja's name to the console.
// showStats() - This should show the Ninja's name, strength, speed, and health.
// drinkSake() - This should add +10 Health to the Ninja
// Example Outputs
// var ninja1 = new Ninja("Hyabusa");
// ninja1.sayName();
// // -> "My ninja name is Hyabusa!"
// ninja1.showStats();
// // -> "Name: Hayabusa, Health: 100, Speed: 3, Strength: 3"

function Ninja(name) {
    // create a private variable that stores a reference to the new object we create
    var self = this;
    this.name = name;
    this.health = 100;
    var speed = 3;      // private 
    var strength = 3;   // private
    this.sayName = function() {
        console.log(this.name);
        return this;
    };
    this.showStats = function() {
        console.log(this.name, strength, speed, this.health);
        return this;
    };
    this.drinkSake = function(health) {
        addhealth(health);
        return this;
    };
    this.getPunched = function(health) {
        addhealth(-1 * health);
        return this;
    };
    var addhealth = function(addToHealth) {
        // private method, use SELF.
        console.log("Adding " + addToHealth.toString() + " to self.health.");
        self.health += addToHealth;
    }
}


// var ninja1 = new Ninja("Hyabusa");
// ninja1.sayName();
// // -> "My ninja name is Hyabusa!"
// ninja1.showStats();
// // -> "Name: Hayabusa, Health: 100, Speed: 3, Strength: 3"
// ninja1.drinkSake(15);
// ninja1.showStats();

// After we create our MyObjConstructor:
Ninja.prototype.punch = function(ninja) {
    if (ninja instanceof Ninja) {
        var inj = Math.floor(Math.random() * 10) + (5);
        ninja.getPunched(inj)
        console.log(ninja.name + " was punched by " + this.name + " and lost " + inj.toString() + " health!")
        ninja.showStats();
        return this;
        }
    else {
        console.log("NOPE: ", typeof(ninja));
        return;
    }
}

Ninja.prototype.kick = function(ninja) {
    if (ninja instanceof Ninja) {
        var inj = Math.floor(Math.random() * 10) + (15);
        ninja.getPunched(inj)
        console.log(ninja.name + " was kicked by " + this.name + " and lost " + inj.toString() + " health!")
        ninja.showStats();
        return this;
        }
    else {
        console.log("NOPE: ", typeof(ninja));
        return;
    }
}
  

var blueNinja = new Ninja("Goemon");
var redNinja = new Ninja("Bill Gates");
redNinja.punch(blueNinja);
// -> "Goemon was punched by Bill Gates and lost 5 Health!"

blueNinja.kick(redNinja);
// -> "Bill Gates was kicked by Goemon and lost 15 Health!"
// In this case, redNinja Bill Gates lost 15 health because blueNinja Goemon has 1 point of strength

// Update .punch() and .kick() so that they only accept Instances of Ninja. 
// Hint: You will need to find a way to check the constructor of an instance. 
// You will often need to consult outside documentation to find solutions for particular features.
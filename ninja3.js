// Assignment: Ninja Class III

// Part I
// =========
// Recreate the base Ninja class from scratch using ES6 classes. 
//
// Your Ninja needs the following public attributes (do not worry about private variables for this assignment):
//
// name
// health
// speed
// strength
// Speed and strength should be 3 by default. Health should be 100 by default.
//
// The Ninja class should have the following methods:
//
// sayName() - This should log that Ninja's name to the console.
// showStats() - This should show the Ninja's name, strength, speed, and health.
// drinkSake() - This should add +10 health to the Ninja
//
//
// Part II - Sensei Class
// =======================
// Extend the Ninja class and create the Sensei class. 
// A Sensei should have 200 Health, 10 speed, and 10 strength by default. 
// In addition, a Sensei should have a new attribute called wisdom, and the default should be 10. 
// Finally, add the speakWisdom() method. speakWisdom() should call the drinkSake() method from the Ninja class, 
// before console.logging a wise message.


// // example output
// const superSensei = new Sensei("Master Splinter");
// superSensei.speakWisdom();
// // -> "What one programmer can do in one month, two programmers can do in two months."
// superSensei.showStats();
// // -> "Name: Master Splinter, Health: 210, Speed: 10, Strength: 10"


// Examples:
//
// Class Methods vs Instance Methods
// ====================================
// In ES6, class methods are called 'static methods' while instance methods are called 'prototype methods'. 
// We've already seen prototype methods, now let's look at a static method. 
// Let's say we want to add a new function to the class Dot, not an instance of a Dot:
//
// class Dot {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//     }
//     // prototype method
//     showLocation() {
//         console.log(`This Dot is at x ${this.x} and y ${this.y}`);
//     }
//     // static method
//     static getHelp() {
//         console.log("This is a Dot class, for created Dots! A Dot takes x and y coordinates, type 'new Dot' to create one!");
//     }
// } 
// const dot3 = new Dot(4, 2);
// // we can see showLocation from our instance...
// console.log(dot3.showLocation);
// // but we can't see getHelp
// console.log(dot3.getHelp);
// // however we can call getHelp this way:
// Dot.getHelp();
//
// ^^^ Here we added a static method called getHelp(). This means that getHelp() is accessible from the Class, not the instance.


class Ninja {
    constructor(name, health=100, speed=3, strength=3) {

        this.name = name;
        this.health = health;
        this.speed = speed;
        this.strength = strength;
    }
    // prototype methods
    sayName() {
        console.log(this.name);
    };
    showStats() {
        console.log(this.name, this.health, this.speed, this.strength);
    };
    drinkSake() {
        var addtohealth = Math.floor(Math.random() * 10) + 10;
        this.health += addtohealth;
        console.log(this.name, addtohealth, this.health);
    };
    // static methods = none
};

class Sensei extends Ninja {
    constructor(name) {
        super(name, 200, 10, 10)
        this.wisdom = 10;
    }
    speakWisdom() {
        console.log(this.name, "is WISE");
        super.drinkSake();
    }
}


const superSensei = new Sensei("Master Splinter");
superSensei.sayName();
superSensei.speakWisdom();
// -> "What one programmer can do in one month, two programmers can do in two months."
superSensei.showStats();
// -> "Name: Master Splinter, Health: 210, Speed: 10, Strength: 10"

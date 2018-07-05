var my_module = require('./mathlib')();
// those ending upper parens are fucking stupid, 
//  but they do indicate that we are importing a function
my_module.add(1,5);
my_module.multiply(1,5);
my_module.square(1,5);
my_module.random(1,5);

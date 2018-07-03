function bracesvalid(string) {
    // Braces Valid
    // Objectives:
    // Exercise those logic muscles!
    // Use data structures (arrays, objects) effectively to complete the challenge.
    // Given a string, write a function that will determine whether the braces  - 
    // including parentheses (), square brackets [], and curly brackets {} - within the string 
    // are valid. That means that any braces within other braces must close before the outer set closes.

    // HINT: Keep in mind that you may use arrays and objects to keep your information organized!

    // Example: bracesValid("{{()}}[]") returns true because the inner braces close before the outer 
    // braces. Each opening brace has a matching closing brace.

    // Example:  bracesValid("{(})") returns false because the curly braces close before the parentheses, 
    // which starts within the curly braces, had a chance to close.

    var previous = "";
    var loc = string;
    while (loc.Length != previous.Length)
    {
        previous = loc;
        loc = loc
            .Replace("()", String.Empty)
            .Replace("[]", String.Empty)
            .Replace("{}", String.Empty);                
    }
    return (loc.Length == 0);
}

var stest = "{([)([}}]}";
console.log(stest + " = " + bracesvalid(stest));
stest = "())";
console.log(stest + " = " + bracesvalid(stest));
stest = "({[]})";
console.log(stest + " = " + bracesvalid(stest));
stest = "(()()()())(((()))))";
console.log(stest + " = " + bracesvalid(stest));
stest = "}{";
console.log(stest + " = " + bracesvalid(stest));
stest = "{[}]";
console.log(stest + " = " + bracesvalid(stest));

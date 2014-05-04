 var lookupTable = new Object();
 var stack;
 // uncomment next line to enable refresh
 //PLT.refresh = true

 // write helper functions and semantics here
 var Munch = {
   dictionary: {

     'circle': function (stack) {
       var name = stack.pop();
       lookupTable[name] = new circle();
       return stack;
     },

     'triangle': function (stack) {
       var name = stack.pop();
       lookupTable[name] = new triangle();
       return stack;
     },

     'rectangle': function (stack) {
       var name = stack.pop();
       lookupTable[name] = new rectangle();
       return stack;
     },

     'y': function (stack) {
       var obj = stack.pop();
       var objY = [];
       for (var i = 0; i < obj.path.length; i++) {
         objY.push(obj.path[i][1]);
       }
       stack.push(objY);
       return stack;
     },

     'x': function (stack) {
       var obj = stack.pop();
       var objX = [];
       for (var i = 0; i < obj.path.length; i++) {
         objX.push(obj.path[i][0]);
       }
       stack.push(objX);
       return stack;
     },

     'position': function (stack) {
       var obj = stack.pop();
       if (obj instanceof curvyLine) {
         var objPos = new pos();
         for (var i = 0; i < obj.path.length; i++) {
           objPos.push(obj.path[i]);
         }
         stack.push(objPos);
       } else if (obj instanceof pos) {
         var whom = stack.pop();
         whom.position = obj;
       }
       return stack;
     },

     'def': function (stack) {
       var name = stack.pop();
       var value = stack.pop();
       Munch.dictionary[name] = value;
       return stack;
     },

     'if': function (stack) {
       var quot = stack.pop();
       var num = stack.pop();
       if (num !== 0) {
         // if the number is not zero, evaluate the quotation given the current stack
         stack = Munch.eval(quot, stack);
       }
       return stack;
     },

     '+': function (stack) {
       var a = stack.pop();
       var b = stack.pop();
       stack.push(a + b);
       return stack;
     },

     '-': function (stack) {
       var a = stack.pop();
       var b = stack.pop();
       stack.push(a - b);

       return stack;
     },

     '*': function (stack) {
       var a = stack.pop();
       var b = stack.pop();
       stack.push(a * b);

       return stack;
     },

     '/': function (stack) {
       var a = stack.pop();
       var b = stack.pop();
       stack.push(a / b);

       return stack;
     },

     '÷': function (stack) {
       var a = stack.pop();
       var b = stack.pop();
       stack.push(a / b);
       return stack;
     },

     ' "pi" ': function (stack) {
       stack.push(Math.PI);
       return stack;
     },

     'dup': function (stack) {
       var a = stack.pop();
       stack.push(a);
       stack.push(a);
       return stack;
     },

     'swap': function (stack) {
       var a = stack.pop();
       var b = stack.pop();
       stack.push(a);
       stack.push(b);
       return stack;
     },

     '>': function (stack) {
       var a = stack.pop();
       var b = stack.pop();
       if (b > a) {
         stack.push(true);
       } else {
         stack.push(false);
       }
       return stack;
     },

     '<': function (stack) {
       var a = stack.pop();
       var b = stack.pop();
       if (b < a) {
         stack.push(true);
       } else {
         stack.push(false);
       }
       return stack;
     },

     '=': function (stack) {
       var a = stack.pop();
       var b = stack.pop();
       if (b === a) {
         stack.push(true);
       } else {
         stack.push(false);
       }
       return stack;
     },

     'random': function (stack) {
       stack.push(Math.random());
       return stack;
     },

     'times': function (stack) {
       var num = stack.pop();
       var quot = stack.pop();
       for (var i = num; i > 0; i--) {
         stack = Munch.eval(quot, stack);
       }
       return stack;
     },

     'maybe': function (stack) {
       var quot = stack.pop();
       if (Math.random() > 0.5) {
         stack = Munch.eval(quot, stack);
       }
       return stack;
     },

     'true': function (stack) {
       stack.push(true);
       return stack;
     },

     'false': function (stack) {
       stack.push(false);
       return stack;
     }
   },

   eval: function (source, initialStack) {
     // the stack we are operating on
     if (initialStack !== undefined)
     // if an initial stack is provided, use that
       stack = initialStack;
     else
     // otherwise, use an empty array
       stack = [];

     // loop through every item in the source
     for (var i = 0; i < source.length; i++) {
       if (source[i].word !== undefined) {
         // if the item is a word, look it up in the dictionary
         var wordObj = lookupTable[source[i].word];

         if (wordObj !== undefined) {
           stack.push(wordObj);
         } else {

           var wordValue = Munch.dictionary[source[i].word];
           if (typeof wordValue === "function") {
             // if the word's value is a function execute it with the current stack as an argument
             // make current stack into the result
             stack = wordValue(stack.clone());

           } else if (typeof wordValue === "object") {
             // if the word's value is a quotation, execute it on the current stack
             for (var j = 0; j < wordValue.length; j++) {
               var a = Munch.dictionary[wordValue[j].word];
               stack = a(stack.clone());
             }

           } else if (wordValue === undefined) {
             // if the word's value was not found, throw an error
             //throw new Error("Unknown word '" + source[i].word + "'!");
             stack.push(source[i].word);

           } else {
             // else, we know the word's value is not a function or undefined, push it to the stack
             stack.push(wordValue);
           }
         }
       } else {
         // else, we know that the item is not a word, push it to the stack
         stack.push(source[i]);

       }
     }

     // return the stack we operated on
     return stack;

   }
 }
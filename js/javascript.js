function textchange() {

   if (document.getElementById("new").value == "") {
      document.getElementById("new").value = "Lesson 1";
   } else if (document.getElementById("new").value == "Lesson 1") {
      document.getElementById("new").value = "Lesson 2";
   } else if (document.getElementById("new").value == "Lesson 2") {
      document.getElementById("new").value = "Lesson 3";
   } else if (document.getElementById("new").value == "Lesson 3") {
      document.getElementById("new").value = "Lesson 4";
   } else if (document.getElementById("new").value == "Lesson 4") {
      document.getElementById("new").value = "Lesson 1";
   }

}

function textchange2() {

   if (document.getElementById("new").value == "") {
      document.getElementById("new").value = "Lesson 4";
   } else if (document.getElementById("new").value == "Lesson 1") {
      document.getElementById("new").value = "Lesson 4";
   } else if (document.getElementById("new").value == "Lesson 2") {
      document.getElementById("new").value = "Lesson 1";
   } else if (document.getElementById("new").value == "Lesson 3") {
      document.getElementById("new").value = "Lesson 2";
   } else if (document.getElementById("new").value == "Lesson 4") {
      document.getElementById("new").value = "Lesson 3";
   }

}

function textchange3() {

   if (document.getElementById("new1").value == "") {
      document.getElementById("new1").value = "Example 1";
   } else if (document.getElementById("new1").value == "Example 1") {
      document.getElementById("new1").value = "Example 2";
   } else if (document.getElementById("new1").value == "Example 2") {
      document.getElementById("new1").value = "Example 3";
   } else if (document.getElementById("new1").value == "Example 3") {
      document.getElementById("new1").value = "Example 4";
   } else if (document.getElementById("new1").value == "Example 4") {
      document.getElementById("new1").value = "Example 1";
   }

}

function textchange4() {

   if (document.getElementById("new1").value == "") {
      document.getElementById("new1").value = "Example 4";
   } else if (document.getElementById("new1").value == "Example 1") {
      document.getElementById("new1").value = "Example 4";
   } else if (document.getElementById("new1").value == "Example 2") {
      document.getElementById("new1").value = "Example 1";
   } else if (document.getElementById("new1").value == "Example 3") {
      document.getElementById("new1").value = "Example 2";
   } else if (document.getElementById("new1").value == "Example 4") {
      document.getElementById("new1").value = "Example 3";
   }

}

function myFunction(){

if((document.getElementById("new").value == "Lesson 1") && (document.getElementById("new1").value == "Example 1")){

if ((document.getElementById("t1").value=="h") && (document.getElementById("t3").value=="a")){document.getElementById("t4").value="j";}
   
   }
}

var parserArithmeticSimpleModule = (function() {
  splitByParenthesesBlocks = function(expression, operator) {
    var result = [];
    var braces = 0;
    var currentChunk = "";

    for (var i = 0; i < expression.length; i++) {
      var currentChar = expression[i];
      if (currentChar === "<") {
        braces++;
      } else if (currentChar === ">") {
        braces--;
      }
      if (braces == 0 && currentChar == operator) {
        result.push(currentChunk);
        currentChunk = "";
      } else {
        currentChunk += currentChar;
      }
    }
    if (currentChunk !== "") {
      result.push(currentChunk);
    }
    //console.log("Result of splitByParenthesesBlocks: " + result);
    return result;
  };

  parseMultiplicationSeparatedExpression = function(expression) {
    var numbersString = splitByParenthesesBlocks(expression, "*");
    var numbers = numbersString.map(function(item) {
      if (item[0] === "<") {
        var subExpression = item.substr(1, item.length - 2);
        return parsePlusSeparatedExpression(subExpression);
      }
      return item;
    });
    var total = numbers.reduce(multiplyPart);
    function multiplyPart(total, num) {
      return parseInt(total) * parseInt(num);
    }
    return total;
  };

  parseDivisionSeparatedExpression = function(expression) {
    var numbersString = splitByParenthesesBlocks(expression, "/");
    var numbers = numbersString.map(function(item) {
      return parseMultiplicationSeparatedExpression(item);
    });
    var total = numbers.reduce(dividePart);
    function dividePart(total, num) {
      return parseInt(total) / parseInt(num);
    }
    return total;
  };

  parseMinusSeparatedExpression = function(expression) {
    var numbersString = splitByParenthesesBlocks(expression, "-");
    var numbers = numbersString.map(function(item) {
      return parseDivisionSeparatedExpression(item);
    });
    var total = numbers.reduce(subtractPart);
    function subtractPart(total, num) {
      return parseInt(total) - parseInt(num);
    }
    return total;
  };

  parsePlusSeparatedExpression = function(expression) {
    //debugger;
    var numbersString = splitByParenthesesBlocks(expression, "+");
    var numbers = numbersString.map(function(item) {
      return parseMinusSeparatedExpression(item);
    });
    var total = numbers.reduce(addPart);
    function addPart(total, num) {
      return parseInt(total) + parseInt(num);
    }
    return total;
  };

  parse = function(expression) {
    if (expression === null || expression.length === 0) {
      return expression;
    }
    //known issue - remove the char '–' with '-' (hyphen is replaced with minus)

    expression = expression.replace(/–/g, "-");
    var whitespaceRemovedExpression = expression.replace(/\s/g, "");
    return parsePlusSeparatedExpression(whitespaceRemovedExpression);
  };

  return {
    parseArithmeticExpression: parse
  };
})();


function valodik(){
if (document.getElementById("t1").value.includes(document.getElementById("t3").value)) { 
  document.getElementById("t4").value= "0";
}}





function removeSpaces(string) {
 return string.split(' ').join('');
}

function textchange5() {

if (document.getElementById("new").value == "Lesson 1" && document.getElementById("new1").value == "Example 1") {
      document.getElementById("t1").value = "programa";
      document.getElementById("t3").value = "zrenie";
   } 

}
window.onload = textchange5;
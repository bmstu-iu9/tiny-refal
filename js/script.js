        document.getElementById('myFile').addEventListener('change', function() {
              
            var fr=new FileReader();

            fr.onload=function(){
                
                document.getElementById('expression').textContent=fr.result;
            }
              
            fr.readAsText(this.files[0]);
        }) 






function petros(){
var expression = document.getElementById('expression');
var result1 = document.getElementById('result');
if(expression.value=="print(hello"){
result1.value="hello";}
}

function eraseText() {
    document.getElementById("result").value = "";
}
function eraseText1() {
    document.getElementById("expression").value = "";
}

var parserArithmeticSimpleModule = (function() {
  splitByParenthesesBlocks = function(expression, operator) {
    var result = [];
    var braces = 0;
    var currentChunk = "";

    for (var i = 0; i < expression.length; i++) {
      var currentChar = expression[i];
      if (currentChar === "(") {
        braces++;
      } else if (currentChar === ")") {
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
      if (item[0] === "(") {
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

      function evaluateArithmeticExpression() {
        //debugger;
        var expression = document.getElementById("expression").value;
        var result = "";
        if (expression === null || expression.length < 1) {
          result = "Empty expression";
        }
        result = parserArithmeticSimpleModule.parseArithmeticExpression(
          expression
        );
        document.getElementById("result").innerText = result.toString();
      }





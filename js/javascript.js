
function at(n) {
   n = Math.trunc(n) || 0;
   if (n < 0) n += this.length;
   if (n < 0 || n >= this.length) return undefined;
   return this[n];
}

const TypedArray = Reflect.getPrototypeOf(Int8Array);
for (const C of [Array, String, TypedArray]) {
   Object.defineProperty(C.prototype, "at",
                         { value: at,
                           writable: true,
                           enumerable: false,
                           configurable: true });
}

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

function eraseText() {
   document.getElementById("t2").value = "";
   document.getElementById("t4").value = "";
}


function tokenize_line(line) {
   let tokens = [];
   while (line.length > 0) {
      if (line.at(0) == ' ') {
         line = line.substr(1);
      } else if (line.at(0) == '\\' && line.length >= 2) {
         tokens[tokens.length] = line.at(1);
         line = line.substr(2);
      } else if ((line.at(0) == 's' || line.at(0) == 't' || line.at(0) == 'e') &&
         line.length >= 2) {
         tokens[tokens.length] = line.substr(0, 2);
         line = line.substr(2);
      } else if (line.at(0) == '#') {
         break;
      } else if (line.at(0) == '=') {
         tokens[tokens.length] = '==';
         line = line.substr(1);
      } else {
         tokens[tokens.length] = line.at(0);
         line = line.substr(1);
      }
   }
   return tokens;
}

function scanProgramField() {
   alert("lexical analyzis !!!")
   program = document.getElementById("t1").value;
   sentences = program.split('\n');
   for (let i = 0; i < sentences.length; ++i) {
      sentences[i] = tokenize_line(sentences[i]);
      document.getElementById("p").innerHTML += sentences[i] + " ";
   }


}

function scanViewField() {
   program1 = document.getElementById("t3").value;
   sentences1 = program1.split('\n');
   for (let h = 0; h < sentences1.length; ++h) {
      sentences1[h] = tokenize_line(sentences1[h]);
      document.getElementById("H").innerHTML += sentences1[h] + " ";
   }

}



function CheckPairedBrackets(tokens){
   let brackets = '';
   for (let elem of tokens){
      if ('()<>'.indexOf(elem) != -1){
         brackets += elem;
      }
   }
   while (brackets.indexOf('()') != -1 || brackets.indexOf('<>') != -1){
      brackets = brackets.replace('()', '');
      brackets = brackets.replace('<>', '');
   }
   return brackets == '';
}

function checkSentence(sentence){
   let array_of_errors = [];
   // console.log(sentence);
   // console.log(sentence + ':' + typeof(sentence));
   let num_equal_signs = sentence.join('').split('==').length - 1;
   if (num_equal_signs == 0){
      array_of_errors.push('нет знака =');
   }
   if (num_equal_signs > 1){
      array_of_errors.push('слишком много знаков "=" ');
   }
   left_part = sentence.slice(0, sentence.indexOf('=='));
   right_part = sentence.slice(sentence.indexOf('==') + 1);
   if (left_part.indexOf('<') != -1 || left_part.indexOf('>') != -1){
       array_of_errors.push('присутствуют знаки < > в левой части');
   }
   if (!CheckPairedBrackets(left_part) || !CheckPairedBrackets(right_part)){
      array_of_errors.push('Скобки не сбалансированы !');
   }
   let left_part_variables = {};
   for (elem of left_part){
      if (elem.length == 2 && 'ste'.indexOf(elem[0]) != -1 && left_part_variables[elem] == undefined){
         left_part_variables[elem] = true;
      }
   }
   for (elem of right_part){
      if (elem.length == 2 && 'ste'.indexOf(elem[0]) != -1){
         if (left_part_variables[elem] == undefined){
            array_of_errors.push('Неопределенная переменная ' + elem + ' в правой части');
         }
      }
   }
   return array_of_errors;
}



function find_close_bracket_pos(expr, expr_pos){
   if (expr[expr_pos] != ')'){
      return find_close_bracket_pos(expr, expr_pos + 1);
   }else{
      return expr_pos;
   }
}

function match_with_variable_var(expr, expr_pos, variable, variable_pos){
   if (variable.length == variable_pos){
      return true;
   }else{
      if (variable[variable_pos] == expr[expr_pos]){
         return match_with_variable_var(expr, expr_pos + 1, variable, variable_pos + 1);
      }else{
         return false;
      }
   }

}



function match(expr, expr_pos, pattern, pattern_pos, known_vars){
   if (expr.length == expr_pos && pattern.length == pattern_pos){
      console.log('case1');
      return {ok: true};
   }else if (pattern.length == pattern_pos){
      console.log('case2');
      return {ok: false};
   }else if(pattern[pattern_pos].length == 1){
      console.log('case3');
      if (expr[expr_pos] == pattern[pattern_pos]){
         return match(expr, expr_pos + 1, pattern, pattern_pos + 1, known_vars);
      }else{
         return {ok: false};
      }
   }else if (pattern[pattern_pos].length == 2 && known_vars[pattern[pattern_pos]] != undefined){
      console.log('case4');
      variable = known_vars[pattern[pattern_pos]];
      if (match_with_variable_var(expr, expr_pos, variable, 0)){
         return match(expr, expr_pos + variable.length, pattern, pattern_pos + 1, known_vars);
      }
      return {ok :false};
   }else if (pattern[pattern_pos].length == 2 && pattern[pattern_pos][0] == 's'){
      console.log('case5');
      if (expr[expr_pos] != '(' && expr[expr_pos] != ')'){
         let variable = pattern[pattern_pos];
         let value = expr[expr_pos];
         known_vars[variable] = value;
         return match(expr, expr_pos + 1, pattern, pattern_pos + 1, known_vars);
      }else{
         return {ok : false};
      }
   }else if (pattern[pattern_pos].length == 2 && pattern[pattern_pos][0] == 't'){
      console.log('case6');
      if (expr[expr_pos] != '(' && expr[expr_pos] != ')'){
         let variable = pattern[pattern_pos];
         let value = expr[expr_pos];
         known_vars[variable] = value;
         return match(expr, expr_pos + 1, pattern, pattern_pos + 1, known_vars);
      }else if (expr[expr_pos] == '('){
         let close_bracket = find_close_bracket_pos(expr, expr_pos);
         let variable = pattern[pattern_pos];
         let value = expr.slice(expr_pos, close_bracket + 1);
         console.log(value);
         known_vars[variable] = value;
         return match(expr, close_bracket + 1, pattern, pattern_pos + 1, known_vars);
      }else{
         return {ok : false};
      }
   }
}

function parserDebugging() {
   eraseText();
   let program_field = document.getElementById("t1");
   let result_field = document.getElementById("t4");
   let sentences = program_field.value.split('\\n');
   console.log(sentences.length);
   for (let i = 0; i < sentences.length; i++) {
      result_field.value += '\nПредложение ' + i + ' :\n';
      sentences[i] = tokenize_line(sentences[i]);
      error_array = checkSentence(sentences[i]);
      if (error_array.length == 0){
         result_field.value += 'Все верно !\n'
      }else{
         for (elem of error_array){
            result_field.value += elem + '\n';
         }
      }
   }
}

function matchDebugging(){
   eraseText();
   let program_field = document.getElementById("t1");
   let result_field = document.getElementById("t4");
   let sentences = program_field.value.split('\\n');
   for (let i = 0; i < sentences.length; i++){
      result_field.value += '\nПредложение ' + i + ' :\n';
      sentences[i] = tokenize_line(sentences[i]);
      error_array = checkSentence(sentences[i]);
      if (error_array.length != 0){
         for (elem of error_array){
            result_field.value += elem + '\n';
         }
      }else{
         let left_part = sentences[i].slice(0, sentences[i].indexOf('=='));
         let right_part = sentences[i].slice(sentences[i].indexOf('==') + 1);
         result_field.value += 'левая часть: \n';
         for (elem of left_part){
            result_field.value += elem + '\n';
         }
         result_field.value += 'правая часть: \n';
         for (elem of right_part){
            result_field.value += elem + '\n';
         }
         let res = match(right_part, 0, left_part, 0, {});
         if (res.ok){
            result_field.value += 'OK \n';
         }else{
            result_field.value += 'ошибка сопоставления \n';
         }
      }
   }
}


function main(){
   let syntan_button = document.querySelector('#syntan');
   let lexan_button = document.querySelector('#lexan');
   let match_button = document.querySelector('#match');
   syntan_button.addEventListener('click', parserDebugging);
   match_button.addEventListener('click', matchDebugging);
}

main();
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
   tokens = [];
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
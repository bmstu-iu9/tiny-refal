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

function checkSentence() {

   program = document.getElementById("t1").value;
   sentences = program.split('\n');

   for (let i = 0; i < sentences.length; ++i) {
      sentences[i] = tokenize_line(sentences[i]);
      sentence = sentences[i];
      var n = 0;
      for (j = 0; j < sentence.length; j++) {
         if (sentence[j] == "==") {
            n++;
         if (n == 1) {
               document.getElementById("a").innerHTML += "== OK, ";
               var inp = program = document.getElementById("t1").value;
               var result = inp.split("==");
               var rocketname = result[0];
               var missionname = result[1];
               if (rocketname.indexOf('<') > -1 || rocketname.indexOf('>') > -1) {
                  document.getElementById("a").innerHTML += "< или > в левой части предложения ";
               } else {
                  var a = [];
                  for (let p = 0; p < rocketname.length; p++) {
                     if (rocketname[p] == "(" || rocketname[p] == ")") {
                        a.push(rocketname[p]);
                     }
                  }
                  string = a.join("");
                  for(let o = 0; o<string.length;o++){
                  string.replaceAll('()', '');}
                  if (string == "") {
                     document.getElementById("a").innerHTML += "Скобки сбалансированы ";
                  } else {
                     document.getElementById("a").innerHTML += "Лишние скобки ";
                  }

                  var b = [];
                  for (let p = 0; p < missionname.length; p++) {
                     if (missionname[p] == "(" || missionname[p] == ")") {
                        b.push(missionname[p]);
                     }
                  }
                  string1 = b.join("");
                  for(let o1 = 0; o1<string1.length;o1++){
                  string1.replaceAll('()', '');}
                  if (string1 == "") {
                     document.getElementById("a").innerHTML += "Скобки сбалансированы ";
                  } else {
                     document.getElementById("a").innerHTML += "Лишние скобки ";
                  }
                  var c = [];
                  for (let p = 0; p < missionname.length; p++) {
                     if (missionname[p] == "<" || missionname[p] == ">") {
                        c.push(missionname[p]);
                     }
                  }
                  string2 = c.join("");
                  for(let o2 = 0; o2<string2.length;o2++){
                  string2.replaceAll('<>', '');}
               }
            }
         if (n > 1) {
            document.getElementById("a").innerHTML += " много ==, ";
         }
         if (n < 1) {
            document.getElementById("a").innerHTML += " мало ==, ";
         }
       }
     }
   }
 }

function checkViewField() {
   program = document.getElementById("t3").value;
   sentences = program.split('\n');

   for (let i = 0; i < sentences.length; ++i) {

      sentences[i] = tokenize_line(sentences[i]);

      sentence = sentences[i];


      var a = [];
      for (let p = 0; p < sentence.length; p++) {
         if (sentence[p] == "<" || sentence[p] == ">") {
            a.push(sentence[p]);
         }
      }
      string = a.join("");
      for(let o3 = 0; o3<string.length;o3++){
      string.replaceAll('<>', '');}
      if (string == "") {
         document.getElementById("l").innerHTML += "скобки ок ";
      } else {
         document.getElementById("l").innerHTML += "лишние скобки ";
      }
   }
}
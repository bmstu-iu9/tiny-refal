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

function validateText() {
   const text = document.getElementById('t1').value;
   if ((text.match(/=/g)?.length || 0) < 2) {
      val();

   } else {
      document.getElementById('t4').value = "Invalid";
   }
}

function val() {
   var someString = document.getElementById("t1").value;
   var index = someString.indexOf("="); // Gets the first index where a space occours
   var id = someString.substr(0, index); // Gets the first part
   var text = someString.substr(index + 1); // Gets the text part


   var p = document.getElementById("t3").value;


   for (var i = 1; i <= id.length; i = i + 2) {
      for (var j = 1; j <= text.length; j = j + 2) {
         if (id[i] == text[j]) {
            for (var k = 1; k <= p.length; k++) {
               if (p[j - k] != undefined && (j - k) < k && (j - k) >= 0 && k <= (j / 2 + 0.5)) {

                  document.getElementById("t4").value = document.getElementById("t4").value + p[j - k];
               }
            }
         }
      }
   }
}
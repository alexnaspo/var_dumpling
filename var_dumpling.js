$(document).ready(function(){
  var dumpling = $('body').text();
  console.log(dumpling);
  //dumpling = dumpling.toString();
  dumpling = dumpling.replace(/(\n\s\s|\n)/gm," ");
  dumpling = dumpling.replace(/([\s]+)/gm," ");
 // console.log(dumpling);


  someText = dumpling.replace(/(\r\n|\n|\r|\s\s)/gm,".");

 // console.log(dumpling);

  //var str = "array(6) { [0]=> int(0) [1]=> int(1) [2]=> int(2) [3]=> int(3) [4]=> int(4) [5]=> int(5) }";
 // console.log(str);

  var startingArray = dumpling.match(/^array\([0-9]*\)\s\{/g);

  var myArray = dumpling.match(/\[[0-9]+\]=> int\([0-9]+\)/g)

  if (myArray != null) {

    for ( i = 0; i < myArray.length; i++ ) { 
      var result = "myArray[" + i + "] = " + myArray[i];
    }
  }

  // $('body').empty();

  // $('body').append("<div class='header'>" + startingArray.toString() + "</div>");
  // for ( i = 0; i < myArray.length; i++ ) {
  //    $('body').append("<div class='element'>" + myArray[i].toString() + "</div>");
  // }
  // $('body').append("<div class='footer'> } </div>");

var myArray = dumpling.match(/\["?[a-zA-Z0-9\.]*"?]=> [a-z]*\([0-9\.]*\)\s(\{)?("[a-zA-z]*")?|\}/g)

if ( myArray != null) {
for ( i = 0; i < myArray.length; i++ ) { 
var result = "myArray[" + i + "] = " + myArray[i];
console.log(result);
}
}

  $('body').empty();
  var nestLevel = 1;
  $('body').append("<div class='header'>" + startingArray.toString() + "</div>");
  for ( i = 0; i < myArray.length; i++ ) {
    $('body').append("<div class='element' id=nestLevel" + nestLevel + ">" + myArray[i].toString() + "</div>");
    if(myArray[i].match(/array\([0-9]*\)\s\{/)) {
      nestLevel++;
    } else if(myArray[i] == "}") {
      nestLevel--;
    }
  }













});
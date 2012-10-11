$(document).ready(function(){
  var dumpling = $('body').text();
  //dumpling = dumpling.toString();
  dumpling = dumpling.replace(/(\n\s\s|\n)/gm," ");

  someText = dumpling.replace(/(\r\n|\n|\r|\s\s)/gm,".");

 // console.log(dumpling);

  //var str = "array(6) { [0]=> int(0) [1]=> int(1) [2]=> int(2) [3]=> int(3) [4]=> int(4) [5]=> int(5) }";
 // console.log(str);

  var startingArray = dumpling.match(/array\([0-9]*\)\s\{/g);
   // console.log(startingArray);

  var myArray = dumpling.match(/\[[0-9]+\]=> int\([0-9]+\)/g)
 // console.log(myArray);
  if (myArray != null) {

    for ( i = 0; i < myArray.length; i++ ) { 
      var result = "myArray[" + i + "] = " + myArray[i];
    }
  }

  $('body').empty();

  $('body').append(startingArray.toString() + "<br>");
  for ( i = 0; i < myArray.length; i++ ) {
     $('body').append('&nbsp;&nbsp;&nbsp;' + myArray[i].toString() + "<br>");
  }







});
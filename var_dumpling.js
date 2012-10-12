if ($('body').children().length == 0) {

  var dumpling = $('body').text();
  var startingArray = dumpling.match(/^array\([0-9]*\)\s\{|^array\s\(/g);
  
  if (startingArray) {

    dumpling = dumpling.replace(/(\n\s\s|\n)/gm, " ");
    dumpling = dumpling.replace(/([\s]+)/gm, " ");
    var oldArray = dumpling.match(/\["?[a-zA-Z0-9\.]*"?]=> [a-z]*\([0-9\.]*\)\s(\{)?("[a-zA-z]*")?|\}/g);

    var oldArray = dumpling.match(/\'[@a-zA-Z0-9_-]*\'\s\=>\s(\'?[@a-zA-Z0-9_ -:]*\'\,|NULL)|\),?|\["?[a-zA-Z0-9\.]*"?]=> [a-z]*\([0-9\.]*\)\s(\{)?("[a-zA-z]*")?|\}/g);

    var myArray = dumpling.match(/\'[@a-zA-Z0-9_-]*\'\s\=>\s(\'?[@a-zA-Z0-9_ -:]*\'\,|NULL)|\s\),?|\["?[a-zA-Z0-9\.]*"?]=> [a-z]*\([0-9\.]*\)\s(\{)?("[a-zA-z]*")?|\}|[0-9]*\s=>\s[a-zA-Z]*\s\(/g);

    $('body').empty();
    var nestLevel = 1;
    $('body').append("<div class='header'>" + startingArray.toString() + "</div>");
    for (i = 0; i < myArray.length; i++) {
      if (myArray[i] == "}" || myArray[i] == " )," || myArray[i] == " )") {
        nestLevel--;
      }

      if(myArray[i].toString().match(/\["?[0-9a-zA-Z]*"?\]/i)){
        var index = myArray[i].toString().match(/\["?[0-9a-zA-Z]*"?\]/i);
        console.log(index);
        myArray[i] = myArray[i].toString().replace(/\["?[0-9a-zA-Z]*"?\]/i, "<span class='index'>" + index + "</span>")
      }

      if(myArray[i].toString().match(/\s"[a-z]*"/i)){
        var str = myArray[i].toString().match(/\s"[a-z]*"/i);
        myArray[i] = myArray[i].toString().replace(/\s"[a-z]*"/i, "<span class='string'>" + str + "</span>")
      }
      $('body').append("<div class='element nestLevel" + nestLevel + "' id='" + i + "'>" + myArray[i].toString() + "</div>");

      if (myArray[i].match(/array\([0-9]*\)\s\{|array\s\(|array\s=>/)) {
        nestLevel++;
      }
    }
  }
}

//create function to grab each element, determine the type and return with proper class

  // WebFontConfig = {
  //   google: { families: [ 'Source+Sans+Pro:200,400:latin' ] }
  // };
  // (function() {
  //   var wf = document.createElement('script');
  //   wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
  //     '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  //   wf.type = 'text/javascript';
  //   wf.async = 'true';
  //   var s = document.getElementsByTagName('script')[0];
  //   s.parentNode.insertBefore(wf, s);
  // })();
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
      $('body').append("<div class='element' id=nestLevel" + nestLevel + ">" + myArray[i].toString() + "</div>");
      if (myArray[i].match(/array\([0-9]*\)\s\{|array\s\(|array\s=>/)) {
        nestLevel++;
      }
    }
  }
}
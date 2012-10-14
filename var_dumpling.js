if ($('body').children().length == 0) {

  var dumpling = $('body').text();
  var startingArray = dumpling.match(/^array\([0-9]*\)\s\{|^array\s\(/g);
  
  if(startingArray) {

    dumpling = dumpling.replace(/(\n\s\s|\n)/gm, " ");
    dumpling = dumpling.replace(/([\s]+)/gm, " ");
    var myArray = dumpling.match(/array\([0-9]*\)\s\{|\'[@a-zA-Z0-9_-]*\'\s\=>\s(\'?[@a-zA-Z0-9_ -:]*\'\,|NULL)|\s\),?|\["?[a-zA-Z0-9\.]*"?]=> [a-z]*\([0-9\.]*\)\s(\{)?("[a-zA-z]*")?|\}|[0-9]*\s=>\s[a-zA-Z]*\s\(/g);

    $('body').empty();
    var nestLevel = 0;
    //$('body').append("<div class='header'>" + startingArray.toString() + "</div>");
    for (i = 0; i < myArray.length; i++) {
      if (myArray[i] == "}" || myArray[i] == " )," || myArray[i] == " )") {
        nestLevel--;
      }

      myArray[i] = highlight(myArray[i]);
      $('body').append("<div class='element nestLevel" + nestLevel + "' id='" + i + "'>" + myArray[i].toString() + "</div>");

      if (myArray[i].match(/array\([0-9]*\)\s\{|array\s\(|array\s=>/)) {
        nestLevel++;
      }
    }
  }
}

function highlight (element) {

  if(element.toString().match(/\["?[0-9a-zA-Z]*"?\]=>/i)){
    var index = element.toString().match(/\["?[0-9a-zA-Z]*"?\]/i);
    element = element.toString().replace(/\["?[0-9a-zA-Z]*"?\]/i, "<span class='index'>" + index + "</span>");
  }

  if(element.toString().match(/\sint\([0-9]*\)/i)){
    var integer = element.toString().match(/\([0-9]*\)/i);
    console.log(integer);
    integer = integer.toString().replace(/\(|\)/g, ' ');
    element = element.toString().replace(/int\([0-9]*\)/i, "<span class='int'>" + integer + "</span>");
    return element;
  }

  if(element.toString().match(/\s"[a-z]*"/i)){
    var str = element.toString().match(/\s"[a-z]*"/i);
    element = element.toString().replace(/string\([0-9*\)\s"[a-z]*"/i, "<span class='string'>" + str + "</span>");
    return element;
  } else {
    return element;
  }

}

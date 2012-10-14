if ($('body').children().length == 0) {

  var dumpling = $('body').text();
  var startingArray = dumpling.match(/^array\([0-9]*\)\s\{|^array\s\(/g);
  
  if(startingArray) {

    dumpling = dumpling.replace(/(\n\s\s|\n)/gm, " ");
    dumpling = dumpling.replace(/([\s]+)/gm, " ");
    console.log(dumpling);
    var myArray = dumpling.match(/array\([0-9]*\)\s\{|\'[@a-zA-Z0-9_-]*\'\s\=>\s(\'?[@a-zA-Z0-9_ -:]*\'\,|NULL)|\s\),?|\["?[a-zA-Z0-9_\.\/]*"?]=>\s([a-zA-Z]*\([0-9a-zA-Z\.]*\)\s(\{)?("[0-9a-zA-Z\/]*")?|NULL)|\}|[0-9]*\s=>\s[a-zA-Z]*\s\(/g);

    $('body').empty();
    var nestLevel = 0;
    //$('body').append("<div class='header'>" + startingArray.toString() + "</div>");
    for (i = 0; i < myArray.length; i++) {
      if (myArray[i] == "}" || myArray[i] == " )," || myArray[i] == " )") {
        nestLevel--;
      }

      myArray[i] = highlight(myArray[i]);
      $('body').append("<div class='element nestLevel" + nestLevel + "' id='" + i + "'>" + myArray[i].toString() + "</div>");

      if (myArray[i].match(/array\([0-9]*\)\s\{|array\s\(|array\s=>|\s\{/)) {
        nestLevel++;
      }
    }
  }
}

function highlight (element) {

  if(element.toString().match(/\["?.*"?\]=>/i)){
    var index = element.toString().match(/\["?.*"?\]/i);
    element = element.toString().replace(/\["?.*"?\]/i, "<span class='index'>" + index + "</span>");
  }

  if(element.toString().match(/\s(int|float)\([0-9.]+\)/i)){
    var integer = element.toString().match(/\([0-9.]+\)/i);
    integer = integer.toString().replace(/\(|\)/g, ' ');
    element = element.toString().replace(/(int|float)\([0-9.]+\)/i, "<span class='int'>" + integer + "</span>");
    return element;
  }

  if(element.toString().match(/array\([0-9]*\)\s\{/i)){
    console.log('here');
    var array = element.toString().match(/array\([0-9]*\)\s\{/i);
    array = array.toString().replace(/array\([0-9]*\)/i, ' ');

    element = element.toString().replace(/array\([0-9]*\)\s\{/i, "<span class='array'>" + array + "</span>");
    return element;
  }


  if(element.toString().match(/\s".*"/i)){
    var str = element.toString().match(/\s".*"/i);
    element = element.toString().replace(/string\([0-9]*\)\s".*"/i, "<span class='string'>" + str + "</span>");
    return element;
  } else {
    return element;
  }

}

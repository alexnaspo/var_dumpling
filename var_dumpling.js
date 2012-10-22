//if ($('body').children().length == 0) {
  var dumpling = $('body').text();
  var starting = dumpling.match(/^(\[[0-9a-zA-Z"]*\]=>\s)*?[objectarray]*\([0-9a-zA-Z\\]*\)(#[0-9]*)?\s(\([0-9]*\)\s)?\{/g);
  
  if(starting) {
    dumpling = dumpling.replace(/(\n\s\s|\n)/gm, " ");
    dumpling = dumpling.replace(/([\s]+)/gm, " ");
    
    var myArray = dumpling.match(/(\[[0-9]*\]=>\s)*?[objectarray]*\([0-9a-zA-Z]*\)(#[0-9]*)?\s(\([0-9]*\)\s)?\{|\["?[a-zA-Z0-9_\.\/]*"?]=>\s([a-zA-Z]*\([0-9a-zA-Z\.]*\)\s(\{)?(\"(.*?)\")?|NULL)|\}/g);
    myArray = dumpling.match(/(\[[0-9a-zA-Z"]*\]=>\s)*?[objectarray]*\([0-9a-zA-Z\\]*\)(#[0-9]*)?\s(\([0-9]*\)\s)?\{|\["?[a-zA-Z0-9:"_\.\/]*"?]=>\s([a-zA-Z]*\([0-9a-zA-Z\.]*\)\s(\{)?(\"(.*?)\")?|NULL)|\}/g);

    $('body').empty();
    var nestLevel = 0;
    for (i = 0; i < myArray.length; i++) {
      if (myArray[i] == "}" || myArray[i] == " )," || myArray[i] == " )") {
        nestLevel--;
      }

      if (myArray[i].match(/(\[[0-9a-zA-Z"]*\]=>\s)*?[objectarray]*\([0-9a-zA-Z\\]*\)(#[0-9]*)?\s(\([0-9]*\)\s)?\{/)) {
        nestLevel++;
      }
      
      myArray[i] = highlight(myArray[i]);
      if(i == 0){
        nestLevel = 0;
      }
      $('body').append("<div class='element nestLevel" + nestLevel + "' style='padding-left:" + (nestLevel * 10) +"px;'" + ">" + myArray[i].toString() + "</div>");
      if(i == 0){
        nestLevel++;
      }
    }
  }
//}

function highlight (element) {

  if(element.toString().match(/\["?.*"?\]=>/i)){
    var index = element.toString().match(/\["?.*"?\]/i);
    element = element.toString().replace(/\["?.*"?\]=>/i, "<span class='index'>" + index + "</span>");
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

  if(element.toString().match(/bool\([0-9a-zA-Z]*\)/i)){
    console.log('here');
    var bool = element.toString().match(/bool\([a-zA-Z0-9]*\)/i);
    bool = bool.toString().replace(/bool\(|\)/g, ' ');

    element = element.toString().replace(/bool\([0-9a-zA-Z]*\)/i, "<span class='bool'>" + bool + "</span>");
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

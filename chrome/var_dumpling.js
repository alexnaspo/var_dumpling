// (function() { 
  // function main(){
  //   var body = document.body.textContent;  
  //   var dumpling = new Var_dumpling(body);
  //   if(dumpling.isVarDumpDetected()){
  //     dumpling.stripSpacesAndNewLines();
  //     dumpling.setElements();
  //     dumpling.createDumpling();
  //     console.log(dumpling.nestLevel);

  //     document.body.innerHTML = dumpling.Var_dumpling;  
  //   }
  // }

  //@todo need to get this working as as class for both chrome and firefox
  //@todo run a simple web server in order to allow unit testing

  function Var_dumpling(body){
    this.body = body;
    this.elements = null;
    this.nestLevel = 0;
    this.var_dumpling = "";
    this.OBJECT_OR_ARRAY_REGEX = /(\[[0-9a-zA-Z"]*\]=>\s)*?(?:object|array)\([0-9a-zA-Z_\\]*\)(#[0-9]*)?\s(\([0-9]*\)\s)?\{/g;

    this.isVarDumpDetected = function(){
      if(this.body.match(this.OBJECT_OR_ARRAY_REGEX)){
        return true;
      } else {
        return false;
      }
    };

    this.stripSpacesAndNewLines = function(){
      this.body = this.body.replace(/(\n\s\s|\n)/gm, " ");
      this.body = this.body.replace(/([\s]+)/gm, " ");
    };

    this.setElements = function(){
      elementsRegex = /(\[[0-9a-zA-Z_"]*\]=>\s)*?(?:object|array)\([0-9a-zA-Z_\\]*\)(#[0-9]*)?\s(\([0-9]*\)\s)?\{|\["?[a-zA-Z0-9:"_\.\/]*"?]=>\s([a-zA-Z]*\([0-9a-zA-Z\.]*\)\s(\{)?(\"(.*?)\")?|NULL)|\}/g;
      this.elements = this.body.match(elementsRegex);
    };

    this.createDumpling = function(){
      for (i = 0; i < this.elements.length; i++) {      
        ingredient = new Ingredient(this.elements[i]);
        text = ingredient.text;
        if (text.match(this.OBJECT_OR_ARRAY_REGEX)) {
          ingredient.nestLevel = this.nestLevel;
          this.nestLevel++;
        } else if (text == "}" || text == " )," || text == " )") {
          this.nestLevel--;
          ingredient.nestLevel = this.nestLevel;
        } else {
          ingredient.nestLevel = this.nestLevel;
        }        
        this.var_dumpling += "<div style='padding-left:" + (ingredient.nestLevel * 15) +"px;'" + ">" + ingredient.text + "</div>";
      }
    };

  }

  function Ingredient(element) {
    this.text = highlight(element);
    this.nestLevel = null;
  } 

  function highlight (element) {
    var objectRegex = /[object]*\([a-zA-Z\\]*\)(#[0-9]*)\s(\([0-9]*\)\s)?\{/i;
    var indexRegex = /\["?.*"?\]=>/i;
    var arrayRegex = /array\([0-9]*\)\s\{/i;
    var boolRegex = /bool\([0-9a-zA-Z]*\)/i; 
    var stringRegex = /\s".*"/i;

    if(element.match(indexRegex)){
      var index = element.toString().match(indexRegex);
      element = element.toString().replace(indexRegex, index);
    }

    if(element.toString().match(objectRegex)){
      var object =  element.toString().match(objectRegex);
      element = element.toString().replace(objectRegex, object[0]);
      return element;
    }

    if(element.toString().match(arrayRegex)){
      var array = element.toString().match(arrayRegex);      
      element = element.toString().replace(arrayRegex, array);
      return element;
    }

    if(element.match(boolRegex)){
      var bool = element.match(boolRegex);
      bool = bool.toString().replace(/bool\(|\)/g, ' ');      
      element = element.toString().replace(boolRegex, bool.fontcolor("#9A32CD"));
      return element;
    }  

    if(element.toString().match(/\s(int|float)\([0-9.]+\)/i)){
      var integer = element.toString().match(/\([0-9.]+\)/i);
      integer = integer.toString().replace(/\(|\)/g, ' ');
      element = element.toString().replace(/(int|float)\([0-9.]+\)/i, integer.fontcolor("#900").bold());
      return element;
    }  

    if(element.toString().match(stringRegex)){
      var str = element.toString().match(stringRegex);
      element = element.toString().replace(/string\([0-9]*\)\s".*"/i, str.toString().fontcolor("#090"));
      return element;
    } else {
      return element;
    }
  }

  //main();
  
// }());


  // function var_dumpling(body){
  //   var objectOrArray = /(\[[0-9a-zA-Z"]*\]=>\s)*?(?:object|array)\([0-9a-zA-Z_\\]*\)(#[0-9]*)?\s(\([0-9]*\)\s)?\{/g;  
  //   var elementsRegex = /(\[[0-9a-zA-Z_"]*\]=>\s)*?(?:object|array)\([0-9a-zA-Z_\\]*\)(#[0-9]*)?\s(\([0-9]*\)\s)?\{|\["?[a-zA-Z0-9:"_\.\/]*"?]=>\s([a-zA-Z]*\([0-9a-zA-Z\.]*\)\s(\{)?(\"(.*?)\")?|NULL)|\}/g;

  //   var starting = body.match(objectOrArray);
  //   if(starting) {
  //     //var_dump detected
  //     body = body.replace(/(\n\s\s|\n)/gm, " ");
  //     body = body.replace(/([\s]+)/gm, " ");    

  //     var elements = body.match(elementsRegex);          
  //     var nestLevel = 0;
  //     var dumplingString = "";
      
  //     for (i = 0; i < elements.length; i++) {      
  //       ingredient = new Ingredient(elements[i]);
  //       if (elements[i].match(objectOrArray)) {
  //         ingredient.nestLevel = nestLevel;
  //         nestLevel++;
  //       } else if (elements[i] == "}" || elements[i] == " )," || elements[i] == " )") {
  //         nestLevel--;
  //         ingredient.nestLevel = nestLevel;
  //       } else {
  //         ingredient.nestLevel = nestLevel;
  //       }        
  //       dumplingString += "<div style='padding-left:" + (ingredient.nestLevel * 15) +"px;'" + ">" + ingredient.text + "</div>";
  //     }
  //     if(nestLevel === 0) {
  //       //nestLevel is balanced, var_dump confirmed
  //       return "<div id='var_dumpling'>" + dumplingString + "</div";
  //     } else {
  //       return false;
  //     }
  //   }
  // }
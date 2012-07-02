$(document).ready(function(){
  var dumpling = $('body').text();
  console.log(dumpling);
  dumpling = dumpling.toString();

  var detectVarDump = /int\(\d[0-9]*\)|string\(\d[0-9]*\)\s\"*\w{0,100000}\"*\s|array\(\d[0-9]*\)\s\{|bool\(true\)|bool\(false\)|float\(\d[0-9]*\.\d[0-9]*\)/i;
  var detectArray = /w{0,99999}\(\d[0-9]*\)\s\{/i;
  var detectArray2 = /array\(\d[0-9]*\)\s\{\n\s\s\[\d[0-9]*\]\=\>\n\s\s(string|int|array)\(\d[0-9]*\)/i;

  var detectElements = /array\(\d[0-9]*\)\s\{|array\(\d[0-9]*\)\s\{\s\s\s\[\"\w{0,9999}\"\]|[\n[0-9]*\]\=\>\s\s\s\w{0,9999}\(\d[0-9]*\)\s\"\w{0,99999}\"|[\n[0-9]*\]\=\>\s\s\s\w{0,999}\(\w{0,999999}\)/g;
  var detectElements = /[abcdefghijklmnopqrstuvwxyz1234567890-_#@()]*(\s|)\(\d[0-9]*\)/g;
  //account for ["asfdasdfa"]


//reg ex bellow catchs all these seperately ..{[0]=> string(3) "car" [1]=> string(5) "train" [2]=> int(1) [3]=> int(2) [4]=> string(5) "plain" [5]=> string(5) "truck" [6]=> int(3) [7]=> int(4) [8]=> string(4) "shit" [9]=> string(4) "boat" [10]=> int(5) [11]=> int(6) }}
/[\d[0-9]*\]\=\>\s[abcdefghijklmnopqrstuvwxyz1234567890-_#@()]*\(\d[0-9]*\)(\s\"[abcdefghijklmnopqrstuvwxyz1234567890-_#@()]*\"|)/g;


  if (detectVarDump.test(dumpling)) {
    alert('var_dump Detected')
    //format var_dump here
    $('body').attr('id', 'dumpling');
   // $('body').empty();

   var detectString = dumpling

    var indexTest = dumpling.indexOf("array(");

    if(indexTest == 0){
      // var startArray = detectArray.exec(dumpling);
      // var elements = detectElements.exec(dumpling);
              var elementsArray=[];

      while (elements = detectElements.exec(dumpling)){

        // var elements = detectElements.exec(dumpling);
        elementsArray.push(elements);
      };
              console.log(elementsArray);  

      // var lastIndex = detectElements.lastIndex;
      // console.log(lastIndex);
      // console.log(elements);
      // console.log(dumpling.length);
      // var elementArray = [] ;

      // for(var i = 0; i < 10; i++){ 
      //   console.log(dumpling);
      //   var elements = detectElements.exec(dumpling);
      //   elementArray.push(elements);
      //   var lastIndex = detectElements.lastIndex;
      //   dumpling = dumpling.substring(detectElements.lastIndex - lastIndex);

      //   console.log(lastIndex);
      //   console.log(dumpling.length);

      //   console.log(elementArray);
   // }

      // for (var i = 0; i < 10; i++) {
      //   cut = detectVarDump.lastIndex;
      //   dumpling = dumpling.substring(cut);
      //   elements = detectVarDump.exec(dumpling);

      //           console.log("2st element " + elements);

      //   console.log(dumpling);
      //   console.log("next to lastIndex " + detectVarDump.lastIndex);

      //   console.log(elements);

      //   // var splitString = dumpling.split(splitRegEx);

      //   // console.log(splitString);

      //   // document.write(startArray);


    }
    
  } else {
    alert('No Match Found');
    //do nothing
  }

});
$(document).ready(function(){
  var dumpling = $('body').text();
  console.log(dumpling);
  dumpling = dumpling.toString();
  //check for all possible instances of a var_dump

  //tests...regex equiv
  //int...int(#)
  //array...array(#) {
  //string...string(#) "string"
  //bool...bool(false)
  //bool...bool(true)
  //float... float(#.#)
  //other var dump reponses?

  //basic regEX to detect the above responses of a var_dump
  //room for improvement
  var detectVarDump = /int\(\d[0-9]*\)|string\(\d[0-9]*\)\s\"*\w{0,100000}\"*\s|array\(\d[0-9]*\)\s\{|bool\(true\)|bool\(false\)|float\(\d[0-9]*\.\d[0-9]*\)/i;
  var detectArray = /array\(\d{1,1000}\)\s\{/i;

  if (detectVarDump.test(dumpling)) {
    alert('var_dump Detected')
    //format var_dump here
    $('body').attr('id', 'dumpling');
    var indexTest = dumpling.indexOf("array(");

    if(indexTest == 0){
      alert('var_dump array Detected');
    }
    
  } else {
    alert('No Match Found');
    //do nothing
  }

});
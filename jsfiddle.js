var string = 'array(12) { [0]=> string(3) "car" [1]=> string(5) "train" [2]=> int(1) [3]=> int(2) [4]=> string(5) "plain" [5]=> string(5) "truck" [6]=> int(3) [7]=> int(4) [8]=> string(4) "shit" [9]=> string(4) "boat" [10]=> int(5) [11]=> array(12) { [0]=> string(3) "car" [1]=> string(5) "train" [2]=> int(1) [3]=> int(2) [4]=> string(5) "plain" [5]=> string(5) "truck" [6]=> int(3) [7]=> int(4) [8]=> string(4) "shit" [9]=> string(4) "boat" [10]=> int(5) [11]=> int(6) } }';

//string = 'string(2) "asdfa"';

//string = 'int(2)';

jsonRepresentation = detectType(string);
$("#myOutput").html(jsonRepresentation);


function detectType(input) {
    matches = input.match(/[abcdefghijklmnopqrstuvwxyz1234567890-_#@()]*(\s|)\(\d[0-9]*\)/);
    
    matchedString = matches[0];
    
    if(matchedString.search('array') != -1) {
        matchedArray = matchedString.split("(");
        type = matchedArray[0];
        length = matchedArray[1].substring(0, matchedArray[1].length - 1);
        theRest = input.substr(matchedString.length);
        theRest = theRest.substr(theRest.search('{') + 1, theRest.lastIndexOf('}') - 2);
            alert(theRest);
    } else if(matchedString.search('object') != -1) {
        matchedArray = matchedString.split(" (");
        type = matchedArray[0];
        length = matchedArray[1].substring(0, matchedArray[1].length - 1);
    } else if(matchedString.search('string') != -1) {
        matchedArray = matchedString.split("(");
        type = matchedArray[0];
        length = matchedArray[1].substring(0, matchedArray[1].length - 1);        
    } else {
        matchedArray = matchedString.split("(");
        type = matchedArray[0];
        length = matchedArray[1].substring(0, matchedArray[1].length - 1);        
    }
    
//    $("#myOutput").html("Type " + type + "Length" + length);        
    
    
    switch(type) {
        case 'array':
            // We have an array, so let's find each elment of the array and run it back through
            array_elements = [];
            for(i = 0; i < array_elements.length; i++) {

            }
            
            return "STUFF";
            break;
        default:
            return {};
            
    }
}

​
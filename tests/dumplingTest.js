
asyncTest("array test", function() {	
	$.get("/tests/testFiles/arrayTest.html", function(data){
		dumpling = new Var_dumpling(data);
	  varDumpDetected = dumpling.isVarDumpDetected();
	  equal(varDumpDetected, true);  
	  start();
	});
});


asyncTest("No var_dump detected test", function() {	
	$.get("/tests/testFiles/noVarDumpDetected.html", function(data){
		dumpling = new Var_dumpling(data);
	  varDumpDetected = dumpling.isVarDumpDetected();
	  equal(varDumpDetected, false);  
	  start();
	});
});

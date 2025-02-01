(function(){
	'use strict';
	NAinfo.requireApiVersion(0, 0);

	var a=sl(-100,100);
	var b=sl(-100,100);
	var sign=sl1();
	NAtask.setTask({
		text: "$$"+(a/100).ts(1)+["\\cdot",":"][sign]+(b/100).ts(1).negativeBracketsTeX()+"=$$",
		answers: [(a*b/10000).ts(),new Fraction(a,b).toTeX().ob$()][sign],

	});
})();

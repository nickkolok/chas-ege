(function(){
    'use strict';
    NAinfo.requireApiVersion(0, 0);

    var a=new Fraction(sl(1,100).pm(),sl(1,10));
    var b=sl(-100,100);
    var sign=sl1();
	var order=sl1();

    NAtask.setTask({
        text: "$$"+[
				a.toTeX(sl1())+["\\cdot",":"][sign]+(b/100).ts(1).negativeBracketsTeX(),
				(b/100).ts(1)+["\\cdot",":"][sign]+a.toTeX(sl1()).negativeBracketsTeX(),
			][order]+"=$$",
        answers: [a.multiply(b).divide(100),[a.divide(b).multiply(100),new Fraction(b,100).divide(a)][order]][sign].toTeX().ob$(),    
    });
})();

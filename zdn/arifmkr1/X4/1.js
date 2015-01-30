(function(){
    'use strict';
    NAinfo.requireApiVersion(0, 0);

    var a=new Fraction(sl(1,100).pm(),sl(1,10));
    var b=sl(-100,100,0.01);
    var sign=sl1();
	var order=sl1();

    NAtask.setTask({
        text: "$$"+[
				a.toTeX(sl1())+["+","-"][sign]+b.ts(1).negativeBracketsTeX(),
				b.ts(1)+["+","-"][sign]+a.toTeX(sl1()).negativeBracketsTeX(),
			][order]+"=$$",
        answers: [a.add(b),[a.subtract(b),a.subtract(b).multiply(-1)][order]][sign].toTeX().ob$(),    
    });
})();

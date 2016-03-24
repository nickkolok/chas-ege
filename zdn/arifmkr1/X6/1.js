(function(){
    'use strict';
    NAinfo.requireApiVersion(0, 0);

    var a=new Fraction(sl(1,100).pm(),sl(1,10));
    var b=new Fraction(sl(1,100).pm(),sl(1,10));
    var sign=sl1();

    NAtask.setTask({
        text: "$$"+a.toTeX(sl1())+["\\cdot",":"][sign]+b.toTeX(sl1()).negativeBracketsTeX()+"=$$",
        answers: [a.multiply(b),a.divide(b)][sign].toTeX().ob$(),
    });
})();

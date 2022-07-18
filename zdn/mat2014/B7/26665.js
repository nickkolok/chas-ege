(function(){'use strict';

var a=sluchch(1,9).pm();
var x1=sluchch(1,9).pm();
var x2=sluchch(1,9).pm();
var b=slKrome([(a*(x1+x2)+b).abs(), x2*a],1,9).pm();
var k=[sluchch(2,9), 1].iz();

chas2.task.setEquationTask({
	parts: [k+'x', '\\frac{'+b*k+'x+'+(-x1*x2*a)*k+'}{'+a+'x+'+(-a*(x1+x2)+b)+'}'],
	roots: [x1,x2],
	enablePartsSubtraction: 1,
    handleMultipleRoots: 'randomExceptList',
});
})();

//26665
//Белозоров Никита

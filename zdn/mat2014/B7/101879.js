(function(){'use strict';

var a=sluchch(-9,9);
var c=slKrome(a,-9,9);
var b=slKrome([a,c],-9,9);
var x1=sluchch(1,9).pm();
var x2=slKrome(x1,-9,9);
var d=slKrome([a*x2,c*x2],-9,9);

chas2.task.setEquationTask({
	parts: [(b-a)+'x+'+(d-c*x2), (b-c)+'x+'+(d-a*x2)],
    wrapper: ['\\frac{x+'+(-1)*x1+'}{', '}'],
	roots: [x1,x2],
	enablePartsSubtraction: 1,
    handleMultipleRoots: 'randomExceptList',
});
})();

//101879
//Белозоров Никита

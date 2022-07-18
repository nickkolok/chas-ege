(function(){'use strict';

var b=sluchch(1,9).pm();
var c=sluchch(1+b.abs(),9).pm();
var a;

if(b>0 && c>0)
	a = [sluchch(-10, (-c/b).ceil()-1), sluchch(1, 10)].iz();
else if(b>0 && c<0)
	a = [sluchch(-10, -1), sluchch((-c/b).floor()+1, 10)].iz();
else if(b<0 && c>0)
	a = sluchch(1,(-c/b).ceil()-1);
else
	a = sluchch((-c/b).floor()+1,-1);

chas2.task.setEquationTask({
	parts: ['('+b+'x^2+'+c+'x'+')', '('+b+'x^2+'+c*a+')'],
	wrapper: ['\\log_{'+sluchch(2, 9)+'}{', '}'],
	roots: a,
	enablePartsSubtraction: 1,
});
})();

//77380
//Белозоров Никита

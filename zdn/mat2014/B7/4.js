(function(){'use strict';

var a=sluchch(2,9);
var f=sluchch(2,4);
var d=a.pow(f);
var b=sluchch(1,9).pm();
var x=sluchch(1,9).pm();
var c=f-b*x;
var p;
switch(sluchch(1,4)){
	case 1:
		p = [a+'^{'+b+'x+'+c+'}', d];
	break;
	case 2:
		p = ['\\left('+1 .texfrac(a)+'\\right)^{'+b+'x+'+c+'}', 1 .texfrac(d)];
	break;
	case 3:
		p = ['\\left('+1 .texfrac(a)+'\\right)^{'+(-b)+'x+'+(-c)+'}', d];
	break;
	case 4:
		p = ['{'+a+'}^{'+(-b)+'x+'+(-c)+'}', 1 .texfrac(d)];
	break;
}

chas2.task.setEquationTask({
	parts: p,
	roots: x,
	enablePartsSubtraction: 1,
	enablePartsExchange: 0,
});
})();

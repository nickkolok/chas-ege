(function(){'use strict';

var d=sluchch(2,9);
var f=[2,4].iz();
var a=d.pow(f);
var b=sluchch(1,9).pm();
var c=sluchch(1,9).pm();
var x=-1/f-c;
var p;
switch(sl1()){
	case 0:
		p = ['\\left(\\frac{1}{'+a+'}\\right)^{'+'x+'+c+'}', d ];
	break;
	case 1:
		p = ['{'+a+'}^{'+'x+'+c+'}', 1 .texfrac(d) ];
	break;
}
chas2.task.setEquationTask({
	parts: p,
	roots: x,
	enablePartsSubtraction: 1,
	enablePartsExchange: 0,
},{
	tags: {drs:1},
});
})();

(function(){'use strict';

var t1=['sin','cos'].shuffle();
var v1=sl1();

var c=om.znamenat.iz();
var a=sluchch(1,c-1);
var b=c*c-a*a;
chas2.task.setTask({
	text: 'В треугольнике $ABC$ угол $A$ равен $90^\\circ$, $\\'+t1[0]+' B = '+b.koren().texfrac(c)+
		'$. Найдите $\\'+t1[1-v1]+' '+(v1?'C':'B')+'$.',
	answers: (a/c).ts(),
	tags:{tri:1}
});
chas2.task.modifiers.variativeABC();
})();

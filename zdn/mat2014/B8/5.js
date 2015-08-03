(function(){'use strict';

var t1=[ ['sin',['tg B','ctg C'].iz()], ['cos',['ctg B','tg C'].iz()] ].iz();
var c=[2,5,10].iz();
var a=sluchch(1,100);
var b=c*c+a*a;
var y1=b.isPolnKvadr();
var v1=sl1();
chas2.task.setTask({
	text: 'В треугольнике $'+'ABC'.mesh()+'$ угол $A$ равен $90^\\circ$, $\\'+t1[0]+' B = '+
		(y1?a:a+b.koren().esli(v1)).frac(y1?b.sqrt:(v1?b:b.koren()))+'$. Найдите $\\'+t1[1]+'$.',
	answers: (a/c).ts(),
	tags:{tri:1},
});
chas2.task.modifiers.variativeABC();
})();

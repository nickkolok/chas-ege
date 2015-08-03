(function(){'use strict';

var t1=['tg','ctg'].iz();
var c=[2,5,10].iz();
var a=sluchch(1,100);

chas2.task.setTask({
	text: 'В треугольнике $'+'ABC'.mesh()+'$ угол $A$ равен $90^\\circ$, $\\'+t1+'{B}= '+c.frac(a)+'$. Найдите $\\'+t1+'{C}$.',
	answers: (a/c).ts(),
	tags: {tri:1},
});
chas2.task.modifiers.variativeABC();
})();

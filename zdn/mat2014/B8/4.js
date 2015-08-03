(function(){'use strict';

var t1=[['sin','cos'],['tg','ctg']].iz().shuffle();
var a=sluchch(0.01,0.99,0.01).ts();

chas2.task.setTask({
	text: 'В треугольнике $'+'ABC'.mesh()+'$ угол $A$ равен $90^\\circ$, $\\'+t1[0]+' B = '+a+'$. Найдите $\\'+t1[1]+' C$.',
	answers: a,
	tags: {tri:1},
});
chas2.task.modifiers.variativeABC();
})();

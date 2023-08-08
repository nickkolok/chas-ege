(function(){'use strict';

var t1=[['sin','cos'],['tg','ctg']].iz().shuffle();
var a=sluchch(0.01,0.99,0.01).ts();

let paint1 = function(ctx) {
	ctx.lineWidth = 2;

	ctx.drawLine(10, 370, 390, 370);
	ctx.drawLine(10, 370, 10, 50);
	ctx.drawLine(10, 50, 390, 370);

	//прямой угол
	ctx.lineWidth = 1;

	ctx.drawLine(10, 370 - 20, 10 + 20, 370 - 20);
	ctx.drawLine(10 + 20, 370, 10 + 20, 370 - 20);

};

NAtask.setTask({
	text: 'В треугольнике $'+'ABC'.mesh()+'$ угол $A$ равен $90^\\circ$, $\\'+t1[0]+' B = '+a+'$. Найдите $\\'+t1[1]+' C$.',
	answers: a,
	tags: {tri:1},
});
NAtask.modifiers.variativeABC();

NAtask.modifiers.addCanvasIllustration({
	width: 400,
	height: 400,
	paint: paint1,
});
})();

(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		'use strict';

		var t1 = ['sin', 'cos'].shuffle();
		var v1 = sl1();

		var c = om.znamenat.iz();
		var a = sluchch(1, c - 1);
		var b = c * c - a * a;

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
			text: 'В треугольнике $ABC$ угол $A$ равен $90^\\circ$, $\\' + t1[0] + ' B = ' + b.koren().texfrac(c) +
				'$. Найдите $\\' + t1[1 - v1] + ' ' + (v1 ? 'C' : 'B') + '$.',
			answers: (a / c).ts(),
			tags: {
				tri: 1
			}
		});
		NAtask.modifiers.variativeABC();
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//Обзад
//Николай Авдеев
//refactoring by SugarHedgehog
//TODO: достать как-то из оболочки буквы и прилипить на рисунок

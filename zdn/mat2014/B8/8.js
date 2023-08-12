(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		'use strict';

		var a1 = om.pifagtr.iz();
		var c = sluchch(1, 10);
		var a = a1[0] * c,
			b = a1[1] * c,
			c = a1[2] * c;
		var sinA = '\\sin{A}=' + a.frac(c);
		var sinB = '\\sin{B}=' + b.frac(c);
		var cosA = '\\cos{A}=' + b.frac(c);
		var cosB = '\\cos{B}=' + a.frac(c);
		var tgA = '\\tg{A}=' + a.frac(b);
		var tgB = '\\tg{B}=' + b.frac(a);
		var ctgA = '\\ctg{A}=' + b.frac(a);
		var ctgB = '\\ctg{B}=' + a.frac(b);

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;
			ctx.strokeStyle = "#809DF2";

			ctx.drawLine(10, 370, 390, 370);
			ctx.drawLine(10, 370, 10, 50);
			ctx.drawLine(10, 50, 390, 370);

			//прямой угол
			ctx.lineWidth = 1;
			ctx.strokeStyle = ["#D777F2","#F2A2D6"].iz();

			ctx.drawLine(10, 370 - 20, 10 + 20, 370 - 20);
			ctx.drawLine(10 + 20, 370, 10 + 20, 370 - 20);

		};

		NAtask.setCountableTask(
			[{
				utv: '$' + [sinA, sinB, cosA, cosB, tgA, tgB, ctgA, ctgB].iz() + '$'
			}, {
				vel: '',
				bkv: 'AB',
				zna: c,
				rod: 1,
				vin: 1,
				nah: 1
			}, {
				vel: '',
				bkv: 'AC',
				zna: b,
				rod: 1,
				vin: 1,
				nah: 1
			}, {
				vel: '',
				bkv: 'BC',
				zna: a,
				rod: 1,
				vin: 1,
				nah: 1
			}, ].sluchiz(3), {
				preambula: 'В треугольнике $' + 'ABC'.mesh() + '$ угол $C$ равен $90^\\circ$. ',
			}, {
				tags: {
					tri: 1
				},
			}
		);
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

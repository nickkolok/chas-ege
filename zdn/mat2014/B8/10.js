(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		'use strict';

		var c = sluchch(2, 10),
			d = sluchch(0.1, 0.9, 0.1),
			a = c * d,
			b = (c * c - a * a).koren();

		var sinA = '\\sin{A}';
		var sinB = '\\sin{B}';
		var cosA = '\\cos{A}';
		var cosB = '\\cos{B}';
		var sin2A = '\\sin^2{A}';
		var sin2B = '\\sin^2{B}';
		var cos2A = '\\cos^2{A}';
		var cos2B = '\\cos^2{B}';

		var g = 1 - d * d;

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
			[
				[{
					vel: '',
					bkv: [sinA, cosB].iz(),
					vin: 1,
					zna: d.ts(),
					nah: 1
				}, {
					vel: '',
					bkv: [sin2A, cos2B].iz(),
					vin: 1,
					zna: (d * d).ts(),
					nah: 1
				}, {
					vel: '',
					bkv: [sin2B, cos2A].iz(),
					vin: 1,
					zna: g.ts(),
					nah: 1
				}, {
					vel: '',
					bkv: [sinB, cosA].iz(),
					vin: 1,
					zna: g.koren(),
					nah: g.isPolnKvadr()
				}, ].iz(), {
					vel: '',
					bkv: 'AB',
					zna: c.ts(),
					rod: 1,
					vin: 1,
					nah: 1
				}, {
					vel: '',
					bkv: 'AC',
					zna: b,
					rod: 1,
					vin: 1,
					nah: 0
				}, {
					vel: '',
					bkv: 'BC',
					zna: a.ts(),
					rod: 1,
					vin: 1,
					nah: 1
				},
			].sluchiz(3), {
				preambula: 'В треугольнике $' + 'ABC'.mesh() + '$ угол $C$ равен $90^\\circ$. ',
			}, {
				tags: {
					'tri': 1,
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

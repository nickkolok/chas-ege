(function () {
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		function f(x) {
			return k / (x + a);
		}

		let key = '508971';
		let preference1 = ['functionOfX', 'valueX'];
		let preference2 = ['withA', 'withoutA'];
		let randFind = getSelectedPreferenceFromList(key, preference1);
		let randA = getSelectedPreferenceFromList(key, preference2);

		let a = [sluchch(1, 6).pm(), 0][randA];
		let k = sluchch(1, 8).pm();
		let chisl = sluchch(1, 30, 0.5).pm();
		genAssertZ1000(f(chisl));
		genAssert(Math.abs(f(chisl)) >= 8);

		if (randFind) {
			answ = chisl;
			find = `значение $x$, при котором $f(x)=${f(chisl).ts()}$`;
		} else {
			find = `$f(${chisl.ts()})$`;
			answ = f(chisl);
		}

		let points = intPoints(f, {
			minX: -7,
			maxX: 7,
			minY: -7,
			maxY: 7
		});
		let paint1 = function (ctx) {
			let h = 400;
			let w = 400;
			//Оси координат
			ctx.drawCoordinatePlane(w, h, {
				hor: 1,
				ver: 1
			}, {
				x1: '1',
				y1: '1',
				sh1: 13,
			}, 20);

			ctx.lineWidth = 0.1;
			ctx.scale(20, -20);

			//график

			graph9AdrawFunction(ctx, f, {
				minX: -8.5,
				maxX: 8.5,
				minY: -9.5,
				maxY: 8.7,
				step: 0.05,
			});
			//точки
			graph9AmarkCircles(ctx, points, 2, 0.15);
			//всп полоска
			ctx.setLineDash([0.25, 0.5]);
			ctx.drawLine(-a, -9, -a, 9);
		};
		NAtask.setTask({
			text: `На рисунке изображён график функции $f(x)=\\frac{k}{x${`+a`.esli(!randA)}}$. Найдите ${find}.`,
			answers: answ,
			analys: (`$f(x)=\\frac{${k}}{x+${a.esli(a)}}$`).plusminus(),
			preference: [preference1, preference2],
		});
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	});
})();
//508971 508983

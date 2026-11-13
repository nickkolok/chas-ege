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
		let x = -a + [0.25, 0.5].iz().pm();
		let y = f(x);
		genAssert(Math.abs(y) >= 10, 'Спрашиваемое f(x) видно на графике');

		let find = randFind ? `значение $x$, при котором $f(x)=${y}$` : `$f(${x})$`;
		let answ = randFind ? x : y;
		let denominator = ('x' + ('+' + a).esli(a)).plusminus();

		let points = intPoints(f, {
			minX: -8,
			maxX: 9,
			minY: -8,
			maxY: 8
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
			// Вертикальная асимптота при ненулевом сдвиге
			if (a) {
				ctx.setLineDash([0.25, 0.5]);
				ctx.drawLine(-a, -9, -a, 9);
			}
		};
		NAtask.setTask({
			text: `На рисунке изображён график функции $f(x)=\\frac{k}{x${`+a`.esli(!randA)}}$. Найдите ${find}.`,
			answers: answ,
			analys: `$f(x)=\\frac{${k}}{${denominator}}$`,
			preference: [preference1, preference2],
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	});
})();
//508971 508983

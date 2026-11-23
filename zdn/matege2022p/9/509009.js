(function () {
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		function f(x) {
			return math.log(x, a) + b;
		}

		let key = '509009';
		let preference1 = ['functionOfX', 'valueX'];
		let preference2 = ['withB', 'withoutB'];
		let preference3 = ['integerA', 'decimalA'];

		let randFind = getSelectedPreferenceFromList(key, preference1);
		let randB = getSelectedPreferenceFromList(key, preference2);
		let randA = getSelectedPreferenceFromList(key, preference3);

		let a = [sl(2, 8), [0.25, 0.2, 0.125].iz()][randA];
		let b = [sluchch(1, 7).pm(), 0][randB];
		let exponent = sluchch(1, 5);
		if (randA)
			exponent = -exponent;
		let x = a ** exponent;
		let y = exponent + b;

		genAssert(x < 1000);
		genAssertZ1000(x);
		x = Math.round(x * 1000) / 1000;
		genAssert(x > 8.5, 'Аргумент должен находиться за пределами изображённого участка графика');
		if (!randA)
			genAssert(Math.abs(y) > [6, 2][randB]);

		let points = intPoints(f, {
			minX: 1,
			maxX: 9,
			minY: -8,
			maxY: 8
		});
		genAssert(points.length >= 2, 'Недостаточно точек');

		let find = randFind ? `значение $x$, при котором $f(x)=${y}$` : `$f(${x})$`;
		let answ = randFind ? x : y;
		let w = 400, h = 400;
		let scale = 20;
		let paint1 = function (ct) {
			//Оси координат
			ct.drawCoordinatePlane(w, h, {
				hor: 1,
				ver: 1
			}, {
				x1: '1',
				y1: '1',
				sh1: 13,
			}, scale);
			//график
			ct.scale(scale, -scale);
			ct.lineWidth = 0.1;

			graph9AdrawFunction(ct, f, {
				minX: 0,
				maxX: 8.5,
				minY: -8.8,
				maxY: 8.5,
				step: 0.05
			});
			//точки
			graph9AmarkCircles(ct, points, 2, 0.15);
		};
		NAtask.setTask({
			text: `На рисунке изображён график функции $f(x)=${`b+`.esli(!randB)}\\log_{a}{x}$. Найдите ${find}. `,
			answers: answ,
			analys: `$f(x)=${(b + '+').esli(b)}\\log_{${a}}{x}$`,
			preference: [preference1, preference2, preference3],
		});
		NAtask.modifiers.addCanvasIllustration({
			width: w,
			height: h,
			paint: paint1,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 1000);
})();
//509009


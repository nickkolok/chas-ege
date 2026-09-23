(function () {
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		function f(x) {
			if (a > 0)
				return Math.pow(a, x) + b;
			return -Math.pow(a.abs(), x) + b;
		}

		let key = '509095';
		let preference1 = ['functionOfX', 'valueX'];
		let preference2 = ['withB', 'withoutB'];
		let randFind = getSelectedPreferenceFromList(key, preference1);
		let randB = getSelectedPreferenceFromList(key, preference2);

		let a = [[0.25, 0.1, 0.2, 0.125].iz(), sl(2, 5)].iz().pm();
		let b = [sluchch(1, 10).pm(), 0][randB];
		let chisl = sluchch(0, 10).pm();
		genAssert(f(chisl).abs() >= 8);
		genAssertAlmostInteger(chisl);
		genAssertZ1000(f(chisl));
		genAssert(f(chisl).abs() < 1000);

		//слишком большое
		let find, answ;
		if (!randFind) {
			find = `$f(${chisl})$`;
			answ = f(chisl);
		} else {
			answ = chisl;
			find = `значение $x$, при котором $f(x)=${f(chisl)}$`;
		}

		let points = intPoints(f, {
			minX: -8,
			maxX: 8,
			minY: -8,
			maxY: 8
		});

		genAssert(points.length >= 2, 'Недостаточно точек');

		let paint1 = function (ct) {
			let h = 400;
			let w = 400;
			//Оси координат
			ct.drawCoordinatePlane(w, h, {
				hor: 1,
				ver: 1
			}, {
				x1: '1',
				y1: '1',
				sh1: 13,
			}, 20);
			ct.scale(20, -20);
			ct.lineWidth = 0.1;
			//график
			graph9AdrawFunction(ct, f, {
				minX: -8.5,
				maxX: 8.5,
				minY: -9.5,
				maxY: 8.5,
				step: 0.05
			});
			//точки
			graph9AmarkCircles(ct, points, 2, 0.15);
		};
		NAtask.setTask({
			text: `На рисунке изображён график функции $f(x)=${` - `.esli(a < 0)}a^x${`+b`.esli(!randB)}$. Найдите ${find}. `,
			answers: answ,
			analys: (`$f(x)=${a}^{x}+${b}$`).replace('+0', '').plusminus(),
			preference: [preference1, preference2],
		});
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 100000);
})();
//509095 509089

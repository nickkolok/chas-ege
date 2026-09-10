(function () {
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '509113';
		let preference = ['functionOfX', 'valueX'];
		let rand = getSelectedPreferenceFromList(key, preference);

		function f(x) {
			return k * Math.sqrt(x);
		}

		let k = sluchch(1, 5).pm() / [1, 2].iz();
		let chisl = Math.pow(sluchch(6, 20), 2);
		chisl *= (10).pow(sl(-2, 2));

		let fOfChisl = f(chisl);

		genAssertZ1000(chisl);
		genAssertZ1000(fOfChisl);

		let points = intPoints(f, {
			minX: 0.1,
			maxX: 7,
			minY: -7,
			maxY: 7
		});

		genAssert(points.length > 0, 'Точек недостаточно');

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

			ctx.scale(20, -20);
			ctx.lineWidth = 0.1;

			graph9AdrawFunction(ctx, f, {
				minX: -0.5,
				maxX: 8.5,
				minY: -8.5,
				maxY: 8.5,
				step: 0.05,
				scale: 20,
			});

			graph9AmarkCircles(ctx, points, 1, 0.2);
		};


		NAtask.setTask({
			text: `На рисунке изображён график функции $f(x)=k\\sqrt{x}$. Найдите `,
			questions: [
				[{
					text: `$f(${chisl})$`,
					answer: fOfChisl,
				}, {
					text: `значение $x$, при котором $f(x)=${fOfChisl}$`,
					answer: chisl,
					analys: (`, $x=\\left(\\frac{${fOfChisl}}{${k}}\\right)^2$`).plusminus(),
				},][rand]
			],
			postquestion: `.`,
			preference: preference,
			analys: `$f(x)=` + k + `\\sqrt{x}$`,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	});
})();
//509113 509118

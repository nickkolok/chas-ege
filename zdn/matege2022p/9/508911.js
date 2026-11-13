(function () {
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		function parabl(x) {
			return a * x * x + b * x + c;
		}

		let key = '508911';
		let preference = ['dontShow', 'showA', 'showB', 'showC'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let a = sluchch(1, 2).pm();
		let b = sluchch(0, 10).pm();
		let c = sluchch(0, 10).pm();
		let D = b * b - 4 * a * c;
		genAssert(D >= 0, 'Дискриминант меньше нуля');
		genAssert(D.isPolnKvadr(), 'Дискриминант не полный квадрат');
		let x0 = -b / (2 * a);
		let y0 = parabl(x0);
		genAssert(Math.abs(x0) <= 6, 'Абсцисса вершины параболы не видна');
		genAssert(Math.abs(y0) <= 5, 'Ордината вершины параболы не видна');

		let chisl = sluchch(7, 20, 0.5).pm();
		let answ = parabl(chisl);

		let minX = -8.5,
			maxX = 8.5,
			minY = -9.5,
			maxY = 7.5;

		let points = intPoints(parabl, {
			minX,
			maxX,
			minY,
			maxY
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

			let scale = 20;
			ctx.scale(scale, -scale);
			ctx.lineWidth = 2 / scale;

			//график
			graph9AdrawFunction(ctx, parabl, {
				minX,
				maxX,
				minY,
				maxY: maxY + 1,
				step: 0.01,
			});

			//точки
			graph9AmarkCircles(ctx, points, undefined, 4 / scale);
		};
		let text;
		let pointsCount = rand === 0 ? 3 : 2;
		switch (rand) {
			case 0:
				genAssert(x0.isZ() && y0.isZ() && Math.abs(a) !== 1,
					'Для варианта без известных коэффициентов нужны целочисленная вершина и |a| = 2');
				text = 'ax^2+bx+c';
				break;
			case 1:
				text = `${a}x^2+bx+c`;
				break;
			case 2: {
				genAssert(b !== 0, 'В варианте с известным b коэффициент b должен быть ненулевым');
				text = `ax^2+${b}x+c`;
				// После вычитания bx остаётся ax² + c, поэтому нужны разные x².
				genAssertNonempty(points);
				let first = points.iz();
				let otherPoints = points.filter(([x]) => Math.abs(x) !== Math.abs(first[0]));
				genAssertNonempty(otherPoints, 'Для определения a и c нужны точки с разными x²');
				points = [first, otherPoints.iz()];
				break;
			}
			case 3:
				genAssert(c !== 0, 'В варианте с известным c коэффициент c должен быть ненулевым');
				text = `ax^2+bx+${c}`;
				points = points.filter(([x]) => x !== 0);
				break;
		}
		genAssert(points.length >= pointsCount, 'Недостаточно точек для определения коэффициентов');
		points = points.iz(pointsCount);
		NAtask.setTask({
			text: `На рисунке изображён график функции $f(x)=${text.plusminus()}$${`, где $a$, $b$ и $c$ — целые числа`.esli(rand === 0)}. Найдите $f(${chisl})$.`,
			answers: answ,
			analys: `$f(x)=${[c, b, a].mn_txt('x')}$`,
			preference,
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	});
})();
//508911 et al

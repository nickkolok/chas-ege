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
			graph9AmarkCircles(ctx, points, 3, 4 / scale);
		};
		let text = `ax^2+`;
		switch (rand) {
			case 0:
				genAssert((x0.isZ() && y0.isZ()) && Math.abs(a) != 1);
				text = `ax^2+bx+c`;
				break;
			case 1:
				text = `${a}x^2+bx+c`.plusminus();
				points.pop();
				break;
			case 2:
				genAssert(!c && b);
				text += (`${b}x+c`).plusminus();
				break;
			case 3:
				genAssert(c);
				text += (`bx+${c}`).plusminus();
				points = points.filter(v => v[0]);
				if (points.length > 2)
					points.pop();
				break;
		}
		NAtask.setTask({
			text: `На рисунке изображён график функции $f(x)=${text.plusminus()}$${`, где числа $a,	$ $b$ и $c $ - целые`.esli(rand == 0)}. Найдите $f(${chisl})$.`,
			answers: answ,
			analys: `$f(x)=${(a + `	x ^ 2 + ` + b + `x + ` + c).replace('+0x', '').replace('+0', '').plusminus()}$`.plusminus(),
			preference,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	});
})();
//508911 et al
//TODO

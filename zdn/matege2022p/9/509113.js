(function () {
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '509113';
		let preference = ['functionOfX', 'valueX'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let radicand = [1, 2].iz();
		let factor = radicand === 1 ? sluchch(1, 5).pm() / [1, 2].iz() : (1).pm();
		let k = factor * Math.sqrt(radicand);
		let kTex = radicand === 1 ? String(k) : (factor < 0 ? '-' : '') + '\\sqrt{2}';

		function f(x) {
			return factor * Math.sqrt(radicand * x);
		}

		// Для k = ±√2 берём x = t²/2, чтобы значение функции было рациональным.
		let chisl = Math.pow(sluchch(6, 20), 2) * Math.pow(100, sl(-1, 1)) / radicand;
		let fOfChisl = f(chisl);

		genAssertZ1000(chisl, 'Абсцисса должна иметь не более трёх знаков после запятой');
		genAssertZ1000(fOfChisl, 'Значение функции должно иметь не более трёх знаков после запятой');

		let width = 400;
		let height = 400;
		let scale = 20;
		let originX = sluchch(3, 6) * scale;
		let originY = height / 2;
		let maxX = (width - originX - scale) / scale;
		let maxY = (originY - scale) / scale;
		let points = intPoints(f, {
			minX: 1,
			maxX,
			minY: -7,
			maxY: 7
		});

		genAssertNonempty(points, 'Нет видимой точки с целыми координатами при x > 0');

		let paint1 = function (ctx) {
			ctx.lineWidth = 0.5;
			ctx.irregularGrid(width, height, scale, scale);
			ctx.translate(originX, originY);
			ctx.lineWidth = 1.5;
			ctx.drawArrow(10 - originX, 0, width - originX - 10, 0);
			ctx.drawArrow(0, height - originY - 10, 0, 10 - originY);
			ctx.font = '13px liberation_sans';
			ctx.fillText('x', width - originX - 20, 15);
			ctx.fillText('y', -15, 20 - originY);
			ctx.fillText('0', -10, 12);
			ctx.fillText('1', scale, 15);
			ctx.fillText('1', -15, -scale);
			ctx.drawLine(scale, 5, scale, -5);
			ctx.drawLine(-5, -scale, 5, -scale);
			ctx.scale(scale, -scale);
			ctx.lineWidth = 2 / scale;

			// Равные шаги по t дают более мелкие шаги по x = t² у начала координат.
			let maxT = Math.min(Math.sqrt(maxX), maxY / Math.abs(k));
			let segments = Math.ceil(2 * scale * maxT);
			ctx.beginPath();
			ctx.moveTo(0, 0);
			for (let i = 1; i <= segments; i++) {
				let t = maxT * i / segments;
				ctx.lineTo(t * t, k * t);
			}
			ctx.stroke();
			graph9AmarkCircles(ctx, points, 1, 4 / scale);
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
					analys: (`, $x=\\left(\\frac{${fOfChisl}}{${kTex}}\\right)^2$`).plusminus(),
				},][rand]
			],
			postquestion: `.`,
			preference: preference,
			analys: ('$f(x)=' + kTex + '\\sqrt{x}$').plusminus(),
		});
		NAtask.modifiers.addCanvasIllustration({
			width,
			height,
			paint: paint1,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	});
})();
//509113 509118

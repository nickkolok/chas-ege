(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let key = "11382";
		let letters = om.latbukv.slice(0, 3).concat('M');
		let preference = ['length_BC_by_median_and_base', 'median', 'length_BC_by_median_and_area'];
		let rand = getSelectedPreferenceFromList(key, preference);


		// Равнобедренный треугольник с основанием AB: медиана CM — она же высота,
		// так что медиана, половина основания и боковая сторона — прямоугольный треугольник.
		let median, side, base, areaTex;
		if (rand < 2) {
			// Первые два варианта (как в ФИПИ): все данные и ответ целые —
			// медиана, половина основания и боковая сторона образуют пифагорову тройку k(m² − n², 2mn, m² + n²)
			let m = sl(2, 10);
			let n = sl(1, m - 1);
			genAssertIrreducible(m, n, 'Тройка не примитивная');
			genAssert((m - n) % 2 === 1, 'Тройка не примитивная');
			let k = sl(1, 21);
			side = k * (m * m + n * n);
			genAssert(side <= 105, 'Слишком большая сторона');
			let legs = [k * (m * m - n * n), k * 2 * m * n].shuffle();
			median = legs[0];
			base = 2 * legs[1];
		} else {
			// Третий вариант (как в ФИПИ): медиана и боковая сторона целые,
			// половина основания и площадь — вообще говоря, иррациональные, площадь пишется как k√n
			side = sl(3, 15);
			median = sl(2, side - 1);
			base = 2 * (side * side - median * median).sqrt();
			areaTex = (median * median * (side * side - median * median)).texsqrt(1);
		}
		genAssert(median.mzhd(base / 14, base * 3), 'Медиана несоразмерна основанию — плохой чертёж');

		let triangle = new Triangle({
			lengths: {
				lengthAB: base,
				lengthBC: side,
				lengthCA: side,
			},
			supplementary: {
				calculateMedians: true,
			}
		});

		triangle.addVertexToConnectionMatrix(triangle.medianC.pe, 'C');

		// autoScale масштабирует относительно начала координат и требует, чтобы исходные координаты
		// уже помещались в поле (±160); при сторонах до 105 это не так. Поэтому сначала центрируем
		// фигуру по габаритам и уменьшаем, а увеличит её уже autoScale
		let xs = triangle.vertices.map((p) => p.x);
		let ys = triangle.vertices.map((p) => p.y);
		let centerX = (Math.min(...xs) + Math.max(...xs)) / 2;
		let centerY = (Math.min(...ys) + Math.max(...ys)) / 2;
		let size = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
		let points = autoScale(triangle.vertices.map((p) => ({ x: (p.x - centerX) / size * 10, y: (p.y - centerY) / size * 10 })));

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.lineWidth = 2;
			ctx.drawFigure(points, triangle.connectionMatrix);

			ctx.strokeStyle = om.primaryBrandColors.iz();

			ctx.strokeInMiddleOfSegment(points[0].x, points[0].y, points[3].x, points[3].y, 7);
			ctx.strokeInMiddleOfSegment(points[1].x, points[1].y, points[3].x, points[3].y, 7);

			if (rand !== 0) { // медиана не перпендикулярна по условию — отмечаем равные боковые стороны
				ctx.strokeInMiddleOfSegment(points[0].x, points[0].y, points[2].x, points[2].y, 7, 2);
				ctx.strokeInMiddleOfSegment(points[1].x, points[1].y, points[2].x, points[2].y, 7, 2);
			} else {
				ctx.arcBetweenSegments([points[2].x, points[2].y, points[3].x, points[3].y, points[0].x, points[0].y], 15);
			}

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i != 2) ? 25 : -5)));
		};

		NAtask.setTask({
			text: `В треугольнике $ABC$ `,
			questions: [
				[{
					text: `медиана $CM$ перпендикулярна $AB$. Найдите $BC$, если $CM=${median}$, $AB = ${base}$.`,
					answers: side,
				}, {
					text: `известно, что $BC=CA=${side}$, $AB = ${base}$. Найдите длину медианы $CM$.`,
					answers: median,
				}, {
					text: `известно, что $BC=CA$, медиана $CM$ равна $${median}$. Площадь треугольника $ABC$ равна $${areaTex}$. Найдите длину стороны $BC$.`,
					answers: side,
				}][rand]
			],
			authors: ['Александра Суматохина'],
			preference: preference,
		});
		NAtask.modifiers.variativeABC(letters);

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 2000);
	NAtask.modifiers.allDecimalsToStandard(true);
})();
// https://base.mathege.ru/clones/?position=16&parent=11382
// https://base.mathege.ru/clones/?position=16&parent=6583
// https://base.mathege.ru/clones/?position=&parent=6693

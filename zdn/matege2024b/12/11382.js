(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let key = "11382";
		let letters = om.latbukv.slice(0, 3).concat('M');
		let preference = ['length_BC_by_median_and_base', 'median', 'length_BC_by_median_and_area'];
		let rand = getSelectedPreferenceFromList(key, preference);


		// Равнобедренный треугольник с основанием AB: медиана CM — она же высота,
		// так что медиана, половина основания и боковая сторона — прямоугольный треугольник.
		let median, side, base, areaTex = '';
		if (rand < 2) {
			// Первые два варианта (как в ФИПИ): все данные и ответ целые —
			// медиана, половина основания и боковая сторона образуют пифагорову тройку
			// (боковая сторона до 105: в ФИПИ есть 101 при медиане 20 и основании 198)
			let triple = genPifag(105);
			side = triple[2];
			let legs = triple.slice(0, 2).shuffle();
			median = legs[0];
			base = 2 * legs[1];
		} else {
			// Третий вариант (как в ФИПИ): медиана и боковая сторона целые,
			// половина основания и площадь — вообще говоря, иррациональные, площадь пишется как k√n
			side = sl(3, 15);
			median = sl(2, side - 1);
			let halfBaseSquared = side * side - median * median;
			base = 2 * halfBaseSquared.sqrt();
			areaTex = (median * median * halfBaseSquared).texsqrt(1);
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

		let points = autoScale(triangle.vertices, undefined, [], {center: true, shrink: true});

		let paint1 = function(ctx) {

			ctx.translateToCenter();

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

			ctx.signVertices(points, letters, {above: [2]});
		};

		NAtask.setTask({
			text: `В треугольнике $ABC$ `,
			questions: [
				[{
					text: `медиана $CM$ перпендикулярна $AB$. Найдите $BC$, если $CM = ${median}$, $AB = ${base}$.`,
					answers: side,
				}, {
					text: `известно, что $BC = CA = ${side}$, $AB = ${base}$. Найдите длину медианы $CM$.`,
					answers: median,
				}, {
					text: `известно, что $BC = CA$, медиана $CM$ равна $${median}$. Площадь треугольника $ABC$ равна $${areaTex}$. Найдите длину стороны $BC$.`,
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

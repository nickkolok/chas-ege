(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let key = "11382";
		let letters = om.latbukv.slice(0, 3).concat('M');
		// Четвёртый вариант — медиана по сторонам, но словами, без букв и без чертежа, как в 7337B8
		let preference = ['length_BC_by_median_and_base', 'median', 'length_BC_by_median_and_area', 'median_without_letters'];
		let rand = getSelectedPreferenceFromList(key, preference);


		// Равнобедренный треугольник с основанием AB: медиана CM — она же высота,
		// так что медиана, половина основания и боковая сторона — прямоугольный треугольник.
		let median, side, base, areaTex = '';
		if (rand != 2) {
			// Первый, второй и четвёртый варианты (как в ФИПИ): все данные и ответ целые —
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
				ctx.arcBetweenSegments([points[2], points[3], points[0]], 15);
			}

			ctx.signVertices(points, letters, {above: [2]});
		};

		NAtask.setTask({
			text: (rand == 3) ? `В треугольнике ` : `В треугольнике $ABC$ `,
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
				}, {
					text: `каждая из двух сторон равна $${side}$, а третья сторона равна $${base}$. Найдите длину медианы, проведённой к третьей стороне треугольника.`,
					answers: median,
				}][rand]
			],
			authors: ['Александра Суматохина'],
			preference: [preference],
		});
		NAtask.modifiers.variativeABC(letters);

		if (rand != 3) { // в задаче без букв чертежа нет, как в 7337B8
			NAtask.modifiers.addCanvasIllustration({
				width: 400,
				height: 400,
				paint: paint1,
			});
		}
	}, 2000);
	NAtask.modifiers.allDecimalsToStandard(true);
})();
// https://base.mathege.ru/clones/?position=16&parent=11382
// https://base.mathege.ru/clones/?position=16&parent=6583
// https://base.mathege.ru/clones/?position=&parent=6693
// ФИПИ 264495 897EB3 07CBE7 1F6381 5A99F5 1BDF2A 4F21E0 8FF362 298933 8F9B38 A867B4 1239EC 57A768 871733 21F78D 8CF626 E5F3BF 607432 4F7241 B40F11 12EA33 7337B8 FB3E1E 4FCE6B 62AD84 73729B 47DD85 1A5F4B 793CB7 A56690 358537 10AF36 C427FE 56BF7C E51674 5EDB71 E00A5F

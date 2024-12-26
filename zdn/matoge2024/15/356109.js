(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let letters = latbukv.slice(0, 3);

		let key = "356109";
		let variant = getListedPreference(key, [{
			preference: 'side_from_sinA',
			preferenceValue: 0,
		}, {
			preference: 'side_from_cosA',
			preferenceValue: 1,
		}, {
			preference: 'side_from_tgA',
			preferenceValue: 2,
		}, {
			preference: 'side_from_ctgA',
			preferenceValue: 3,
		}, {
			preference: 'side_from_sinC',
			preferenceValue: 4,
		}, {
			preference: 'side_from_cosC',
			preferenceValue: 5,
		}, {
			preference: 'side_from_tgC',
			preferenceValue: 6,
		}, {
			preference: 'side_from_ctgC',
			preferenceValue: 7,
		}], sl(0, 7));

		let triangle = new Triangle({
			lengths: {
				lengthAB: sl(5, 20),
				lengthBC: sl(5, 20),
			},
			angles: {
				angle: Math.PI / 2,
			},
		});
		genAssert(![triangle.lengthAB, triangle.lengthBC, triangle.lengthCA].hasDubl(),
			'Все стороны треугольника должны быть разными');

		let funcDano = ['sin', 'cos', 'tg', 'ctg'][variant % 4] + ' ' + ['A', 'C'][variant < 4 ? 0 : 1];
		let sides;

		switch (true) {
		case [0, 5].includes(variant):
			sides = ['CA', 'BC'];
			break;
		case [1, 4].includes(variant):
			sides = ['CA', 'AB'];
			break;
		case [2, 6].includes(variant):
			sides = ['AB', 'BC'];
			break;
		case [3, 7].includes(variant):
			sides = ['BC', 'AB'];
			break;
		}

		sides = sides.map(side => {
			switch (side) {
			case 'AB':
				return [triangle.lengthAB, side];
			case 'BC':
				return [triangle.lengthBC, side];
			case 'CA':
				return [triangle.lengthCA, side];
			}
		});

		let funcValue = [triangle.sinA, triangle.cosA, triangle.tgA, triangle.ctgA, triangle.sinC, triangle.cosC, triangle.tgC, triangle.ctgC][variant];
		genAssertZ1000(funcValue);

		let points = autoScale(triangle.vertices);

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, triangle.connectionMatrix);

			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.arcBetweenSegments([points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y], 20);

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i < points.length / 2) ? 25 : -5)));
		};

		NAtask.setTask({
			text: `В треугольнике $ABC$ угол $B$ равен $90^{\\circ}$, $${sides[0][1]}=${sides[0][0]}$, $\\${funcDano}=${funcValue.texrndfrac(1)}$. Найдите $${sides[1][1]}$.`,
			answers: sides[1][0],
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.variativeABC(letters);

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 2000);

})();
// 356109 356119 356129 356110 356111 356112 356113 356114 356115 356116 356117 356118 356120 356121 356122 356123 356124 356125 356126 356127 356128 356130 356131 356132 356133 356134 356135 356136 356137 356138 401192 401229 401315 401518 401548 402009 402011 402173 402324 402352 402509 402708 402848 402993 403132 403656 403768 403995 404203 404207 404260

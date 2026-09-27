(function () {
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let letters = om.latbukv.slice(0, 3);

		let key = "356109";
		let preference = ['side_from_sinA', 'side_from_cosA', 'side_from_tgA', 'side_from_ctgA', 'side_from_sinC', 'side_from_cosC', 'side_from_tgC', 'side_from_ctgC'];
		let variant = getSelectedPreferenceFromList(key, preference);

		let triangle = new Triangle({
			lengths: {
				lengthAB: sl(5, 20),
				lengthBC: sl(5, 20),
			},
			angles: {
				angle: Math.PI / 2,
			},
		});
		genAssert(!triangle.isIsosceles(), 'Все стороны треугольника должны быть разными');

		let funcDano = ['sin', 'cos', 'tg', 'ctg'][variant % 4] + ' ' + ['A', 'C'][variant < 4 ? 0 : 1];
		let sides;

		switch (variant) {
			case 0:
			case 5:
				sides = ['CA', 'BC'];
				break;
			case 1:
			case 4:
				sides = ['CA', 'AB'];
				break;
			case 2:
			case 6:
				sides = ['AB', 'BC'];
				break;
			case 3:
			case 7:
				sides = ['BC', 'AB'];
				break;
		}

		sides = sides.map(side => {
			return [ triangle['length'+side], side];
		});

		let funcValue = [triangle.sinA, triangle.cosA, triangle.tgA, triangle.ctgA, triangle.sinC, triangle.cosC, triangle.tgC, triangle.ctgC][variant];
		genAssertZ1000(funcValue);

		let points = autoScale(triangle.vertices);

		let paint1 = function (ctx) {
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
			preference: preference,
		});
		NAtask.modifiers.variativeABC(letters);

		NAtask.modifiers.allDecimalsToStandard(/*true*/);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 2000);

})();
// 356109 356119 356129 356110 356111 356112 356113 356114 356115 356116 356117 356118 356120 356121 356122 356123 356124 356125 356126 356127 356128 356130 356131 356132 356133 356134 356135 356136 356137 356138 401192 401229 401315 401518 401548 402009 402011 402173 402324 402352 402509 402708 402848 402993 403132 403656 403768 403995 404203 404207 404260

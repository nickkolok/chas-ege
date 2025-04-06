(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let key = '11021';
		let preference = ['tgC', 'sinA', 'cosA'];

		let rand = getListedPreference(key, preference.map((pref, index) => ({
			preference: pref,
			preferenceValue: index
		})), sl(preference.length - 1));

		let letters = latbukv.slice(0, 3).concat('H');

		let a = sl(5, 25);
		let triangle = new Triangle({
			lengths: {
				lengthAB: a,
				lengthBC: slKrome(a, 5, 25),
			},
			angles: {
				angle: Math.PI / 2,
			},
		});

		let func = [
			['\\tg C', triangle.tgC],
			['\\sin A', triangle.sinA],
			['\\cos A', triangle.cosA]
		][rand];

		func[1] = func[1].pow(2);

		if (rand == 0) {
			genAssert(func[1].isAlmostInteger());
			func[1] = func[1].texsqrt(1);
		} else {
			genAssertZ1000(func[1]);
			func[1] = func[1].texsqrtfrac(1);
		}

		let side = [
			['BC', triangle.lengthBC],
			['CA', triangle.lengthCA],
			['CA', triangle.lengthCA]
		][rand];

		side[1] = side[1].pow(2).texsqrt(1);

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
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i != 2) ? 25 : -5)));
		};

		NAtask.setTask({
			text: `В треугольнике $ABC$ угол $B$ равен $90^\\circ$, $${side.join('=')}$, $${func.join('=')}$. Найдите площадь треугольника.`,
			answers: triangle.area(),
			authors: ['Александра Суматохина'],
			preference: preference,
		});
		NAtask.modifiers.variativeABC(letters);
		NAtask.modifiers.allDecimalsToStandard(true);

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 2000);

})();
// https://base.mathege.ru/clones/?position=16&parent=11021
// https://base.mathege.ru/clones/?position=16&parent=10031
// https://base.mathege.ru/clones/?position=16&parent=11072

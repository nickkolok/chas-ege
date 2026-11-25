(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let key = '11740';
		let preference = ['sin_CAD', 'tg_CAB'];

		let rand = getSelectedPreferenceFromList(key, preference);

		let letters = latbukv.slice(0, 4);
		let a = sl(5, 20);

		let rect = new Rectangle({
			lengths: {
				lengthAB: a,
				lengthBC: slKrome(a, 5, 20)
			}
		});

		let angleCAD = new Angle(rect.pointC, rect.pointA, rect.pointD).angleInRadians;
		let angleCAB = new Angle(rect.pointC, rect.pointA, rect.pointB).angleInRadians;

		let func = [angleCAD.sin(), angleCAB.tg()][rand].pow(2);

		genAssertZ1000(func);

		rect.connectVerticesInConnectionMatrix([0,2]);

		let points = autoScale(rect.vertices);

		let paint1 = function(ctx) {

			ctx.translateToCenter();

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.lineWidth = 2;
			ctx.drawFigure(points, rect.connectionMatrix);

			ctx.signVertices(points, letters);
		};

		NAtask.setTask({
			text: `В прямоугольнике $ABCD$ сторона $${[[`BC`, rect.lengthBC], [`AB`, rect.lengthAB]][rand].join(`$ равна $`)}$, $${[[`\\sin \\angle CAD`, `\\tg \\angle CAB`][rand], func.texsqrtfrac(1)].join(`=`)}$. Найдите площадь прямоугольника.`,
			answers: rect.area(),
			authors: ['Александра Суматохина'],
			preference: preference,
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});

	}, 2000);
	NAtask.modifiers.allDecimalsToStandard(true);
})();
// https://base.mathege.ru/clones/?position=16&parent=11740


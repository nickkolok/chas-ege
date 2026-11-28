(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let key = '11067';
		let preference = ['height', 'hypotenuse'];

		let rand = getSelectedPreferenceFromList(key, preference);
		// Формулировка: обычная или как у части заданий ФИПИ. В задаче на гипотенузу второй вариант —
		// без «равна» и «равен»: «Площадь прямоугольного треугольника 210. Один из катетов 21» (09CFDB и ещё 5),
		// в задаче на высоту — «Найдите длину высоты, опущенной на гипотенузу этого треугольника» (A03373)
		let preferenceWording = ['mainWording', 'altWording'];
		let randWording = getSelectedPreferenceFromList(key, preferenceWording);

		let a = sl(1, 50);

		let triangle = new Triangle({
			lengths: {
				lengthAB: a,
				lengthBC: slKrome(a, 1, 50),
			},
			angles: {
				angle: Math.PI / 2,
			},
			supplementary: {
				calculateHeights: true,
			}
		});

		let question = [{
			text: `В прямоугольном треугольнике катеты равны $${triangle.lengthAB}$ и $${triangle.lengthBC}$. Найдите ${['высоту, опущенную на гипотенузу', 'длину высоты, опущенной на гипотенузу этого треугольника'][randWording]}.`,
			answers: triangle.heightBLength,
		},{
			text: `Площадь прямоугольного треугольника${[' равна', ''][randWording]} $${triangle.area()}$. Один из катетов${[' равен', ''][randWording]} $${[triangle.lengthAB, triangle.lengthBC].iz()}$. Найдите гипотенузу этого треугольника.`,
			answers: triangle.lengthCA,
		}][rand];
		genAssertZ1000(question.answers);

		let points = autoScale(triangle.vertices);

		let paint1 = function(ctx) {

			ctx.translateToCenter();

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.lineWidth = 2;
			ctx.drawFigure(points, triangle.connectionMatrix);

			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.arcBetweenSegments([points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y], 20);
		};

		NAtask.setTask({
			text: ``,
			questions: [question],
			authors: ['Александра Суматохина'],
			preference: [preference, preferenceWording],
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 2000);

})();
// https://base.mathege.ru/clones/?position=16&parent=11067
// https://base.mathege.ru/clones/?position=16&parent=10983
// ФИПИ 09CFDB 60BF62 0D9384 66198C A4C078 EFD55A 4FE6FE 9CD0D5 143DC9 F0D28B 50FBF6 3B8906 E88A15 2AFE28 E856DF A03373

(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let letters = latbukv.slice(0, 4).concat('O');
		let a = sl(5, 10);
		let b = slKrome(a, 5, 10);
		let A = ((3 * b.pow(2) - a.pow(2)) / (2 * a * b)).acos();
		genAssert((A - Math.PI).abs() > 0.5, 'Получился блин');

		let par = new Parallelogram({
			lengths: {
				lengthAB: a,
				lengthBC: b
			},
			angles: {
				angle: {
					angleA: A
				},
			},
		});

		let angleDano = new Angle(par.pointA, par.pointC, par.pointB).angleInDegrees.ceil();
		let angleAnsw = 0.5 * (180 - angleDano);

		par.connectVerticesInConnectionMatrix([
			[0, 2],
			[1, 3]
		]);

		let points = autoScale(par.vertices);

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, par.connectionMatrix);

			ctx.scale(1, -1);
			ctx.font = "20px liberation_sans";
			ctx.fillText(letters.slice(-1), 0, 0);
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i < points.length / 2) ? 25 : -5)));
		};

		NAtask.setTask({
			text: `В параллелограмме $ABCD$ диагональ $AC$ в два раза больше стороны $${['BC', 'DA'].iz()}$ и $\\angle ${['ACB', 'DAC'].iz()}=${angleDano}^{\\circ}$. Найдите угол между диагоналями параллелограмма. Ответ дайте в градусах.`,
			answers: [angleAnsw, 180 - angleAnsw].minE(),
			authors: ['Александра Суматохина'],
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
// https://mathb-ege.sdamgia.ru/problem?id=506683

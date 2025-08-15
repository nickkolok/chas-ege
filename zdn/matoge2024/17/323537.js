(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let rand = sl1(); //острый/тупой
		let a = sl(10, 50);

		let rect = new Rectangle({
			lengths: {
				lengthAB: a,
				lengthBC: slKrome(a, 10, 50),
			},
		});

		rect.connectVerticesInConnectionMatrix([
			[0, 2],
			[1, 3]
		]);

		let angleDano = ([90, 0].iz() - new Angle(rect.pointB, rect.pointA, rect.pointC).angleInDegrees.ceil()).abs();
		let angleAnsw = 180 - 2 * angleDano;
		genAssert(angleAnsw != 90, `прямой угол`);

		let points = autoScale(rect.vertices);

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigure(points, rect.connectionMatrix);
		};

		NAtask.setTask({
			text: `Диагональ прямоугольника образует угол $${angleDano}^\\circ$ с одной из его сторон. Найдите ${[`острый `, `тупой `][rand]} угол между диагоналями этого прямоугольника. Ответ дайте в градусах.`,
			answers: [angleAnsw, 180 - angleAnsw].sortNumeric()[rand],
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 2000);
	NAtask.modifiers.allDecimalsToStandard(true);
})();
// https://oge.sdamgia.ru/problem?id=323537

(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let letters = latbukv.slice(0, 10);
		let rotate = sl(0, 8, 2);
		let lettersRotate = letters.slice().permuteCyclic((rotate / 2).floor());

		let delta = slKrome(5, 1, 8);
		let a = sl(1, 9 - delta);
		let angleF = [a, 0, a + delta];

		lettersRotate = angleF.map(a => lettersRotate[a]);
		let points = generatePolygonPoints(160, 10);

		let matrixConnections = {
			0: [1, 9],
			2: [1, 3],
			4: [3, 5],
			6: [5, 7],
			8: [7, 9],
		};

		points = autoScale(points);

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.rotate(-rotate * Math.PI / 10);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigureVer2(points, matrixConnections);

			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.drawFigureVer2(points, {
				0: [angleF[0], angleF[2]]
			});

			ctx.font = "20px liberation_sans";
			ctx.rotate(rotate * Math.PI / 10);
			ctx.scale(1, -1);
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i > 5) ? 25 : -5)));

		};

		NAtask.setTask({
			text: `$${letters.join('')}$ – правильный десятиугольник. Найдите угол $${lettersRotate.join('')}$. Ответ дайте в градусах.`,
			answers: 18 * delta,
			authors: ['Александра Суматохина'],
		});
		NAtask.modifiers.variativeABC(letters);
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);

})();
// https://base.mathege.ru/clones/?position=&parent=10954

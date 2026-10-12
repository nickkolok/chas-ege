(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let letters = latbukv.slice(0, 8);
		let rotate = sl(0, 7, 2);
		let lettersRotate = letters.slice().permuteCyclic((rotate / 2).floor());

		let delta = slKrome(4, 1, 6);
		let a = sl(1, 7 - delta);
		let angleF = [a, 0, a + delta];

		lettersRotate = angleF.map(a => lettersRotate[a]);
		let points = generatePolygonPoints(160, 8);

		let matrixConnections = {
			0: [1, 7],
			2: [1, 3],
			4: [3, 5],
			6: [5, 7],
		};

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

			ctx.scale(1, -1);
			ctx.rotate(-rotate * Math.PI / 8);
			ctx.strokeStyle = om.secondaryBrandColors;

			ctx.lineWidth = 2;
			ctx.drawFigureVer2(points, matrixConnections);

			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.drawFigureVer2(points, {
				0: [angleF[0], angleF[2]]
			});

			ctx.font = "20px liberation_sans";
			ctx.rotate(rotate * Math.PI / 8);
			ctx.scale(1, -1);
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i > 4) ? 25 : -5)));

		};

		NAtask.setTask({
			text: `$${letters.join('')}$ – правильный восьмиугольник. Найдите угол $${lettersRotate.join('')}$. Ответ дайте в градусах.`,
			answers: 22.5 * delta,
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
// https://base.mathege.ru/clones/?position=&parent=10953

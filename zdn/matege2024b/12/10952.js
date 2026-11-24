(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let count = 9;
		let letters = latbukv.slice(0, count);
		let rotate = sl(0, count - 1, 2);

		let delta = slKrome(count / 2, 1, count - 2);
		let a = sl(1, count - 1 - delta);
		let angleF = [a, 0, a + delta];

		let lettersRotate = angleF.map(i => letters[i]);
		let points = generatePolygonPoints(140, count);

		let matrixConnections = {};
		for (let i = 0; i < count; i++) {
			matrixConnections[i] = [(i + 1) % count];
		}

		points = autoScale(points, undefined, undefined, {
			startX: -150, finishX: 150, startY: -150, finishY: 150,
		}).map(point => {
			let angle = -rotate * Math.PI / count;
			return {x: point.x * Math.cos(angle) - point.y * Math.sin(angle),
				y: point.x * Math.sin(angle) + point.y * Math.cos(angle)};
		});

		let paint1 = function(ctx) {

			ctx.translateToCenter();

			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.lineWidth = 2;
			ctx.drawFigureVer2(points, matrixConnections);

			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.drawFigureVer2(points, {
				0: [angleF[0], angleF[2]]
			});

			ctx.font = "20px liberation_sans";
			ctx.scale(1, -1);
			points.forEach((elem, i) => {
				const label = labelPositionAwayFrom(elem, {x: 0, y: 0}, 20);
				ctx.fillText(letters[i], label.x, -label.y);
			});

		};

		NAtask.setTask({
			text: `$${letters.join('')}$ – правильный девятиугольник. Найдите угол $${lettersRotate.join('')}$. Ответ дайте в градусах.`,
			answers: 180 / count * delta,
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
// https://base.mathege.ru/clones/?position=&parent=10952


(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let preference = ['nonagon', 'decagon'];
		let count = [9, 10][getSelectedPreferenceFromList('10952', preference)];
		let letters = latbukv.slice(0, count);
		let rotate = sl(0, count - 1, 2);
		let lettersRotate = letters.slice();

		let delta = slKrome(count / 2, 1, count - 2);
		let a = sl(1, count - 1 - delta);
		let angleF = [a, 0, a + delta];

		lettersRotate = angleF.map(i => lettersRotate[i]);
		let points = generatePolygonPoints(160, count);

		let matrixConnections = {};
		for (let i = 0; i < count; i++) {
			matrixConnections[i] = [(i + 1) % count];
		}

		points = autoScale(points).map(point => {
			let angle = -rotate * Math.PI / count;
			return {x: point.x * Math.cos(angle) - point.y * Math.sin(angle),
				y: point.x * Math.sin(angle) + point.y * Math.cos(angle)};
		});

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;

			ctx.translate(w / 2, h / 2);

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
			points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i > 4) ? 25 : -5)));

		};

		NAtask.setTask({
			text: `$${letters.join('')}$ – правильный ${count === 9 ? 'девятиугольник' : 'десятиугольник'}. Найдите угол $${lettersRotate.join('')}$. Ответ дайте в градусах.`,
			answers: 180 / count * delta,
			authors: ['Александра Суматохина'],
			preference: preference,
		});
		NAtask.modifiers.variativeABC(letters);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 1000);

})();
// https://base.mathege.ru/clones/?position=&parent=10952

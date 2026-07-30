(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		// Отношение радиусов k и меньший радиус rSmall подобраны так,
		// чтобы больший радиус не превосходил 14 — как в прототипах ФИПИ.
		let k = sl(2, 7);
		let rSmall = sl(1, Math.floor(14 / k));
		let rBig = k * rSmall;

		let isVolume = ['volume', 'surface'].iz() === 'volume';

		let objectIm = isVolume ? 'объём' : 'площадь поверхности';
		let objectRod = isVolume ? 'объёма' : 'площади поверхности';
		let stepen = isVolume ? 3 : 2;

		let answer = Math.pow(k, stepen);

		// Иллюстрация: два шара в пропорции условия, НЕ касающиеся (зазор как в методичке),
		// центрированные по горизонтали и вписанные в канвас. Зазор пропорционален масштабу
		// композиции (gapRatio от суммы радиусов в пикселях), чтобы смотрелось одинаково
		// и для крошечного, и для крупного меньшего шара.
		let paint = function(ctx) {
			let W = 400;
			ctx.translate(W / 2, W / 2);
			ctx.lineWidth = 2;
			ctx.strokeStyle = om.secondaryBrandColors;

			let margin = 12;
			let maxHalf = W / 2 - margin;
			let gapRatio = 0.3;
			let scale = maxHalf / ((rBig + rSmall) * (1 + gapRatio / 2));
			let R1 = scale * rBig;
			let R2 = scale * rSmall;
			let gap = gapRatio * (R1 + R2);
			let cxBig = -(R2 + gap / 2);
			let cxSmall = R1 + gap / 2;

			let drawSphere = function(cx, R) {
				ctx.beginPath();
				ctx.arc(cx, 0, R, 0, 2 * Math.PI);
				ctx.stroke();

				ctx.beginPath();
				ctx.ellipse(cx, 0, R, R * 0.28, 0, 0, 2 * Math.PI);
				ctx.stroke();

				ctx.setLineDash([5, 4]);
				ctx.beginPath();
				ctx.moveTo(cx, 0);
				ctx.lineTo(cx + 0.66 * R, 0.13 * R);
				ctx.stroke();
				ctx.setLineDash([]);
			};

			drawSphere(cxBig, R1);
			drawSphere(cxSmall, R2);
		};

		NAtask.setTask({
			text: 'Даны два шара с радиусами ' + rBig + ' и ' + rSmall + '. Во сколько раз ' + objectIm + ' большего шара больше ' + objectRod + ' меньшего?',
			answers: answer,
			analys: 'Обозначим радиусы $R = ' + rBig + '$ и $r = ' + rSmall + '$, тогда $\\frac{R}{r} = ' + k + '$. ' + (isVolume ? 'Объёмы шаров относятся как кубы радиусов: $\\left(\\frac{R}{r}\\right)^3 = ' + k + '^3 = ' + answer + '$.' : 'Площади поверхностей шаров относятся как квадраты радиусов: $\\left(\\frac{R}{r}\\right)^2 = ' + k + '^2 = ' + answer + '$.'),
			authors: ['Надежда'],
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint,
		});
	}, 1000);
})();
//509681
/* СдамГИА: 506288 506499 506642 506704 509681 509721 509761 512593 512613 512634 512654 514749 514769 514816 514890 520727 530503 */

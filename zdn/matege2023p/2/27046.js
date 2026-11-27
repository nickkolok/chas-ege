(function() {

	retryWhileError(function() {

		const height = sl(1, 100);
		const ratio = height.polnKvadrMnozh();

		genAssert(ratio != 1);

		const name = sklonlxkand(['диаметр', 'радиус'].iz());

		const variant = sl1();
		const moreLess = [
			['больше', height / ratio.pow(2)],
			['меньше', height * ratio.pow(2)]
		][variant];

		const kBase = sl(2.1, 4, 0.1);
		const strokeColor = om.secondaryBrandColors.iz();
		const liquidColor = om.primaryBrandColors.iz();

		const paint1 = function(ctx) {
			ctx.translate(20, 40);
			ctx.lineWidth = 2;
			const drawHeight = 250;
			ctx.strokeStyle = strokeColor;
			ctx.fillStyle = liquidColor;
			ctx.setLineDash([]);

			const drawCylinder = function(a, k) {
				//жидкость
				ctx.beginPath();
				ctx.ellipse(100, drawHeight / k, a, b, 0, Math.PI, 2 * Math.PI);
				ctx.lineTo(100 + a, drawHeight);
				ctx.ellipse(100, drawHeight, a, b, 0, 0, Math.PI);
				ctx.fill();
				ctx.closePath();

				//высота
				ctx.drawLine(100 - a, drawHeight, 100 - a, 10);
				ctx.drawLine(100 + a, drawHeight, 100 + a, 10);

				//эллипс верхний
				ctx.drawEllipse(100, 10, a, b);

				//эллипс нижний
				ctx.drawEllipse(100, drawHeight, a, b, 0, 0, Math.PI);

				ctx.setLineDash([5, 5]);
				ctx.drawEllipse(100, drawHeight, a, b, 0, Math.PI, 2 * Math.PI);
				ctx.setLineDash([]);

				//эллипс средний
				ctx.drawEllipse(100, drawHeight / k, a, b, 0, 0, Math.PI);

				ctx.setLineDash([5, 5]);
				ctx.drawEllipse(100, drawHeight / k, a, b, 0, Math.PI, 2 * Math.PI);
				ctx.setLineDash([]);
			};

			const b = 20;

			const widths = [70, 100];
			const ks = [kBase, kBase / 2];
			const a1 = widths[variant];
			const k1 = ks[variant];

			if (variant === 0) {
				ctx.translate(-30, 0);
			}
			//первый цилиндр
			drawCylinder(a1, k1);

			ctx.translate(200, 0);

			const a2 = widths[1 - variant];
			const k2 = ks[1 - variant];
			//второй цилиндр
			drawCylinder(a2, k2);

		};

		NAinfo.requireApiVersion(0, 2);
		chas2.task.setTask({
			text: 'В цилиндрическом сосуде уровень жидкости достигает ' + height + ' см. ' +
				'На какой высоте будет находиться уровень жидкости, ' +
				'если её перелить во второй цилиндрический сосуд, ' +
				name.ie + ' которого в ' + chislitlx(ratio, 'раз') + ' ' + moreLess[0] + ' ' + name.re + ' первого? ' +
				'Ответ выразите в сантиметрах.',
			answers: moreLess[1],
			authors: ['Суматохина Александра'],
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//27046 4921 72105 562931 562976 4923 4925 4927 4929 4931 4933 72059 72061 72063 72065 72067 72069 72071 72073 72075 72077 72079 72081 72083 72085 72087 72089 72091 72093 72095 72097 72099 72101 72103


(function() {

	retryWhileError(function() {

		let height = sl(1, 100);
		let ratio = height.polnKvadrMnozh();

		genAssert(ratio != 1);

		let name = sklonlxkand(['диаметр', 'радиус'].iz());

		let variant = sl1();
		let moreLess = [
			['больше', height / ratio.pow(2)],
			['меньше', height * ratio.pow(2)]
		][variant];

		let paint1 = function(ctx) {
			ctx.translate(20, 40);
			ctx.lineWidth = 2;
			let drawHeight = 250;
			ctx.strokeStyle = om.secondaryBrandColors.iz();
			ctx.fillStyle = om.primaryBrandColors.iz();
			ctx.setLineDash([]);

			let drawCylinder = function(a, k) {
				//жидкость
				ctx.beginPath();
				ctx.ellipse(100, drawHeight / k, b, a, Math.PI / 2, Math.PI / 2, 3 * Math.PI / 2);
				ctx.lineTo(100 + a, drawHeight);
				ctx.ellipse(100, drawHeight, b, a, Math.PI / 2, 3 * Math.PI / 2, Math.PI / 2);
				ctx.fill();
				ctx.closePath();

				//высота
				ctx.drawLine(100 - a, drawHeight, 100 - a, 10);
				ctx.drawLine(100 + a, drawHeight, 100 + a, 10);

				//эллипс верхний
				ctx.beginPath();
				ctx.ellipse(100, 10, b, a, Math.PI / 2, 0, 2 * Math.PI);
				ctx.stroke();
				ctx.closePath();

				//эллипс нижний
				ctx.beginPath();
				ctx.ellipse(100, drawHeight, b, a, Math.PI / 2, 3 * Math.PI / 2, Math.PI / 2);
				ctx.stroke();
				ctx.closePath();

				ctx.beginPath();
				ctx.setLineDash([5, 5]);
				ctx.ellipse(100, drawHeight, b, a, Math.PI / 2, Math.PI / 2, 3 * Math.PI / 2);
				ctx.stroke();
				ctx.closePath();
				ctx.setLineDash([]);

				//эллипс средний
				ctx.beginPath();
				ctx.ellipse(100, drawHeight / k, b, a, Math.PI / 2, 3 * Math.PI / 2, Math.PI / 2);
				ctx.stroke();
				ctx.closePath();

				ctx.beginPath();
				ctx.setLineDash([5, 5]);
				ctx.ellipse(100, drawHeight / k, b, a, Math.PI / 2, Math.PI / 2, 3 * Math.PI / 2);
				ctx.stroke();
				ctx.closePath();
				ctx.setLineDash([]);
			};

			let b = 20;
			let kBase = sl(2.1, 4, 0.1);

			let a1 = [70, 100][variant];
			let k1 = [kBase, kBase / 2][variant];

			if (variant === 0)
				ctx.translate(-30, 0);
			//первый цилиндр
			drawCylinder(a1, k1);

			ctx.translate(200, 0);

			let a2 = [70, 100][1 - variant];
			let k2 = [kBase, kBase / 2][1 - variant];
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

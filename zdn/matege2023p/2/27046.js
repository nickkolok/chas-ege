(function() {

	retryWhileError(function() {

		let height = sl(1, 500);
		let ratio = height.polnKvadrMnozh();

		genAssert(ratio != 1);

		let name = sklonlxkand(['диаметр', 'радиус'].iz());

		let paint1 = function(ctx) {
			ctx.translate(0, 30);
			ctx.lineWidth = 2;
			let height = 180;
			ctx.fillStyle = "#61DC9A";

			let a = 70;
			let b = 20;

			let k = sl(2, 4, 0.1);
			//цилиндр поуже
			//жидкость
			ctx.beginPath();
			ctx.ellipse(100, height / k, b, a, Math.PI / 2, 0.5 * Math.PI, 1.5 * Math.PI);
			ctx.lineTo(100 + a, height);
			ctx.ellipse(100, height, b, a, Math.PI / 2, -0.5 * Math.PI, -1.5 * Math.PI);
			ctx.fill();
			ctx.closePath();

			//высота
			ctx.drawLine(100 - a, height, 100 - a, 10);
			ctx.drawLine(100 + a, height, 100 + a, 10);

			//эллипс верхний
			ctx.beginPath();
			ctx.ellipse(100, 10, b, a, Math.PI / 2, 0, 2 * Math.PI);
			ctx.stroke();
			ctx.closePath();

			//эллипс нижний
			ctx.beginPath();
			ctx.ellipse(100, height, b, a, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.setLineDash([5, 5]);
			ctx.ellipse(100, height, b, a, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);
			ctx.stroke();
			ctx.closePath();

			//эллипс средний
			ctx.beginPath();
			ctx.ellipse(100, height / k, b, a, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.setLineDash([5, 5]);
			ctx.ellipse(100, height / k, b, a, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);
			ctx.stroke();
			ctx.closePath();

			//жидкость
			ctx.beginPath();
			ctx.ellipse(100, height / k, b, a, Math.PI / 2, 0.5 * Math.PI, 1.5 * Math.PI);
			ctx.lineTo(100 + a, height);
			ctx.ellipse(100, height, b, a, Math.PI / 2, -0.5 * Math.PI, -1.5 * Math.PI);
			ctx.fill();
			ctx.closePath();

			//высота
			ctx.drawLine(100 - a, height, 100 - a, 10);
			ctx.drawLine(100 + a, height, 100 + a, 10);

			//эллипс верхний
			ctx.beginPath();
			ctx.ellipse(100, 10, b, a, Math.PI / 2, 0, 2 * Math.PI);
			ctx.stroke();
			ctx.closePath();

			//эллипс нижний
			ctx.beginPath();
			ctx.ellipse(100, height, b, a, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.setLineDash([5, 5]);
			ctx.ellipse(100, height, b, a, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);
			ctx.stroke();
			ctx.closePath();

			//эллипс средний
			ctx.beginPath();
			ctx.ellipse(100, height / k, b, a, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.setLineDash([5, 5]);
			ctx.ellipse(100, height / k, b, a, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);
			ctx.stroke();
			ctx.setLineDash([0, 0]);
			ctx.closePath();

			ctx.translate(200, 0);

			a = 100;
			k /= 2;
			//цилиндр пошире
			//жидкость
			ctx.beginPath();
			ctx.ellipse(100, height / k, b, a, Math.PI / 2, 0.5 * Math.PI, 1.5 * Math.PI);
			ctx.lineTo(100 + a, height);
			ctx.ellipse(100, height, b, a, Math.PI / 2, -0.5 * Math.PI, -1.5 * Math.PI);
			ctx.fill();
			ctx.closePath();

			//высота
			ctx.drawLine(100 - a, height, 100 - a, 10);
			ctx.drawLine(100 + a, height, 100 + a, 10);

			//эллипс верхний
			ctx.beginPath();
			ctx.ellipse(100, 10, b, a, Math.PI / 2, 0, 2 * Math.PI);
			ctx.stroke();
			ctx.closePath();

			//эллипс нижний
			ctx.beginPath();
			ctx.ellipse(100, height, b, a, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.setLineDash([5, 5]);
			ctx.ellipse(100, height, b, a, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);
			ctx.stroke();
			ctx.closePath();

			//эллипс средний
			ctx.beginPath();
			ctx.ellipse(100, height / k, b, a, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.setLineDash([5, 5]);
			ctx.ellipse(100, height / k, b, a, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);
			ctx.stroke();
			ctx.closePath();

			//жидкость
			ctx.beginPath();
			ctx.ellipse(100, height / k, b, a, Math.PI / 2, 0.5 * Math.PI, 1.5 * Math.PI);
			ctx.lineTo(100 + a, height);
			ctx.ellipse(100, height, b, a, Math.PI / 2, -0.5 * Math.PI, -1.5 * Math.PI);
			ctx.fill();
			ctx.closePath();

			//высота
			ctx.drawLine(100 - a, height, 100 - a, 10);
			ctx.drawLine(100 + a, height, 100 + a, 10);

			//эллипс верхний
			ctx.beginPath();
			ctx.ellipse(100, 10, b, a, Math.PI / 2, 0, 2 * Math.PI);
			ctx.stroke();
			ctx.closePath();

			//эллипс нижний
			ctx.beginPath();
			ctx.ellipse(100, height, b, a, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.setLineDash([5, 5]);
			ctx.ellipse(100, height, b, a, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);
			ctx.stroke();
			ctx.closePath();

			//эллипс средний
			ctx.beginPath();
			ctx.ellipse(100, height / k, b, a, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.setLineDash([5, 5]);
			ctx.ellipse(100, height / k, b, a, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);
			ctx.stroke();
			ctx.closePath();

		};

		NAinfo.requireApiVersion(0, 2);
		NAtask.setTask({
			text: 'В цилиндрическом сосуде уровень жидкости достигает ' + height + ' см. ' +
				'На какой высоте будет находиться уровень жидкости, ' +
				'если её перелить во второй цилиндрический сосуд, ' +
				name.ie + ' которого в ' + chislitlx(ratio, 'раз') + ' больше ' + name.re + ' первого? ' +
				'Ответ выразите в сантиметрах.',
			answers: height / ratio.pow(2),
			authors: ['Суматохина Александра'],
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 500,
			height: 300,
			paint: paint1,
		});
	}, 1000);
})();
//27046 4921 72105 562931 562976 4923 4925 4927 4929 4931 4933 72059 72061 72063 72065 72067 72069 72071 72073 72075 72077 72079 72081 72083 72085 72087 72089 72091 72093 72095 72097 72099 72101 72103

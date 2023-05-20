(function() {


	retryWhileError(function() {

		let volume = sl(1, 50) * 100;
		let height = sluchDel(volume);
		genAssert(height != 1, '');

		let deltaHeight = sl(1, height);

		let unit = ['см', 'дм', 'м'].iz();

		let change = ['на $' + deltaHeight + '$' + unit + '', 'в $' + (deltaHeight + height).texrndfrac(height) + '$ раза']
			.iz();

		let paint1 = function(ctx) {
			ctx.translate(0, 30);
			ctx.lineWidth = 2;
			let height = 180;
			ctx.fillStyle = "#61DC9A";

			let k = sl(1.3, 4, 0.1);

			//жидкость
			ctx.beginPath();
			ctx.ellipse(150, height / k, 20, 90, Math.PI / 2, 0.5 * Math.PI, 1.5 * Math.PI);
			ctx.lineTo(240, height);
			ctx.ellipse(150, height, 20, 90, Math.PI / 2, -0.5 * Math.PI, -1.5 * Math.PI);
			ctx.fill();
			ctx.closePath();

			//высота
			ctx.drawLine(60, height, 60, 10);
			ctx.drawLine(240, height, 240, 10);

			//эллипс верхний
			ctx.beginPath();
			ctx.ellipse(150, 10, 20, 90, Math.PI / 2, 0, 2 * Math.PI);
			ctx.stroke();
			ctx.closePath();

			//эллипс нижний
			ctx.beginPath();
			ctx.ellipse(150, height, 20, 90, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.setLineDash([5, 5]);
			ctx.ellipse(150, height, 20, 90, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);
			ctx.stroke();
			ctx.closePath();

			//эллипс средний
			ctx.beginPath();
			ctx.ellipse(150, height / k, 20, 90, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.setLineDash([5, 5]);
			ctx.ellipse(150, height / k, 20, 90, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);
			ctx.stroke();
			ctx.closePath();

		};

		NAinfo.requireApiVersion(0, 2);
		NAtask.setTask({
			text: 'В цилиндрический сосуд налили $' + volume + '\\mbox{' + unit + '}^3$ воды. ' +
				'Уровень воды при этом достигает высоты $' + height + '$' + unit + '. ' +
				'В жидкость полностью погрузили деталь. ' +
				'При этом уровень жидкости в сосуде поднялся ' + change + '. ' +
				'Чему равен объем детали? Ответ выразите в $\\mbox{' + unit + '}^3$.',
			answers: volume * deltaHeight / height,
			authors: ['Суматохина Александра'],
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 300,
			height: 300,
			paint: paint1,
		});
	}, 1000);
})();
//27045 4905 4907 72053 72057 517175 517213 4909 4911 4913 4915 4917 72009 72011 72013 72015 72017 72019 72021 72023 72025 72027 72029 72031 72033 72035 72037 72039 72041 72043 72045 72047 72049 72051 72055
//27091 74093 509994 74095 74097 74099 74101 74103 74105 74107 74109 74111 74113 74115 74117 74119 74121 74123 74125 74127 74129 74131 74133 74135 74137 74139 74141 74143 74145 74147 74149 74151

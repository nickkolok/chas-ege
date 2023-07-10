(function() {
	lx_declareClarifiedPhrase('площадь', 'основания');
	lx_declareClarifiedPhrase('площадь', 'боковой поверхности');
	retryWhileError(function() {


		let variable = [
			['площадь боковой поверхности',
				'больше', 60,
			],
			['площадь основания', 
				'меньше', 60
			]
		].shuffle();

		let name = sklonlxkand(variable.T()[0]);
		let moreLess = variable.T()[1][0][0];
		let answ = variable.T()[1][0][1];

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;
			//образующие
			ctx.drawLine(60, 180, 150, 10);
			ctx.drawLine(240, 180, 150, 10);
			//эллипс
			ctx.ellipse(150, 180, 20, 90, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);
			ctx.stroke();

			ctx.beginPath();
			ctx.setLineDash([5, 5]);
			ctx.ellipse(150, 180, 20, 90, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);
			ctx.stroke();

			//радиус
			ctx.drawLine(150, 180, 240, 180);
			//высота
			ctx.drawLine(150, 180, 150, 10);
		};

		NAinfo.requireApiVersion(0, 2);
		NAtask.setTask({
			text: name[0].ie.toZagl() + ' конуса в два раза ' + moreLess + ' ' + name[1].re +
				'. ' +
				'Найдите угол между образующей конуса и плоскостью основания. ' +
				'Ответ дайте в градусах.',
			answers: answ,
			authors: ['Суматохина Александра'],
			analys: '',
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 300,
			height: 300,
			paint: paint1,
		});
	}, 1000);
})();
//27160 509461

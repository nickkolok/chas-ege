(function() {
	lx_declareClarifiedPhrase('площадь', 'основания');
	lx_declareClarifiedPhrase('площадь', 'боковой поверхности');
	retryWhileError(function() {

		const variable = [
			['площадь боковой поверхности', 'больше'],
			['площадь основания', 'меньше']
		];
		const variant = sl1();
		const name = sklonlxkand(variable.map(row => row[0]));
		const moreLess = variable[variant][1];
		const first = name[variant];
		const second = name[1 - variant];
		const answ = 60;

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;
			//образующие
			ctx.drawLine(60, 180, 150, 10);
			ctx.drawLine(240, 180, 150, 10);
			//эллипс
			ctx.drawEllipse(150, 180, 20, 90, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);

			ctx.setLineDash([5, 5]);
			ctx.drawEllipse(150, 180, 20, 90, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);

			ctx.setLineDash([]);
			//радиус
			ctx.drawLine(150, 180, 240, 180);
			//высота
			ctx.drawLine(150, 180, 150, 10);
		};

		NAinfo.requireApiVersion(0, 2);
		NAtask.setTask({
			text: first.ie.toZagl() + ' конуса в два раза ' + moreLess + ' ' + second.re +
				'. ' +
				'Найдите угол между образующей конуса и плоскостью основания. ' +
				'Ответ дайте в градусах.',
			answers: answ,
			authors: ['Суматохина Александра'],
			analys: 'Из $\\pi rl=2\\pi r^2$ получаем $l=2r$. Поэтому косинус угла между образующей и основанием равен $r/l=1/2$, а угол равен $60^\\circ$.',
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 300,
			height: 300,
			paint: paint1,
		});
	}, 1000);
})();
//27160 509461


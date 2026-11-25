(function() {
	NAinfo.requireApiVersion(0, 2);
	lx_declareClarifiedPhrase('площадь', 'основания');
	lx_declareClarifiedPhrase('площадь', 'боковой поверхности');
	retryWhileError(function() {


		let variable = [
			'площадь боковой поверхности',
			'площадь основания'
		].shuffle();
		let name = sklonlxkand(variable);
		let moreLess = variable[0] === 'площадь боковой поверхности' ? 'больше' : 'меньше';

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;
			let cx = 200, cy = 280; //центр основания
			let r = 120, ry = 36; //полуоси эллипса основания
			let apexY = 72; //вершина конуса над центром основания
			let dash = [5, 5]; //пунктир невидимых линий

			//эллипс (передняя часть)
			ctx.drawEllipse(cx, cy, r, ry, 0, 0, Math.PI);

			//эллипс (задняя часть, пунктиром)
			ctx.setLineDash(dash);
			ctx.drawEllipse(cx, cy, r, ry, 0, Math.PI, 2 * Math.PI);
			ctx.setLineDash([]);

			//образующие
			ctx.drawLine(cx - r, cy, cx, apexY);
			ctx.drawLine(cx + r, cy, cx, apexY);

			//радиус (синий)
			ctx.strokeStyle = 'blue';
			ctx.drawLine(cx, cy, cx + r, cy);

			//высота (красная, пунктирная)
			ctx.strokeStyle = 'red';
			ctx.setLineDash(dash);
			ctx.drawLine(cx, cy, cx, apexY);
			ctx.setLineDash([]);

			ctx.strokeStyle = 'black';
		};

		NAtask.setTask({
			text: name[0].ie.toZagl() + ' конуса в два раза ' + moreLess + ' ' + name[1].re +
				'. ' +
				'Найдите угол между образующей конуса и плоскостью основания. ' +
				'Ответ дайте в градусах.',
			answers: 60,
			authors: ['Суматохина Александра'],
			analys: 'Пусть радиус основания равен $r$, а образующая — $l$. Из $S_{бок}=2S_{осн}$ получаем ' +
				'$\\pi rl=2\\pi r^2$, поэтому $l=2r$. Косинус угла между образующей и её проекцией на основание ' +
				'равен $r/l=1/2$. Искомый угол равен $60^\\circ$.',
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//27160 509461


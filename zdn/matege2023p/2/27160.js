(function() {
	lx_declareClarifiedPhrase('площадь', 'основания');
	lx_declareClarifiedPhrase('площадь', 'боковой поверхности');
	retryWhileError(function() {


		let variable = [
			'площадь боковой поверхности',
			'площадь основания'
		].shuffle();
		let name = sklonlxkand(variable);
		let moreLess = variable[0] === 'площадь боковой поверхности' ? 'больше' : 'меньше';
		let answ = 60;

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;
			
			//эллипс (передняя часть)
			ctx.beginPath();
			ctx.ellipse(200, 280, 120, 36, 0, 0, Math.PI);
			ctx.stroke();

			//эллипс (задняя часть, пунктиром)
			ctx.beginPath();
			ctx.setLineDash([5, 5]);
			ctx.ellipse(200, 280, 120, 36, 0, Math.PI, 2 * Math.PI);
			ctx.stroke();
			ctx.setLineDash([]);

			//образующие
			ctx.drawLine(80, 280, 200, 72);
			ctx.drawLine(320, 280, 200, 72);

			//радиус (синий)
			ctx.strokeStyle = "blue";
			ctx.drawLine(200, 280, 320, 280);
			
			//высота (красная, пунктирная)
			ctx.strokeStyle = "red";
			ctx.setLineDash([5, 5]);
			ctx.drawLine(200, 280, 200, 72);
			ctx.setLineDash([]);
			
			ctx.strokeStyle = "black";
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
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//27160 509461

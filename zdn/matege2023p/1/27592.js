(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(2, 100);

		let vertices = om.latbukv.iz(5);

		let question = {
			data: 0,
			find: 0,
			answ: 0,
		};
		switch (sl(1, 6)) {
		case 1:
			question.data = vertices.slice(0, 3);
			question.find = [vertices[0], vertices[3], vertices[4]];
			question.answ = a * 0.25;
			break;
		case 2:
			question.data = [vertices[0], vertices[3], vertices[4]];
			question.find = vertices.slice(0, 3);
			question.answ = a * 4;
			break;
		case 3:
			question.data = vertices.slice(0, 3);
			question.find = vertices.slice(1, 5);
			question.answ = a * 0.75;
			break;
		case 4:
			question.data = vertices.slice(1, 5);
			question.find = vertices.slice(0, 3);
			question.answ = a * 4 / 3;
			genAssertZ1000(question.answ, 'Кривой ответ');
			break;
		case 5:
			question.data = vertices.slice(1, 5);
			question.find = [vertices[0], vertices[3], vertices[4]];
			question.answ = a / 3;
			genAssertZ1000(question.answ, 'Кривой ответ');
			break;
		case 6:
			question.data = [vertices[0], vertices[3], vertices[4]];
			question.find = vertices.slice(1, 5);
			question.answ = a * 3;
			break;
		}

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;
			ctx.strokeStyle = om.secondaryBrandColors.iz();

			ctx.drawLine(10, 350, 390, 350);
			ctx.drawLine(10, 350, 120, 50);

			ctx.drawLine(120, 50, 390, 350);

			ctx.drawLine(65, 200, 255, 200);

			//штрихи
			ctx.lineWidth = 1;

			ctx.strokeStyle = om.primaryBrandColors.iz();
			ctx.strokeInMiddleOfSegment(10, 350, 65, 200, 10);
			ctx.strokeInMiddleOfSegment(120, 50, 65, 200, 10);

			ctx.strokeInMiddleOfSegment(120, 50, 255, 200, 10, 2);
			ctx.strokeInMiddleOfSegment(390, 350, 255, 200, 10, 2);

			ctx.font = "23px liberation_sans";
			ctx.fillText(vertices[0], 120, 40);
			ctx.fillText(vertices[1], 10 - 5, 370 + 10);
			ctx.fillText(vertices[2], 390 - 10, 370 + 10);
			ctx.fillText(vertices[3], 255 + 5, 200);
			ctx.fillText(vertices[4], 65 - 25, 200);

		};

		NAtask.setTask({
			text: 'Площадь ' + ['треугольника', 'трапеции'][question.data.length - 3] + ' $' +
				question.data.permuteCyclic(sl(1, 3)).join('') +
				'$ равна $' + a + '$, $' + vertices.slice(3, 5).shuffle().join('') +
				'$ – средняя линия, параллельная стороне $' +
				vertices.slice(1, 3).shuffle().join('') + '$. ' +
				'Найдите площадь ' + ['треугольника', 'трапеции'][question.find.length - 3] + ' $' + question.find.permuteCyclic(
					sl(1, 3)).join('') + '$.',
			answers: question.answ,
			analys: '',
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
// 27592 55305 55353 549312 55307 55309 55311 55313 55315 55317 55319 55321 55323 55325 55327 55329 55331 55333 55335 55337 55339 55341 55343 55345 55347 55349 55351

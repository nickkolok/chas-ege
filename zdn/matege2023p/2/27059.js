(function() {
	lx_declareClarifiedPhrase('площадь', 'поверхности');
	lx_declareClarifiedPhrase('площадь', 'большого круга');
	lx_declareClarifiedPhrase('длина', 'большого круга');

	retryWhileError(function() {

		let radius = sl(1, 50);

		let variable = [
			[
				['радиус', radius],
				['диаметр', radius * 2],
				['длина большого круга', 2 * radius + '\\pi'],
				['площадь большого круга', radius.pow(2) + '\\pi'],
			].iz(), ['площадь поверхности', 4 * radius.pow(2) + '\\pi'],
		];

		if (!(radius % 3))
			variable.push(['объём', 4 * radius.pow(3) / 3 + '\\pi']);

		variable = variable.iz(3);

		let name = sklonlxkand(variable.T()[0]);
		let number = variable.T()[1];
		let answer = number[1];

		let ps = '';
		if (answer.includes('pi')) {
			answer = answer.replace('\\pi', '');
			ps = 'Ответ разделите на $\\pi$.';
		}

		let paint1 = function(ctx) {
			ctx.translate(50, -40);
			ctx.lineWidth = 2;
			//шар 1
			ctx.beginPath();
			ctx.arc(100, 150, 100, 0, Math.PI * 2, true); // Внешняя окружность
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.ellipse(100, 150, 20, 100, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.setLineDash([5, 5]);
			ctx.ellipse(100, 150, 20, 100, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);
			ctx.stroke();
			ctx.closePath();
			ctx.drawLine(100, 150, 200, 150);

		};

		NAinfo.requireApiVersion(0, 2);
		NAtask.setTask({
			text: name[0].ie.toZagl() + ' шара ' + ['равен', 'равна'][name[0].rod] + ' $' + number[0] + '$. ' +
				'Найдите ' + name[1].ve + ' шара. ' + ps,
			answers: answer,
			authors: ['Суматохина Александра'],
			analys: name[1].ie.toZagl() + ': $' + number[1] + '$',
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 300,
			height: 250,
			paint: paint1,
		});
	}, 1000);
})();
//27059 5049 27185 72765 72719 72721 72723 72725 72727 72729 72731 72733 72735 72737 72739 72741 72743 72745 72747 72749 72751 72753 72755 72757 72759 72761 72763

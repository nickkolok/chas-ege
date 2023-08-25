(function() {

	lx_declareClarifiedPhrase('площадь', 'поверхности');
	lx_declareClarifiedPhrase('радиус', 'основания');
	lx_declareClarifiedPhrase('диаметр', 'основания');
	lx_declareClarifiedPhrase('площадь', 'боковой поверхности');
	lx_declareClarifiedPhrase('длина', 'окружности основания');
	lx_declareClarifiedPhrase('площадь', 'окружности основания');
	lx_declareClarifiedPhrase('площадь', 'полной поверхности');

	retryWhileError(function() {

		let radius = sl(1, 50);
		let height = sl(1, 50);

		let variable = [

			['высота', height],
			[
				['радиус основания', radius],
				['длина окружности основания', 2 * radius + '\\pi'],
				['площадь основания', radius.pow(2) + '\\pi'],
				['диаметр основания', 2 * radius]

			].iz(), ['объём', height * radius.pow(2) + '\\pi'],
			['площадь боковой поверхности', 2 * height * radius + '\\pi'],
			['площадь полной поверхности', 2 * radius * (radius + height) + '\\pi']
		].iz(3);


		let name = sklonlxkand(variable.T()[0]);
		let number = variable.T()[1];
		let answer = number[2];

		let ps = '';
		if (answer.includes('pi')) {
			answer = answer.replace('\\pi', '');
			ps = 'Ответ сократите на $\\pi$.';
		}

		let paint1 = function(ctx) {
			ctx.translate(30, 30);
			ctx.lineWidth = 2;
			let height = 300;
			//высота
			ctx.strokeStyle = "#809DF2";
			ctx.drawLine(0, height, 0, 10);
			ctx.drawLine(300, height, 300, 10);

			//эллипс верхний
			ctx.beginPath();
			ctx.ellipse(150, 10, 20, 150, Math.PI / 2, 0, 2 * Math.PI);
			ctx.stroke();
			//эллипс нижний
			ctx.beginPath();
			ctx.ellipse(150, height, 20, 150, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);
			ctx.stroke();

			ctx.beginPath();
			ctx.setLineDash([5, 5]);
			ctx.ellipse(150, height, 20, 150, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);
			ctx.stroke();
			//радиус
			ctx.strokeStyle = ["#D777F2", "#F2A2D6"].iz();

			if (variable.T()[0].includes('радиус основания'))
				ctx.drawLine(150, height, 300, height);
			//высота
			if (variable.T()[0].includes('высота'))
				ctx.drawLine(150, height, 150, 10);
		};

		NAinfo.requireApiVersion(0, 2);
		NAtask.setTask({
			text: name[0].ie.toZagl() + ' цилиндра ' + ['равен', 'равна'][name[0].rod] + ' $' + number[0] + '$, ' +
				name[1].ie + ' ' + ['равен', 'равна'][name[1].rod] + ' $' + number[1] + '$. ' +
				'Найдите ' + name[2].ve + ' цилиндра. ' + ps,
			answers: '$' + answer + '$',
			authors: ['Суматохина Александра'],
			analys: name[2].ie.toZagl() + ': $' + number[2] + '$',
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//27058 72673 72675 72677 72679 72681 72683 72685 72687 72689 72691 72693 72695 72697 72699 72701 72703 72705 72707 72709 72711 72713 72715 72717

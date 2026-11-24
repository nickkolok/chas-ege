(function() {

	lx_declareClarifiedPhrase('площадь', 'поверхности');
	lx_declareClarifiedPhrase('площадь', 'основания');
	lx_declareClarifiedPhrase('радиус', 'основания');
	lx_declareClarifiedPhrase('диаметр', 'основания');
	lx_declareClarifiedPhrase('площадь', 'боковой поверхности');
	lx_declareClarifiedPhrase('длина', 'окружности основания');
	lx_declareClarifiedPhrase('площадь', 'окружности основания');
	lx_declareClarifiedPhrase('площадь', 'полной поверхности');

	retryWhileError(function() {

		let radius = sl(1, 50);
		let height = sl(1, 50);

		const cyl = new Cylinder({radius, height});
		let variable = [

			['высота', height],
			[
				['радиус основания', radius],
				['длина окружности основания', 2 * radius + '\\pi'],
				['площадь основания', Math.round(cyl.baseArea / Math.PI) + '\\pi'],
				['диаметр основания', 2 * radius],
			].iz(),
			['объём', Math.round(cyl.volume / Math.PI) + '\\pi'],
			['площадь боковой поверхности', Math.round(cyl.sideSurfaceArea / Math.PI) + '\\pi'],
			['площадь полной поверхности', Math.round(cyl.surfaceArea / Math.PI) + '\\pi'],
		].iz(3);

		const transposed = variable.T();
		let name = sklonlxkand(transposed[0]);
		let number = transposed[1];
		let answer = number[2];

		let ps = '';
		if (typeof answer === 'string' && answer.includes('pi')) {
			answer = answer.replace('\\pi', '');
			ps = 'Ответ разделите на $\\pi$.';
		}

		let paint1 = function(ctx) {
			ctx.translate(30, 30);
			ctx.lineWidth = 2;
			let height = 300;
			//высота
			ctx.strokeStyle = om.secondaryBrandColors.iz();
			ctx.drawLine(0, height, 0, 10);
			ctx.drawLine(300, height, 300, 10);

			//эллипс верхний
			ctx.drawEllipse(150, 10, 20, 150, Math.PI / 2);
			//эллипс нижний
			ctx.drawEllipse(150, height, 20, 150, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);

			ctx.setLineDash([5, 5]);
			ctx.drawEllipse(150, height, 20, 150, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);
			//радиус
			ctx.strokeStyle = om.primaryBrandColors.iz();

			if (transposed[0].includes('радиус основания'))
				ctx.drawLine(150, height, 300, height);
			//высота
			if (transposed[0].includes('высота'))
				ctx.drawLine(150, height, 150, 10);
		};

		NAinfo.requireApiVersion(0, 2);
		NAtask.setTask({
			text: name[0].ie.toZagl() + ' цилиндра ' + ['равен', 'равна'][name[0].rod] + ' $' + number[0] + '$, ' +
				name[1].ie + ' ' + ['равен', 'равна'][name[1].rod] + ' $' + number[1] + '$. ' +
				'Найдите ' + name[2].ve + ' цилиндра. ' + ps,
			answers: answer,
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


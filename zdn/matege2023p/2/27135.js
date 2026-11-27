(function() {
	lx['образующая'] = {
		ie: 'образующая',
		ve: 'образующую',
		rod: 1,
		odu: 0,
	};
	lx_declareClarifiedPhrase('площадь', 'поверхности');
	lx_declareClarifiedPhrase('радиус', 'основания');
	lx_declareClarifiedPhrase('площадь', 'боковой поверхности');
	lx_declareClarifiedPhrase('длина', 'окружности основания');
	lx_declareClarifiedPhrase('площадь', 'окружности основания');
	lx_declareClarifiedPhrase('площадь', 'осевого сечения');
	retryWhileError(function() {

		let radius = sl(1, 50);
		let height = sl(1, 50);
		let cone = new Cone({radius: radius, height: height});
				let volume = Number((cone.volume / Math.PI).toFixed(10));
		genAssert(cone.generatrix.isZ(), 'Образующая нормальная');
		let variable = [

			['высота', height],
			[
				['диаметр основания', cone.diameter],
				['радиус основания', radius],
				['длина окружности основания', cone.diameter + '\\pi'],
				['площадь окружности основания', Number((cone.baseArea / Math.PI).toFixed(10)) + '\\pi']
			].iz(), ['образующая', cone.generatrix],
			[
				['площадь осевого сечения', radius * height],
				['площадь боковой поверхности', Number((cone.sideSurfaceArea / Math.PI).toFixed(10)) + '\\pi']
			].iz()
		];

		if (volume.isZ())
			variable.push(['объём', volume + '\\pi']);

		variable = variable.iz(3);
		genAssert(variable.slice(0, 2).some(value => ['высота', 'диаметр основания', 'радиус основания',
			'длина окружности основания', 'площадь окружности основания'].includes(value[0])),
			'Данные однозначно определяют размеры конуса');

		let name = sklonlxkand(variable.T()[0]);
		let number = variable.T()[1];
		let answer = String(number[2]);

		let ps = '';
		if (answer.includes('pi')) {
			answer = answer.replace('\\pi', '');
			ps = 'Ответ сократите на $\\pi$.';
		}

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;
			let cx = ctx.canvas.width / 2, baseY = 180, apexY = 10, r = 90, ry = 20;
			//образующие
			ctx.drawLine(cx - r, baseY, cx, apexY);
			ctx.drawLine(cx + r, baseY, cx, apexY);
			//эллипс
			ctx.drawEllipse(cx, baseY, ry, r, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);

			ctx.setLineDash([5, 5]);
			ctx.drawEllipse(cx, baseY, ry, r, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);
			ctx.setLineDash([]);
			//радиус
			if (variable.T()[0].includes('радиус основания'))
				ctx.drawLine(cx, baseY, cx + r, baseY);
			//высота
			if (variable.T()[0].includes('высота') || variable.T()[0].includes('площадь осевого сечения'))
				ctx.drawLine(cx, baseY, cx, apexY);
			if (variable.T()[0].includes('площадь осевого сечения') || variable.T()[0].includes('диаметр основания')) {
				ctx.drawLine(cx - r, baseY, cx + r, baseY);
			}
		};

		NAinfo.requireApiVersion(0, 2);
		NAtask.setTask({
			text: name[0].ie.toZagl() + ' конуса ' + ['равен', 'равна'][name[0].rod] + ' $' + number[0] + '$, ' +
				name[1].ie + ' ' + ['равен', 'равна'][name[1].rod] + ' $' + number[1] + '$. ' +
				'Найдите ' + name[2].ve + ' конуса. ' + ps,
			answers: '$' + answer + '$',
			authors: ['Суматохина Александра'],
			analys: name[2].ie.toZagl() + ': $' + number[2] + '$',
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 300,
			height: 300,
			paint: paint1,
		});
	}, 1000);
})();
//27135 75647 75691 75649 75651 75653 75655 75657 75659 75661 75663 75665 75667 75669 75671 75673 75675 75677 75679 75681 75683 75685 75687 75689 75693 75695 324456 325565 325567 325569 325571 325573 325575 325577 325579 325581 325583 325585 325587 325589 325591 325593 325595 325597 325599 325601


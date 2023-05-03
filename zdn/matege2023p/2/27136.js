(function() {
	lx_declareClarifiedPhrase('площадь', 'поверхности');
	lx_declareClarifiedPhrase('радиус', 'основания');
	lx_declareClarifiedPhrase('площадь', 'боковой поверхности');
	lx_declareClarifiedPhrase('длина', 'окружности основания');
	lx_declareClarifiedPhrase('площадь', 'окружности основания');
	retryWhileError(function() {
		let radius = sl(1, 50);
		let height = sl(1, 50);
		let generatrixСone = radius.pow(2) + height.pow(2);

		let variable = [

			['высота', height],
			[
				['радиус основания', radius],
				['длина окружности основания', 2 * radius + '\\pi'],
				['площадь окружности основания', radius.pow(2) + '\\pi']
			].iz()
		];

		if ((generatrixСone.sqrt() * 100).isZ())
			variable.push(['образующая', generatrixСone.texsqrt(sl1())]);

		if ((height * radius.pow(2) / 3).isZ())
			variable.push(['объём', height * radius.pow(2) / 3 + '\\pi']);

		if ((radius.pow(2) * generatrixСone).sqrt().isZ())
			variable.push(['площадь боковой поверхности', (radius.pow(2) * generatrixСone).texsqrt(sl1()) + '\\pi']);

		variable = variable.iz(3);

		let name = sklonlxkand(variable.T()[0]);
		let number = variable.T()[1];
		let answer = number[2];

		let ps = '';
		if (answer.includes('pi')) {
			answer = answer.replace('\\pi', '');
			ps = 'Ответ сократите на $\\pi$.';
		}

		let paint1 = function(ct) {};

		NAinfo.requireApiVersion(0, 2);
		NAtask.setTask({
			text: name[0].ie.toZagl() + ' конуса ' + ['равен', 'равна'][name[0].rod] + ' $' + number[0] + '$, ' +
				name[1].ie + ' ' + ['равен', 'равна'][name[1].rod] + ' $' + number[1] + '$. ' +
				'Найдите ' + name[2].ve + ' конуса. ' + ps,
			answers: '$' + answer + '$',
			authors: ['Суматохина Александра'],
			analys: name[2].ie.toZagl() + ': $' + number[2] + '$',
		});
		chas2.task.modifiers.addCanvasIllustration({
			width: 300,
			height: 300,
			paint: paint1,
		});
	}, 1000);
})();

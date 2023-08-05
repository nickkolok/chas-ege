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
	retryWhileError(function() {

		let radius = sl(1, 50);
		let height = sl(1, 50);
		let generatrixСone = radius.pow(2) + height.pow(2);
		genAssert(generatrixСone.sqrt().isZ(), 'Образующая нормальная');
		let variable = [

			['высота', height],
			[
				['радиус основания', radius],
				['длина окружности основания', 2 * radius + '\\pi'],
				['площадь окружности основания', radius.pow(2) + '\\pi']
			].iz(), ['образующая', generatrixСone.texsqrt(sl1())]
		];

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

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;
			//образующие
			ctx.drawLine(60,180,150,10);
			ctx.drawLine(240,180,150,10);
			//эллипс
			ctx.ellipse(150, 180, 20, 90, Math.PI / 2, 1.5 * Math.PI, Math.PI / 2);
			ctx.stroke();
			
			ctx.beginPath();
			ctx.setLineDash([5, 5]);
			ctx.ellipse(150, 180, 20, 90, Math.PI / 2, Math.PI / 2, 1.5 * Math.PI);
			ctx.stroke();
			//радиус
			if(variable.T()[0].includes('радиус основания'))
			ctx.drawLine(150,180,240,180);
			//высота
			if(variable.T()[0].includes('высота'))
			ctx.drawLine(150,180,150,10);
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
		chas2.task.modifiers.addCanvasIllustration({
			width: 300,
			height: 300,
			paint: paint1,
		});
	}, 1000);
})();
//27135 75647 75691 75649 75651 75653 75655 75657 75659 75661 75663 75665 75667 75669 75671 75673 75675 75677 75679 75681 75683 75685 75687 75689 75693 75695
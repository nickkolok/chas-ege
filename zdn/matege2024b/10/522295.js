(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		//Столько спиц будет в новом колесе: спиц столько, сколько углов между соседними спицами,
		//а угол должен быть конечной десятичной дробью, поэтому 3600 делится на nSpokes
		let nSpokes = slKrome(x => 3600 % x !== 0, 8, 45);
		let angle = 360 / nSpokes;
		genAssertAlmostInteger(angle, 'Угол не целый');

		//А столько спиц нарисовано на рисунке-примере
		let nShown = slKrome([nSpokes], 5, 10);

		let rotate = sl(0, 359) * Math.PI / 180;
		let radius = 140;

		let paint = function (ctx) {
			let primaryColor = om.primaryBrandColors[0];
			let secondaryColor = om.secondaryBrandColors[0];

			ctx.translate(150, 150);
			ctx.scale(1, -1);

			ctx.strokeStyle = primaryColor;
			ctx.lineWidth = 2;
			ctx.drawCircle(radius);

			// Спицы — дополнительный брендовый цвет
			ctx.strokeStyle = secondaryColor;
			ctx.lineWidth = 2;

			for (let i = 0; i < nShown; i++) {
				let a = rotate + i * 2 * Math.PI / nShown;
				ctx.drawLine(0, 0, radius * Math.cos(a), radius * Math.sin(a));
			}

			ctx.fillStyle = primaryColor;
			ctx.fillKrug(0, 0, 4);
		};

		NAtask.setTask({
			text: 'На рисунке показано, как выглядит колесо с $' + nShown + '$ спицами.' +
				' Сколько будет спиц в колесе, если угол между любыми двумя соседними спицами в нём' +
				' будет равен $' + angle.ts() + '^\\circ$?',
			analys: 'Полный угол равен $360^\\circ$, и спицы делят его на равные углы между соседними спицами.' +
				' Число таких углов равно числу спиц, значит, спиц в колесе $360 : ' + angle.ts() + ' = ' + nSpokes + '$.',
			answers: nSpokes,
		});
		NAtask.modifiers.allDecimalsToStandard();
		NAtask.modifiers.addCanvasIllustration({
			width: 300,
			height: 300,
			paint: paint,
		});
	}, 1000);
})();
//https://sdamgia.ru/problem?id=522295

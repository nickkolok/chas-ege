(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		//Столько спиц будет в новом колесе: спиц столько, сколько углов между соседними спицами,
		//а угол должен быть конечной десятичной дробью, поэтому 3600 делится на nSpokes
		let nSpokes = slKrome(x => 3600 % x !== 0, 8, 45);
		let angle = 360 / nSpokes;

		//А столько спиц нарисовано на рисунке-примере
		let nShown = slKrome([nSpokes], 5, 10);

		let rotate = sl(0, 359) * Math.PI / 180;
		let radius = 140;

		let paint = function(ctx) {
			ctx.translate(150, 150);
			ctx.scale(1, -1);
			ctx.lineWidth = 2;
			ctx.drawCircle(radius);
			for (let i = 0; i < nShown; i++) {
				let a = rotate + i * 2 * Math.PI / nShown;
				ctx.drawLine(0, 0, radius * Math.cos(a), radius * Math.sin(a));
			}
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

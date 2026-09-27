(function () {
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '522295';
		let preference = ['findSpokes', 'findAngle'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let nSpokes = slKrome(x => 1440 % x !== 0 && 3600 % x !== 0, 5, 45);
		let angle = 360 / nSpokes;

		let nShown = rand === 0 ? slKrome([nSpokes], 5, 10) : nSpokes;

		let rotate = sl(0, 359) * Math.PI / 180;
		let radius = 140;

		let analys = [
			'Полный угол равен $360^\\circ$, и спицы делят его на равные углы между соседними спицами. ' +
			'Число таких углов равно числу спиц, значит, спиц в колесе $360 : ' + angle.ts() + ' = ' + nSpokes + '$.',

			'Все спицы делят полный угол $360^\\circ$ на ' + nSpokes + ' равных частей. ' +
			'Поэтому угол между двумя соседними спицами равен $360 : ' + nSpokes + ' = ' + angle.ts() + '^\\circ$.',
		][rand];

		NAtask.setTask({
			text: '',
			questions: [
				[{
					text: 'На рисунке показано, как выглядит колесо с $' + nShown + '$ спицами. ' +
						'Сколько будет спиц в колесе, если угол между любыми двумя соседними спицами в нём ' +
						'будет равен $' + angle.ts() + '^\\circ$?',
					answers: nSpokes,
				}, {
					text: 'Колесо имеет $' + nSpokes + '$ спиц. Углы между соседними спицами равны. ' +
						'Найдите величину угла (в градусах), который образуют две соседние спицы.',
					answers: angle,
				}][rand]
			],
			analys: analys,
			preference: preference,
		});

		NAtask.modifiers.allDecimalsToStandard();

		NAtask.modifiers.addCanvasIllustration({
			width: 300,
			height: 300,
			paint: function (ctx) {
				let primaryColor = om.primaryBrandColors[0];
				let secondaryColor = om.secondaryBrandColors[0];

				ctx.translate(150, 150);
				ctx.scale(1, -1);

				ctx.strokeStyle = primaryColor;
				ctx.lineWidth = 2;
				ctx.drawCircle(radius);

				ctx.strokeStyle = secondaryColor;
				ctx.lineWidth = 2;

				for (let i = 0; i < nShown; i++) {
					let a = rotate + i * 2 * Math.PI / nShown;
					ctx.drawLine(
						0,
						0,
						radius * Math.cos(a),
						radius * Math.sin(a)
					);
				}

				ctx.fillStyle = primaryColor;
				ctx.fillKrug(0, 0, 4);
			},
		});
	}, 1000);
})();

// https://sdamgia.ru/problem?id=522295

(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '508394';
		let preference = ['liquid_ask_pour', 'liquid_ask_total', 'total_ask_pour', 'total_ask_liquid'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let N = sl(2, 4);
		let k = 1 / N;

		// Геометрия сосуда: конус вершиной вниз, как на эталонном рисунке задачи.
		// Пропорции фиксированные, чертёж схематический (уровень - дробь высоты,
		// а не конкретная величина), поэтому радиус и высота берём условные.
		let R = 140;
		let H = 270;

		let fractionText = '\\frac{1}{' + N + '}';
		let V, Vtotal, text, answers, analys;
		if (rand === 0) {
			V = sl(10, 100);
			answers = V * (N * N * N - 1);
			text = 'В сосуде, имеющем форму конуса, уровень жидкости достигает $' + fractionText +
				'$ высоты. Объём жидкости равен $' + V +
				'$ мл. Сколько миллилитров жидкости нужно долить, чтобы наполнить сосуд доверху?';
			analys = 'Жидкость занимает конус, подобный сосуду с коэффициентом подобия $' + fractionText +
				'$, поэтому её объём относится к вместимости как $\\frac{1}{' + (N * N * N) + '}$. ' +
				'Вместимость сосуда равна $' + V + ' \\cdot ' + (N * N * N) + ' = ' + V * N * N * N +
				'$ мл, долить нужно $' + V * N * N * N + ' - ' + V + ' = ' + answers + '$ мл.';
		} else if (rand === 1) {
			V = sl(10, 100);
			answers = V * N * N * N;
			text = 'В сосуде, имеющем форму конуса, уровень жидкости достигает $' + fractionText +
				'$ высоты. Объём жидкости равен $' + V + '$ мл. Какова вместимость сосуда (в мл)?';
			analys = 'Жидкость занимает конус, подобный сосуду с коэффициентом подобия $' + fractionText +
				'$. Объёмы подобных тел относятся как куб коэффициента подобия, поэтому вместимость сосуда ' +
				'в $' + (N * N * N) + '$ раз больше объёма жидкости: $' + V + ' \\cdot ' + (N * N * N) +
				' = ' + answers + '$ мл.';
		} else if (rand === 2) {
			let C = sl(10, 100);
			Vtotal = C * N * N * N;
			answers = C * (N * N * N - 1);
			text = 'В сосуде, имеющем форму конуса, уровень жидкости достигает $' + fractionText +
				'$ высоты. Объём сосуда равен $' + Vtotal +
				'$ мл. Сколько миллилитров жидкости нужно долить, чтобы наполнить сосуд доверху?';
			analys = 'Объём налитой жидкости относится к вместимости как куб коэффициента подобия $\\frac{1}{' +
				(N * N * N) + '}$, то есть равен $' + Vtotal + ' : ' + (N * N * N) + ' = ' + C +
				'$ мл. Долить нужно $' + Vtotal + ' - ' + C + ' = ' + answers + '$ мл.';
		} else {
			let C = sl(10, 100);
			Vtotal = C * N * N * N;
			answers = C;
			text = 'В сосуде, имеющем форму конуса, уровень жидкости достигает $' + fractionText +
				'$ высоты. Объём сосуда равен $' + Vtotal +
				'$ мл. Сколько миллилитров жидкости уже налито в сосуд?';
			analys = 'Жидкость занимает конус, подобный сосуду с коэффициентом подобия $' + fractionText +
				'$. Объёмы подобных тел относятся как куб коэффициента подобия, поэтому объём жидкости равен $' +
				Vtotal + ' : ' + (N * N * N) + ' = ' + answers + '$ мл.';
		}

		let paint1 = function (ctx) {
			let w = 360;
			let h = 360;
			let cx = w / 2;
			let topY = (h - H) / 2;
			let botY = topY + H;
			let yL = botY - k * H;
			let e = R * 0.26;
			let Rl = k * R;
			let el = k * e;

			let lineColor = om.secondaryBrandColors.iz();
			let liquidColor = om.transparentBrandColors.iz();
			ctx.lineWidth = 2;
			ctx.strokeStyle = lineColor;

			// Жидкость заливается ОДНИМ замкнутым контуром (приём из zdn/matege2024b/11/514063.js):
			// дальняя половина эллипса поверхности -> боковая образующая до вершины ->
			// обратно по второй образующей. Тогда полупрозрачный цвет нигде не накладывается
			// сам на себя и не даёт «двух слоёв».
			ctx.fillStyle = liquidColor;
			ctx.beginPath();
			ctx.moveTo(cx - Rl, yL);
			ctx.ellipse(cx, yL, Rl, el, 0, Math.PI, 0);
			ctx.lineTo(cx, botY);
			ctx.closePath();
			ctx.fill();

			// Боковые образующие сосуда
			ctx.drawLine(cx - R, topY, cx, botY);
			ctx.drawLine(cx + R, topY, cx, botY);

			// Верхняя кромка сосуда
			ctx.drawEllipse(cx, topY, R, e);

			// Поверхность жидкости: ближняя половина сплошная, дальняя пунктиром
			ctx.beginPath();
			ctx.ellipse(cx, yL, Rl, el, 0, 0, Math.PI);
			ctx.stroke();
			ctx.setLineDash([6, 4]);
			ctx.beginPath();
			ctx.ellipse(cx, yL, Rl, el, 0, Math.PI, 2 * Math.PI);
			ctx.stroke();
			ctx.setLineDash([]);

			// Ось сосуда
			ctx.setLineDash([6, 4]);
			ctx.drawLine(cx, topY, cx, botY);
			ctx.setLineDash([]);
			ctx.fillStyle = lineColor;
			ctx.fillKrug(cx, topY, 3);
		};

		NAtask.setTask({
			text: text,
			analys: analys,
			answers: answers,
			authors: ['chas-ege-selena'],
			preference: [preference],
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 360,
			height: 360,
			paint: paint1,
		});
	}, 1000);
})();
//508394
//chas-ege-selena
//https://mathb-ege.sdamgia.ru/problem?id=508394

(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '508394';
		// Три прототипа ФИПИ (задание 11, «Наглядная стереометрия с телами вращения»):
		// дан объём жидкости - сколько долить (95394F); дан объём жидкости - объём
		// сосуда (C4BD11, 3DA6BB); дан объём сосуда - объём жидкости (721742)
		let preference = ['liquid_ask_pour', 'liquid_ask_total', 'total_ask_liquid'];
		let rand = getSelectedPreferenceFromList(key, preference);

		// Уровень жидкости - несократимая дробь p/q высоты, q от 2 до 7:
		// у ФИПИ 1/2, 1/3, 1/4, 1/5, 1/6, 2/3, 2/5, 2/7, 3/4, 3/7, 4/5, 4/7, 6/7
		let q = sl(2, 7);
		let p = sl(1, q - 1);
		genAssert(p.nod(q) === 1, 'Дробь должна быть несократимой');
		let p3 = p * p * p;
		let q3 = q * q * q;
		// Ответ может быть дробным (у ФИПИ 312,5; 76,25; 6,4; 7,5), но не более
		// чем с двумя знаками после запятой. Для этого данный объём кратен
		// p^3 (или q^3), делённому на НОД с 100
		let unitP = p3 / p3.nod(100);
		let unitQ = q3 / q3.nod(100);

		let liquid, total, given, answer;
		if (rand < 2) {
			// дан объём жидкости
			if (unitP === 1) {
				// у ФИПИ при уровне 1/q объёмы «круглые» (10, 25, 130...), но бывают и 6, 8
				liquid = sl1() ? 5 * sl(1, 40) : sl(5, 9);
			} else {
				liquid = unitP * sl(1, Math.floor(400 / unitP));
			}
			total = liquid * q3 / p3;
			given = liquid;
			answer = rand === 0 ? total - liquid : total;
		} else {
			// дан объём сосуда: у ФИПИ он кратен 10 (при q = 7 - кратен 5: 1715)
			let round = q === 7 ? 5 : 10;
			let step = unitQ * round / unitQ.nod(round); // НОК

			total = step * sl(Math.ceil(100 / step), Math.floor(7000 / step));
			liquid = total * p3 / q3;
			given = total;
			answer = liquid;
		}
		genAssert(total <= 7000, 'Объём сосуда не должен быть громоздким');
		// наименьший ответ у ФИПИ - 6,4 мл; доли миллилитра в ответе неправдоподобны
		genAssert(answer >= 5, 'Ответ не должен быть меньше 5 мл');
		genAssertAlmostInteger(answer * 100, 'Ответ должен иметь не более двух знаков после запятой');
		answer = Math.round(answer * 100) / 100;
		liquid = Math.round(liquid * 100) / 100;
		total = Math.round(total * 100) / 100;

		let fractionText = '\\frac{' + p + '}{' + q + '}';
		let k = p / q;
		let level = 'уровень жидкости достигает $' + fractionText + '$ высоты.';
		let vesselText = 'В сосуде, имеющем форму конуса, ' + level;
		if (rand === 1 && sl1()) {
			// вторая формулировка ФИПИ (3DA6BB)
			vesselText = 'В сосуде, имеющем форму конуса с вершиной внизу, уровень жидкости параллелен плоскости ' +
				'основания конуса и достигает $' + fractionText + '$ высоты.';
		}
		let text = [
			vesselText + ' Объём жидкости равен $' + given + '$ мл. Сколько миллилитров жидкости нужно долить, чтобы наполнить сосуд доверху?',
			vesselText + ' Объём жидкости равен $' + given + '$ мл. Найдите объём сосуда. Ответ дайте в миллилитрах.',
			vesselText + ' Объём сосуда равен $' + given + '$ мл. Найдите объём налитой жидкости. Ответ дайте в миллилитрах.',
		][rand];

		let analys = 'Жидкость занимает конус, подобный сосуду с коэффициентом подобия $' + fractionText +
			'$ (отношение высот). Объёмы подобных тел относятся как кубы коэффициентов подобия, поэтому ' +
			'объём жидкости составляет $\\frac{' + p3 + '}{' + q3 + '}$ объёма сосуда. ';
		// умножение на q^3/p^3 при p = 1 записываем без дроби
		let toTotal = p3 === 1 ? ' \\cdot ' + q3 : ' \\cdot \\frac{' + q3 + '}{' + p3 + '}';
		if (rand === 0) {
			analys += 'Объём сосуда равен $' + liquid + toTotal + ' = ' + total +
				'$ мл, долить нужно $' + total + ' - ' + liquid + ' = ' + answer + '$ мл.';
		} else if (rand === 1) {
			analys += 'Объём сосуда равен $' + liquid + toTotal + ' = ' + answer + '$ мл.';
		} else {
			analys += 'Объём жидкости равен $' + total + ' \\cdot \\frac{' + p3 + '}{' + q3 + '} = ' + answer + '$ мл.';
		}

		// Геометрия сосуда: конус вершиной вниз, как на рисунке ФИПИ. Чертёж
		// схематический: радиус и высота сосуда условные, а уровень жидкости
		// и радиус её поверхности - ровно p/q от них
		let R = 140;
		let H = 270;

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
			// Контурные образующие касаются эллипсов, а не идут в их крайние точки:
			// из вершины (она под центром эллипса на расстоянии H) касательная
			// касается эллипса в точке с параметром alpha (справа) и PI - alpha
			// (слева), sin(alpha) = e / H; для поверхности жидкости угол тот же
			// (подобие). Иначе края эллипса поверхности выступали за контур сосуда.
			let alpha = Math.asin(e / H);
			ctx.fillStyle = liquidColor;
			ctx.beginPath();
			ctx.moveTo(cx - Rl * Math.cos(alpha), yL + el * Math.sin(alpha));
			ctx.ellipse(cx, yL, Rl, el, 0, Math.PI - alpha, 2 * Math.PI + alpha);
			ctx.lineTo(cx, botY);
			ctx.closePath();
			ctx.fill();

			// Боковые образующие сосуда
			ctx.drawLine(cx - R * Math.cos(alpha), topY + e * Math.sin(alpha), cx, botY);
			ctx.drawLine(cx + R * Math.cos(alpha), topY + e * Math.sin(alpha), cx, botY);

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
			answers: answer,
			authors: ['chas-ege-selena', 'Zer00Player'],
			preference: [preference],
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 360,
			height: 360,
			paint: paint1,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 1000);
})();
//508394
//chas-ege-selena, Zer00Player
//https://mathb-ege.sdamgia.ru/problem?id=508394

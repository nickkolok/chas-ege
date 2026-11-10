(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		// Кратности - словами, как у ФИПИ (11 №37-48): по высоте «в полтора раза»,
		// «вдвое», «в четыре раза», «вчетверо», «в четыре с половиной раза»;
		// по ширине «в полтора раза», «вдвое», «втрое», «в три раза», «в четыре раза»
		let heightMultipliers = [
			{ k: 1.5, words: ['в полтора раза'] },
			{ k: 2, words: ['вдвое', 'в два раза'] },
			{ k: 3, words: ['втрое', 'в три раза'] },
			{ k: 4, words: ['вчетверо', 'в четыре раза'] },
			{ k: 4.5, words: ['в четыре с половиной раза'] },
		];
		let widthMultipliers = [
			{ k: 1.5, words: ['в полтора раза'] },
			{ k: 2, words: ['вдвое', 'в два раза'] },
			{ k: 3, words: ['втрое', 'в три раза'] },
			{ k: 4, words: ['вчетверо', 'в четыре раза'] },
		];
		let kh = heightMultipliers.iz();
		let kr = widthMultipliers.iz();
		// Первая кружка выше или ниже второй; вторая шире или у́же первой
		let firstTaller = sl1();
		let secondWider = sl1();

		// Отношения размеров второй кружки к первой
		let hRatio = firstTaller ? 1 / kh.k : kh.k; // h2 / h1
		let rRatio = secondWider ? kr.k : 1 / kr.k; // r2 / r1
		// V2 / V1 = (r2 / r1)^2 * (h2 / h1)
		let ratio = rRatio * rRatio * hRatio;
		let secondBigger = ratio > 1;
		let ans = secondBigger ? ratio : 1 / ratio;
		genAssertAlmostInteger(ans, 'Ответ должен быть целым');
		ans = Math.round(ans);
		genAssert(ans >= 2, 'Объёмы кружек должны различаться');

		// Четыре формы вопроса ФИПИ: «во сколько раз объём второй больше
		// объёма первой», «первой меньше второй» (если больше вторая) и наоборот
		let question = secondBigger ?
			['Во сколько раз объём второй кружки больше объёма первой?', 'Во сколько раз объём первой кружки меньше объёма второй?'].iz() :
			['Во сколько раз объём первой кружки больше объёма второй?', 'Во сколько раз объём второй кружки меньше объёма первой?'].iz();

		let text = 'Даны две кружки цилиндрической формы. Первая кружка ' + kh.words.iz() + ' ' +
			(firstTaller ? 'выше' : 'ниже') + ' второй, а вторая' + [' ', ' — '].iz() + kr.words.iz() + ' ' +
			(secondWider ? 'шире' : 'у́же') + ' первой. ' + question;

		let fmt = function (x) {
			return String(Math.round(x * 1000) / 1000).replace('.', '{,}');
		};
		let analys = 'Объём цилиндра равен $V = \\pi r^2 h$. Обозначим радиус и высоту первой кружки $r$ и $h$. ' +
			'Тогда у второй кружки высота равна $' + (firstTaller ? '\\frac{h}{' + fmt(kh.k) + '}' : fmt(kh.k) + 'h') +
			'$, а радиус равен $' + (secondWider ? fmt(kr.k) + 'r' : '\\frac{r}{' + fmt(kr.k) + '}') + '$. ' +
			'Значит, $\\frac{V_2}{V_1} = ' + (secondWider ? fmt(kr.k) + '^2' : '\\frac{1}{' + fmt(kr.k) + '^2}') + ' \\cdot ' +
			(firstTaller ? '\\frac{1}{' + fmt(kh.k) + '}' : fmt(kh.k)) + ' = ' +
			(secondBigger ? fmt(ans) : '\\frac{1}{' + fmt(ans) + '}') + '$, ' +
			'то есть объём ' + (secondBigger ? 'второй кружки больше объёма первой' : 'первой кружки больше объёма второй') +
			' в $' + ans + '$ раз' + (ans % 10 >= 2 && ans % 10 <= 4 && (ans % 100 < 12 || ans % 100 > 14) ? 'а' : '') + '.';

		NAtask.setTask({
			text: text,
			answers: ans,
			analys: analys,
			authors: ['chas-ege-selena'],
		});

		let paint1 = function (ct) {
			// Рисуем в условных единицах (радиус первой кружки = 1), ось y направлена вверх.
			// Пропорции чертежа точно соответствуют условию: r2/r1 и h2/h1 - как в задаче.
			// Сами размеры первой кружки в условии не заданы, поэтому её вытянутость
			// подбираем так, чтобы обе кружки были одинаково далеки от «иглы» и «блина»:
			// произведение отношений h/r у кружек постоянно (2,2^2). Иначе при
			// «в четыре с половиной раза ниже, а вторая втрое у́же» вторая кружка
			// выходила в 13,5 раза вытянутее первой - тонкой палочкой без ручки.
			let r1 = 1;
			let h1 = 2.2 * Math.sqrt(rRatio / hRatio);
			let r2 = r1 * rRatio;
			let h2 = h1 * hRatio;
			let sq = 0.28; // сплюснутость эллипсов перспективы
			let ry1 = sq * r1;
			let ry2 = sq * r2;
			let margin = 0.15 * Math.max(r1, r2);
			let gap = 0.35 * Math.max(r1, r2);

			let c1 = margin + r1;
			let c2 = c1 + r1 + Math.min(0.35 * r1, 0.5 * h1) + gap + r2;
			let totalW = c2 + r2 + Math.min(0.35 * r2, 0.5 * h2) + margin;
			let yTop = Math.max(h1 + ry1, h2 + ry2);
			let yBottom = -Math.max(ry1, ry2);
			let totalH = yTop - yBottom + 2 * margin;

			// автомасштабирование под размер canvas
			let s = Math.min(ct.canvas.width / totalW, ct.canvas.height / totalH);
			ct.translate((ct.canvas.width - s * totalW) / 2, (ct.canvas.height - s * totalH) / 2 + s * (yTop + margin));
			ct.scale(s, -s);
			ct.lineWidth = 2 / s;
			ct.strokeStyle = om.secondaryBrandColors.iz();

			let drawMug = function (c, r, h, ry) {
				ct.drawEllipse(c, h, r, ry); // верхний ободок
				// Дно: видимая (нижняя на экране) половина сплошная,
				// невидимая верхняя половина пунктирная. После scale(s, -s)
				// ось y направлена вверх, поэтому видимая половина - углы PI..2*PI.
				ct.drawEllipse(c, 0, r, ry, 0, Math.PI, 2 * Math.PI);
				ct.setLineDash([6 / s, 4 / s]);
				ct.drawEllipse(c, 0, r, ry, 0, 0, Math.PI);
				ct.setLineDash([]);
				ct.drawLine(c - r, 0, c - r, h); // стенки
				ct.drawLine(c + r, 0, c + r, h);
				// Ручка: её размеры ограничены и радиусом, и высотой кружки, иначе
				// у очень плоской или очень узкой кружки (у ФИПИ есть «в четыре
				// с половиной раза ниже, а вторая втрое у́же») ручка вытягивается в полосу
				let hy = 0.55 * h;
				let hw = Math.min(0.35 * r, 0.5 * h);
				let hh = Math.min(0.22 * h, 0.6 * r);
				ct.drawEllipse(c + r, hy, hw, hh, 0, -Math.PI / 2, Math.PI / 2);
				ct.drawEllipse(c + r, hy, hw / 2, hh / 2, 0, -Math.PI / 2, Math.PI / 2);
			};

			drawMug(c1, r1, h1, ry1);
			drawMug(c2, r2, h2, ry2);
		};

		NAtask.modifiers.addCanvasIllustration({
			width: 380,
			height: 230,
			paint: paint1,
		});
	}, 1000);
})();
//510966
//chas-ege-selena
//https://mathb-ege.sdamgia.ru/test?likes=510966

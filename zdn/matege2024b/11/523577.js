(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		// Кратности - как у ФИПИ (F2FD33, F68D58, FEA9F4, AE99C1, 5251BA, 089175,
		// 044EC1, F1F199, 38C38E, 3C4615, 88D3C3); словами они записываются
		// по om.multiplierWords («в полтора раза», «вдвое», «вчетверо» и т.д.)
		let kh = [1.5, 2, 2.5, 3, 4, 4.5].iz(); // по высоте
		let ka = [1.5, 2, 3, 4].iz(); // по ширине
		// Запись кратностей: словами, как у ФИПИ («в полтора раза», «вдвое»), или числом
		// («в $1{,}5$ раза», «в $2$ раза»). preference спрашиваем для каждой кратности
		// заново: если он не задан, запись каждой выбирается случайно и независимо
		let preferenceMultiplier = ['multiplierWords', 'multiplierDigits'];
		let multInWords = function () {
			return getSelectedPreferenceFromList('523577', preferenceMultiplier) === 0;
		};
		// Первая коробка выше или ниже второй; вторая шире или у́же первой
		let firstTaller = sl1();
		let secondWider = sl1();

		// Отношения размеров второй коробки к первой
		let hRatio = firstTaller ? 1 / kh : kh; // h2 / h1
		let aRatio = secondWider ? ka : 1 / ka; // a2 / a1
		// Объём правильной четырёхугольной призмы V = a^2 h, поэтому
		// V2 / V1 = (a2 / a1)^2 * (h2 / h1)
		let ratio = aRatio * aRatio * hRatio;
		let secondBigger = ratio > 1;
		let ans = secondBigger ? ratio : 1 / ratio;
		// У ФИПИ ответы целые или с одним знаком после запятой (F2FD33: 1,6);
		// отношение 1 и близкие к нему не берём - вопрос «во сколько раз больше» теряет смысл
		genAssert((ans * 100).isAlmostInteger(), 'Ответ должен быть конечной десятичной дробью');
		ans = Math.round(ans * 100) / 100;
		genAssert(ans >= 1.5, 'Объёмы коробок должны заметно различаться');

		// Четыре формы вопроса ФИПИ: «во сколько раз объём второй больше
		// объёма первой», «первой меньше второй» (если больше вторая) и наоборот
		let tail = ['', ' коробки'].iz();
		let question = secondBigger ?
			['Во сколько раз объём второй коробки больше объёма первой' + tail + '?', 'Во сколько раз объём первой коробки меньше объёма второй' + tail + '?'].iz() :
			['Во сколько раз объём первой коробки больше объёма второй' + tail + '?', 'Во сколько раз объём второй коробки меньше объёма первой' + tail + '?'].iz();

		let text = 'Даны две коробки, имеющие форму правильной четырёхугольной призмы, стоящей на основании. ' +
			'Первая коробка ' + multiplierPhrase(kh, multInWords()) + ' ' + (firstTaller ? 'выше' : 'ниже') + ' второй, а вторая' +
			[' ', ' — '].iz() + multiplierPhrase(ka, multInWords()) + ' ' + (secondWider ? 'шире' : 'у́же') + ' первой. ' + question;

		let analys = 'Объём правильной четырёхугольной призмы равен $V = a^2 h$, где $a$ — сторона основания, $h$ — высота. ' +
			'Обозначим сторону основания и высоту первой коробки $a$ и $h$. ' +
			'Тогда у второй коробки высота равна $' + (firstTaller ? '\\frac{h}{' + kh + '}' : kh + 'h') +
			'$, а сторона основания равна $' + (secondWider ? ka + 'a' : '\\frac{a}{' + ka + '}') + '$. ' +
			'Значит, $\\frac{V_2}{V_1} = ' + (secondWider ? ka + '^2' : '\\frac{1}{' + ka + '^2}') + ' \\cdot ' +
			(firstTaller ? '\\frac{1}{' + kh + '}' : kh) + ' = ' +
			(secondBigger ? ans : '\\frac{1}{' + ans + '}') + '$, ' +
			'то есть объём ' + (secondBigger ? 'второй коробки больше объёма первой' : 'первой коробки больше объёма второй') +
			' в ' + chislitlx(ans, 'раз', '$') + '.';

		NAtask.setTask({
			text: text,
			answers: ans,
			analys: analys,
			authors: ['chas-ege-selena'],
			preference: [preferenceMultiplier],
		});

		let paintBoxes = function (ct) {
			// Рисуем в условных единицах (сторона основания первой коробки = 1),
			// ось y направлена вверх. Пропорции a2/a1 и h2/h1 - как в задаче.
			// Размеры первой коробки в условии не заданы, поэтому её вытянутость
			// подбираем так, чтобы обе коробки были одинаково далеки от «иглы»
			// и «плиты»: произведение отношений h/a у коробок постоянно (приём из 510966)
			let a1 = 1;
			let h1 = 1.6 * Math.sqrt(aRatio / hRatio);
			let a2 = a1 * aRatio;
			let h2 = h1 * hRatio;
			// Коробки рисует drawParallelepiped(): глубина (сторона основания,
			// уходящая вглубь) сокращена, её проекция - depth * cos(angle) по
			// горизонтали и depth / 2 по вертикали
			let depthRatio = 0.6;
			let angle = Math.PI / 4;
			let dx = depthRatio * Math.cos(angle);
			let dy = depthRatio / 2;
			let gap = 0.35 * Math.max(a1, a2);
			let margin = 0.1 * Math.max(a1, a2, h1, h2);

			let x1 = margin;
			let x2 = x1 + a1 * (1 + dx) + gap;
			let totalW = x2 + a2 * (1 + dx) + margin;
			let totalH = Math.max(h1 + a1 * dy, h2 + a2 * dy) + 2 * margin;

			let s = Math.min(ct.canvas.width / totalW, ct.canvas.height / totalH);
			ct.translate((ct.canvas.width - s * totalW) / 2, (ct.canvas.height + s * totalH) / 2 - s * margin);
			ct.scale(s, -s);
			ct.lineWidth = 2 / s;

			let edgeColor = om.secondaryBrandColors.iz();
			let drawBox = function (x, a, h) {
				ct.save();
				ct.translate(x, 0);
				// Пунктиром - невидимые рёбра при задней нижней вершине (6, 8, 10)
				ct.drawParallelepiped({
					width: a,
					height: h,
					depth: depthRatio * a,
					angle: angle,
					strokeStyle: edgeColor,
				}, [6, 8, 10], false, [6 / s, 4 / s]);
				ct.restore();
			};

			drawBox(x1, a1, h1);
			drawBox(x2, a2, h2);
		};

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 300,
			paint: paintBoxes,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 1000);
})();
//523577
//chas-ege-selena
// https://mathb-ege.sdamgia.ru/problem?id=523577

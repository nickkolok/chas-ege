(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		// Кратности - словами, как у ФИПИ (F2FD33, F68D58, FEA9F4, AE99C1, 5251BA,
		// 089175, 044EC1, F1F199, 38C38E, 3C4615, 88D3C3): по высоте «в полтора
		// раза», «вдвое», «в два с половиной раза», «в четыре раза», «вчетверо»,
		// «в четыре с половиной раза»; по ширине «в полтора раза», «вдвое»,
		// «в два раза», «втрое», «в четыре раза»
		let heightMultipliers = [
			{ k: 1.5, words: ['в полтора раза'] },
			{ k: 2, words: ['вдвое', 'в два раза'] },
			{ k: 2.5, words: ['в два с половиной раза'] },
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
		// Запись кратностей: словами, как у ФИПИ («в полтора раза», «вдвое»), или числом
		// («в $1{,}5$ раза», «в $2$ раза»)
		let preferenceMultiplier = ['multiplierWords', 'multiplierDigits'];
		let inWords = getSelectedPreferenceFromList('523577', preferenceMultiplier) === 0;
		let multWords = function (m) {
			return inWords ? m.words.iz() : 'в $' + String(m.k).replace('.', '{,}') + '$ раза';
		};
		let kh = heightMultipliers.iz();
		let ka = widthMultipliers.iz();
		// Первая коробка выше или ниже второй; вторая шире или у́же первой
		let firstTaller = sl1();
		let secondWider = sl1();

		// Отношения размеров второй коробки к первой
		let hRatio = firstTaller ? 1 / kh.k : kh.k; // h2 / h1
		let aRatio = secondWider ? ka.k : 1 / ka.k; // a2 / a1
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
			'Первая коробка ' + multWords(kh) + ' ' + (firstTaller ? 'выше' : 'ниже') + ' второй, а вторая' +
			[' ', ' — '].iz() + multWords(ka) + ' ' + (secondWider ? 'шире' : 'у́же') + ' первой. ' + question;

		let fmt = function (x) {
			return String(Math.round(x * 100) / 100).replace('.', '{,}');
		};
		let razWord = function (x) {
			if (!x.isAlmostInteger()) {
				return 'раза';
			}
			let n = Math.round(x);
			return n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 'раза' : 'раз';
		};
		let analys = 'Объём правильной четырёхугольной призмы равен $V = a^2 h$, где $a$ — сторона основания, $h$ — высота. ' +
			'Обозначим сторону основания и высоту первой коробки $a$ и $h$. ' +
			'Тогда у второй коробки высота равна $' + (firstTaller ? '\\frac{h}{' + fmt(kh.k) + '}' : fmt(kh.k) + 'h') +
			'$, а сторона основания равна $' + (secondWider ? fmt(ka.k) + 'a' : '\\frac{a}{' + fmt(ka.k) + '}') + '$. ' +
			'Значит, $\\frac{V_2}{V_1} = ' + (secondWider ? fmt(ka.k) + '^2' : '\\frac{1}{' + fmt(ka.k) + '^2}') + ' \\cdot ' +
			(firstTaller ? '\\frac{1}{' + fmt(kh.k) + '}' : fmt(kh.k)) + ' = ' +
			(secondBigger ? fmt(ans) : '\\frac{1}{' + fmt(ans) + '}') + '$, ' +
			'то есть объём ' + (secondBigger ? 'второй коробки больше объёма первой' : 'первой коробки больше объёма второй') +
			' в $' + fmt(ans) + '$ ' + razWord(ans) + '.';

		NAtask.setTask({
			text: text,
			answers: ans,
			analys: analys,
			authors: ['chas-ege-selena'],
			preference: [preferenceMultiplier],
		});
		NAtask.modifiers.allDecimalsToStandard();

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
			// Косоугольная проекция: глубина - половина стороны основания под углом 40°
			let dx = 0.5 * Math.cos(Math.PI * 2 / 9);
			let dy = 0.5 * Math.sin(Math.PI * 2 / 9);
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
			ct.strokeStyle = om.secondaryBrandColors.iz();

			let drawBox = function (x, a, h) {
				let ox = a * dx;
				let oy = a * dy;
				// Передняя грань
				ct.strokeRect(x, 0, a, h);
				// Верхняя и правая боковая грани
				ct.drawLine(x, h, x + ox, h + oy);
				ct.drawLine(x + ox, h + oy, x + a + ox, h + oy);
				ct.drawLine(x + a, h, x + a + ox, h + oy);
				ct.drawLine(x + a + ox, h + oy, x + a + ox, oy);
				ct.drawLine(x + a, 0, x + a + ox, oy);
				// Невидимые рёбра при задней нижней вершине - пунктиром
				ct.setLineDash([6 / s, 4 / s]);
				ct.drawLine(x + ox, oy, x, 0);
				ct.drawLine(x + ox, oy, x + a + ox, oy);
				ct.drawLine(x + ox, oy, x + ox, h + oy);
				ct.setLineDash([]);
			};

			drawBox(x1, a1, h1);
			drawBox(x2, a2, h2);
		};

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 260,
			paint: paintBoxes,
		});
	}, 1000);
})();
//523577
//chas-ege-selena
//https://mathb-ege.sdamgia.ru/problem?id=523577

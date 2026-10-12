(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '522699';
		let preference1 = ['lateral', 'volume'];
		let preference2 = ['firstGreater', 'secondGreater'];
		let kind = getSelectedPreferenceFromList(key, preference1);
		let v = getSelectedPreferenceFromList(key, preference2);

		// Данные - в тех же пределах, что у ФИПИ (1ADCB9, 4AB921, 568EF9, 28D803 -
		// объём; A6DE08, F199D5 - боковая поверхность): радиусы, высоты и образующие
		// от 2 до 9. Высота может быть и меньше радиуса («9 и 2»), и вчетверо больше
		// («2 и 9»): такие конусы на чертеже ещё читаются, а запрещать их значило бы
		// отсечь данные открытого банка.
		let coneParams = function () {
			// при данной образующей радиус меньше её, поэтому не больше 8
			let r = sl(2, kind === 0 ? 8 : 9);
			if (kind === 0) {
				// даны радиус и образующая; образующая длиннее радиуса
				let l = sl(r + 1, 9);
				return { r: r, l: l, h: Math.sqrt(l * l - r * r), given: l, m: r * l };
			}
			// даны радиус и высота
			let h = sl(2, 9);
			return { r: r, h: h, given: h, m: r * r * h };
		};
		let p1 = coneParams();
		let p2 = coneParams();

		// Коэффициенты при pi - целые числа, известные заранее: r * l для боковой
		// поверхности и r^2 * h (без множителя 1/3) для объёма. Образующую берём
		// целой из условия, а не из дробного геттера Cone.generatrix.
		let cone1 = new Cone({ radius: p1.r, height: p1.h });
		let cone2 = new Cone({ radius: p2.r, height: p2.h });
		genAssert(Math.abs((kind === 0 ? cone1.sideSurfaceArea : 3 * cone1.volume) - p1.m * Math.PI) < 1e-6,
			'Коэффициент должен совпасть с вычисленным через класс Cone');

		let m1 = p1.m;
		let m2 = p2.m;
		let mBig = v ? m2 : m1;
		let mSmall = v ? m1 : m2;
		// Отношение не меньше единицы: «больший» конус - тот, о котором спрашивают.
		// У ФИПИ встречаются и равные конусы (например, «3 и 4» и «2 и 9» для объёма),
		// но редко - пропускаем такие пары с вероятностью 1/20.
		genAssert(mBig > mSmall || (mBig === mSmall && sl(19) === 0), 'Конус, о котором спрашивают, должен быть больше');

		let ratio = mBig / mSmall;
		genAssert((10 * ratio).isAlmostInteger(), 'Отношение должно иметь не более одного знака после запятой');
		// Наибольшее отношение у ФИПИ - 32 («2 и 3» против «8 и 6»)
		genAssert(ratio <= 40, 'Отношение не должно превышать 40, иначе ответ неудобочитаем');

		let r1 = p1.r, h1 = p1.h;
		let r2 = p2.r, h2 = p2.h;

		let biggerWord = ['первого', 'второго'][v];
		let smallerWord = ['второго', 'первого'][v];
		let givenWord = kind ? 'высота' : 'образующая';
		let subjectNom = kind ? 'объём' : 'площадь боковой поверхности';
		let subjectGen = kind ? 'объёма' : 'площади боковой поверхности';
		let letter = kind ? 'V' : 'S';

		let paint1 = function (ct) {
			let w = 400;
			let h = 300;
			let gap = 30; // промежуток между конусами, px
			// Сплюснутость эллипса основания общая для обоих конусов (один ракурс)
			// и не больше половины отношения высоты к радиусу: тогда вершина лежит
			// вне эллипса и из неё можно провести касательные к основанию.
			let k = Math.min(0.3, 0.5 * Math.min(h1 / r1, h2 / r2));

			let maxR = Math.max(r1, r2);
			let maxH = Math.max(h1, h2);
			let scale = Math.min((w - 40 - gap) / (2 * r1 + 2 * r2), (h - 40) / (maxH + k * maxR));

			let xLeft = (w - (2 * r1 + 2 * r2) * scale - gap) / 2;
			let y0 = (h + (maxH - k * maxR) * scale) / 2;
			let cx1 = xLeft + r1 * scale;
			let cx2 = xLeft + (2 * r1 + r2) * scale + gap;

			ct.lineWidth = 2;
			ct.strokeStyle = om.secondaryBrandColors.iz();

			let drawCone = function (cx, r, hh) {
				let R = r * scale;
				let H = hh * scale;
				let ry = k * R;
				// Образующие касаются эллипса основания, а не идут в его крайние
				// точки: точка касания лежит на параметре t = -alpha (справа)
				// и PI + alpha (слева), где sin(alpha) = ry / H. Видимая дуга
				// основания - от одной точки касания до другой через передний край.
				let alpha = Math.asin(ry / H);
				let tx = R * Math.cos(alpha);
				let ty = -ry * Math.sin(alpha);
				ct.drawLine(cx - tx, y0 + ty, cx, y0 - H);
				ct.drawLine(cx + tx, y0 + ty, cx, y0 - H);
				ct.drawEllipse(cx, y0, R, ry, 0, -alpha, Math.PI + alpha);
				ct.setLineDash([7, 5]);
				ct.drawEllipse(cx, y0, R, ry, 0, Math.PI + alpha, 2 * Math.PI - alpha);
				ct.setLineDash([]);
			};

			drawCone(cx1, r1, h1);
			drawCone(cx2, r2, h2);
		};

		// В отношении числитель - коэффициент конуса, о котором спрашивают («большего»),
		// знаменатель - другого. Индексы в левой части (letter_{v+1} / letter_{2-v})
		// указывают на эти конусы.
		let ratioText = 'Отношение ' + (kind ? 'объёмов' : 'площадей') + ': $\\frac{' + letter + '_' + (v + 1) + '}{' + letter + '_' + (2 - v) + '} = ' +
			(kind ? '' : '\\frac{' + mBig + '\\pi}{' + mSmall + '\\pi} = ') + '\\frac{' + mBig + '}{' + mSmall + '} = ' + ratio + '$.';
		let analys;
		if (kind === 0) {
			analys = 'Площадь боковой поверхности конуса вычисляется по формуле $S = \\pi r l$, где $r$ — радиус основания, $l$ — образующая. ' +
				'Площадь боковой поверхности первого конуса: $S_1 = \\pi \\cdot ' + r1 + ' \\cdot ' + p1.l + ' = ' + m1 + '\\pi$. ' +
				'Площадь боковой поверхности второго конуса: $S_2 = \\pi \\cdot ' + r2 + ' \\cdot ' + p2.l + ' = ' + m2 + '\\pi$. ' +
				ratioText;
		} else {
			analys = 'Объём конуса вычисляется по формуле $V = \\frac{1}{3}\\pi r^2 h$, где $r$ — радиус основания, $h$ — высота. ' +
				'Объём первого конуса: $V_1 = \\frac{1}{3}\\pi \\cdot ' + r1 + '^2 \\cdot ' + h1 + ' = \\frac{1}{3}\\pi \\cdot ' + m1 + '$. ' +
				'Объём второго конуса: $V_2 = \\frac{1}{3}\\pi \\cdot ' + r2 + '^2 \\cdot ' + h2 + ' = \\frac{1}{3}\\pi \\cdot ' + m2 + '$. ' +
				ratioText;
		}

		NAtask.setTask({
			// Обе формулировки ФИПИ: «...первого конуса?» (1ADCB9) и «...первого?» (4AB921)
			text: 'Даны два конуса. Радиус основания и ' + givenWord + ' первого конуса равны соответственно $' + r1 + '$ и $' + p1.given +
				'$, а второго — $' + r2 + '$ и $' + p2.given + '$. Во сколько раз ' + subjectNom + ' ' + biggerWord + ' конуса больше ' +
				subjectGen + ' ' + smallerWord + [' конуса', ''].iz() + '?',
			answers: ratio,
			analys: analys,
			authors: ['chas-ege-selena', 'Zer00Player'],
			preference: [preference1, preference2],
		});

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 300,
			paint: paint1,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 10000);
})();
//522699
//chas-ege-selena, Zer00Player
//https://mathb-ege.sdamgia.ru/test?likes=522699

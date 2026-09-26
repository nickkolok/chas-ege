(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		// m = sqrt(k). k — либо целое не-полный-квадрат, либо дробное (как в прототипах).
		// Дробный k даёт точку в LaTeX, которую потом поправит allDecimalsToStandard(true).
		let k = sl(0, 1)
			? [0.5, 0.15, 2.2, 0.3, 1.5, 3.5, 7.7].iz()
			: slKrome(x => x.isPolnKvadr(), 2, 15);
		let m = Math.sqrt(k);

		// Случайное выражение от m. У каждой формы — явная проверка ОДЗ (ok):
		// при её нарушении value = NaN, и genAssert по ok не пустит мусор в таблицу.
		// При иррациональном m все формы дают иррациональное значение,
		// поэтому число никогда не сядет ровно на границу двух отрезков.
		let makeExpr = function () {
			let a, b, c, v, ok, latex;
			switch (sl(0, 4)) {
				case 0: // ±a/m ; ОДЗ: m != 0
					a = sl(1, 7).pm();
					latex = (a < 0 ? '-' : '') + '\\frac{' + Math.abs(a) + '}{m}';
					v = a / m;
					ok = m !== 0;
					break;
				case 1: // ±a·m ; ОДЗ тривиален
					a = sl(1, 2).pm();
					latex = (a === -1 ? '-' : (a === 1 ? '' : a)) + 'm';
					v = a * m;
					ok = true;
					break;
				case 2: // ±a·m + b ; ОДЗ тривиален
					a = sl(1, 2).pm();
					b = sl(1, 3).pm();
					latex = (a === -1 ? '-' : (a === 1 ? '' : a)) + 'm' + (b ? (b > 0 ? '+' : '-') + Math.abs(b) : '');
					v = a * m + b;
					ok = true;
					break;
				case 3: // b − a·m ; ОДЗ тривиален
					a = sl(1, 2);
					b = sl(1, 9);
					latex = b + '-' + (a === 1 ? '' : a) + 'm';
					v = b - a * m;
					ok = true;
					break;
				default: // корни: ОДЗ нетривиален у подформ с m+c и c−m
					switch (sl(0, 2)) {
						case 0:
							latex = '\\sqrt{m}';
							v = Math.sqrt(m);
							ok = m >= 0;
							break;
						case 1:
							c = sl(-3, 6);
							latex = '\\sqrt{m' + (c > 0 ? '+' + c : (c < 0 ? c : '')) + '}';
							v = Math.sqrt(m + c);
							ok = m + c >= 0;
							break;
						default:
							c = sl(1, 5);
							latex = '\\sqrt{' + c + '-m}';
							v = Math.sqrt(c - m);
							ok = c - m >= 0;
							break;
					}
					break;
			}
			return { latex: latex, value: v, ok: ok };
		};

		// Отрезок [n; n+1] в LaTeX; $...$ ставим сами, на autoLaTeX не полагаемся.
		let intervalStr = n => '$[' + n + ';\\, ' + (n + 1) + ']$';

		let chosen = [makeExpr(), makeExpr(), makeExpr(), makeExpr()];

		// 1) ОДЗ всех четырёх выражений (иначе value = NaN -> отрезок [NaN; NaN]).
		genAssert(chosen.every(t => t.ok), 'Нарушено ОДЗ одного из выражений');

		// 2) Отрезки в разумных пределах и попарно различны.
		let floors = chosen.map(t => Math.floor(t.value));
		genAssert(floors.every(n => n >= -5 && n <= 9), 'Отрезок вышел за разумные пределы');
		genAssert(new Set(floors).size === 4, 'Два выражения попали в один отрезок');

		let left = chosen.map((t, i) => ({ expr: '$' + t.latex + '$', solution: intervalStr(floors[i]) }));
		let right = floors.map(n => intervalStr(n));

		NAtask.setCorrespondenceTask({
			text: 'Число $m$ равно $\\sqrt{' + k + '}$. ' +
				'Каждому из четырёх чисел в левом столбце соответствует отрезок, которому оно принадлежит. ' +
				'Установите соответствие между числами и отрезками из правого столбца.',
			leftHeader: 'ЧИСЛА',
			left: left,
			rightHeader: 'ОТРЕЗКИ',
			right: right,
			postText: 'Впишите в приведённую в ответе таблицу под каждой буквой соответствующий отрезку номер.',
		});

		// Постобработка десятичных дробей в LaTeX (точка в \sqrt{0.5} -> {,}).
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 20000);
})();
//nadezhda
//https://mathb-ege.sdamgia.ru/problem?id=529910

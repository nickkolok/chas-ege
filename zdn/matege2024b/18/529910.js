(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		// Число в строку для LaTeX/текста: целые как есть, дробные — запятая в {}.
		let fmt = x => {
			let s = String(x);
			return s.includes('.') ? s.replace('.', '{,}') : s;
		};

		// m = sqrt(k); k не должен быть полным квадратом (иначе m целое).
		let k = [2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 0.5, 0.15, 2.2, 0.3, 1.5, 3.5, 7.7].iz();
		let m = Math.sqrt(k);

		// Пул выражений от m: latex — запись, value — значение, ok — ОДЗ.
		let pool = [
			{ latex: '-\\frac{1}{m}',  value: () => -1 / m,            ok: () => true },
			{ latex: '\\frac{1}{m}',   value: () => 1 / m,             ok: () => true },
			{ latex: '\\frac{2}{m}',   value: () => 2 / m,             ok: () => true },
			{ latex: '\\frac{3}{m}',   value: () => 3 / m,             ok: () => true },
			{ latex: '\\frac{6}{m}',   value: () => 6 / m,             ok: () => true },
			{ latex: '\\frac{7}{m}',   value: () => 7 / m,             ok: () => true },
			{ latex: '\\frac{m}{10}',  value: () => m / 10,            ok: () => true },
			{ latex: '-\\frac{m}{10}', value: () => -m / 10,           ok: () => true },
			{ latex: '\\frac{m}{2}',   value: () => m / 2,             ok: () => true },
			{ latex: 'm^3',            value: () => m * m * m,         ok: () => true },
			{ latex: 'm^2',            value: () => m * m,             ok: () => true },
			{ latex: 'm^2-3{,}5',      value: () => m * m - 3.5,       ok: () => true },
			{ latex: 'm^2-1{,}2',      value: () => m * m - 1.2,       ok: () => true },
			{ latex: 'm^2-2',          value: () => m * m - 2,         ok: () => true },
			{ latex: 'm^2+1',          value: () => m * m + 1,         ok: () => true },
			{ latex: 'm-1',            value: () => m - 1,             ok: () => true },
			{ latex: '1-m',            value: () => 1 - m,             ok: () => true },
			{ latex: 'm+1',            value: () => m + 1,             ok: () => true },
			{ latex: 'm+2',            value: () => m + 2,             ok: () => true },
			{ latex: '2m-5',           value: () => 2 * m - 5,         ok: () => true },
			{ latex: '-m+5',           value: () => -m + 5,            ok: () => true },
			{ latex: '5-m',            value: () => 5 - m,             ok: () => true },
			{ latex: '-m',             value: () => -m,                ok: () => true },
			{ latex: '-m-1',           value: () => -m - 1,            ok: () => true },
			{ latex: '-2m',            value: () => -2 * m,            ok: () => true },
			{ latex: '3+m',            value: () => 3 + m,             ok: () => true },
			{ latex: '4m',             value: () => 4 * m,             ok: () => true },
			{ latex: '\\sqrt{m}',      value: () => Math.sqrt(m),      ok: () => m >= 0 },
			{ latex: '\\sqrt{m+1}',    value: () => Math.sqrt(m + 1),  ok: () => m + 1 >= 0 },
			{ latex: '\\sqrt{6+m}',    value: () => Math.sqrt(6 + m),  ok: () => 6 + m >= 0 },
			{ latex: '\\sqrt{2-m}',    value: () => Math.sqrt(2 - m),  ok: () => 2 - m >= 0 },
		];

		// Только конечные нецелые значения (целое = граница двух отрезков, неоднозначно).
		let candidates = pool.filter(t => {
			if (!t.ok(m)) {
				return false;
			}
			let v = t.value(m);
			return isFinite(v) && !Number.isInteger(v);
		});
		genAssert(candidates.length >= 4, 'Слишком мало пригодных выражений для данного m');

		// 4 разных выражения; отрезки [floor; floor+1] должны быть различны.
		let chosen = candidates.iz(4);
		let values = chosen.map(t => t.value(m));
		let floors = values.map(v => Math.floor(v));
		genAssert(floors.every(n => n >= -5 && n <= 9), 'Отрезок вышел за разумные пределы');
		genAssert(new Set(floors).size === 4, 'Два выражения попали в один отрезок');

		// Отрезок в LaTeX; $...$ ставим сами, на autoLaTeX не полагаемся.
		let intervalStr = n => '$[' + n + ';\\, ' + (n + 1) + ']$';

		let left = chosen.map((t, i) => ({ expr: '$' + t.latex + '$', solution: intervalStr(floors[i]) }));
		let right = floors.map(n => intervalStr(n));

		NAtask.setCorrespondenceTask({
			text: 'Число $m$ равно $\\sqrt{' + fmt(k) + '}$. ' +
				'Каждому из четырёх чисел в левом столбце соответствует отрезок, которому оно принадлежит. ' +
				'Установите соответствие между числами и отрезками из правого столбца.',
			leftHeader: 'ЧИСЛА',
			left: left,
			rightHeader: 'ОТРЕЗКИ',
			right: right,
			postText: 'Впишите в приведённую в ответе таблицу под каждой буквой соответствующий отрезку номер.',
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 20000);
})();
//nadezhda
//https://mathb-ege.sdamgia.ru/problem?id=529910

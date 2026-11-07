(function () {
	'use strict';
	let preference = ['radicals', 'powers', 'fractions', 'logarithms', 'oneParameter', 'twoParameters'];
	let variant = getSelectedPreferenceFromList('1730524', preference);
	retryWhileError(function () {
		let a = sl(2, 4);
		let b = sl(2, 5);
		let m = sl(13, 17) / 10;
		let n = -sl(13, 17) / 10;
		let known = [];
		let values;
		if (variant === 0) {
			values = [a, a + 3, a + 9, a + 15].map(number => ['\\sqrt{' + number + '}', Math.sqrt(number)]);
		} else if (variant === 1) {
			let base = [1.2, 1.4, 1.5].iz();
			values = [-2, -1, 1, 2].map(power => ['(' + base.ts() + ')^{' + power + '}', base ** power]);
		} else if (variant === 2) {
			let denominator = sl(3, 7);
			values = [-b - denominator, -b, a, a + denominator].map(number => [number.texfrac(denominator), number / denominator]);
		} else if (variant === 3) {
			values = [(1).texfrac(a), '1', a + 1 + '', a ** 2 + a + ''].map((argument, i) => [
				'\\log_{' + a + '}{' + argument + '}',
				[-1, 0, Math.log(a + 1) / Math.log(a), Math.log(a ** 2 + a) / Math.log(a)][i],
			]);
		} else {
			known.push({value: m, label: 'm', mark: 'dot', labelPos: 'underAxis'});
			if (variant === 5) known.push({value: n, label: 'n', mark: 'dot', labelPos: 'underAxis'});
			values = variant === 4 ? [
				[a + '-m', a - m],
				['m^2', m * m],
				['\\sqrt{m+1}', Math.sqrt(m + 1)],
				['-' + b.texfrac('m'), -b / m],
			] : [
				['mn', m * n],
				['m-n', m - n],
				['m^2-n^2', m * m - n * n],
				[(1).texfrac('m') + '+n', 1 / m + n],
			];
		}
		values.sort((first, second) => first[1] - second[1]);
		let span = values[3][1] - values[0][1];
		genAssert(values.every((item, i) => !i || item[1] - values[i - 1][1] > Math.max(0.16, span / 14)),
			'Точки не должны сливаться на рисунке');
		let labels = ['P', 'Q', 'R', 'S'];
		let left = values.map(([solution], i) => ({expr: 'точка $' + labels[i] + '$', solution}));
		let points = values.map((item, i) => ({value: item[1], label: labels[i], mark: 'dot', labelPos: 'overAxis'}));
		// Рисуем целые деления, в том числе 0 и 1, чтобы задать масштаб.
		let lower = Math.min(0, Math.floor(values[0][1]));
		let upper = Math.max(1, Math.ceil(values[3][1]));
		for (let value = lower; value <= upper; value++) {
			points.push({value, label: value, mark: 'line', labelPos: 'underAxis'});
		}
		points.push(...known);
		NAtask.setCorrespondenceTask({
			text: (variant === 4 ? 'На оси отмечено число $m$. ' : variant === 5 ? 'На оси отмечены числа $m$ и $n$. ' : '') +
				'Установите соответствие между точками на координатной прямой и их координатами.',
			leftHeader: 'ТОЧКИ',
			rightHeader: 'ЧИСЛА',
			left,
			right: values.map(item => item[0]),
			autoLaTeXRight: true,
			postText: 'Запишите номера чисел в порядке букв таблицы.',
			preference,
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 640, height: 100,
			paint: ct => coordAxis_drawAuto(ct, {points, width: 640}),
		});
	}, 1000);
})();

// 1A67DC, D56780, 2A9016, 529CC7, B844FB, 2BB4CE, 557D03, 8402B1, AC22A5, A42B46, B2E0BE, 14AD3E, 7BF8D6, BD30DD, 7A2F4A, 6CE71F, F80858, 3D2A01, C6B7D5, BB2E1E, DB85BD, 94B0E1, 1EBD0E, A0A58B, C40266, 635770, 811AA6, E43C7C, C69616, BDB17F, E253FB, 03B830, A3DF2A, 3BE19B, D4ED9A, F01BDE, 5E13A8, 74A90B, 427694, 17AFB2, 42805B, 3753A0, A988D0, 6EBCC4, 9760DE

(function () {
	'use strict';
	let preference = ['radicals', 'mixedNumbers', 'givenLogarithm', 'oneAxis'];
	let variant = getSelectedPreferenceFromList('11568755', preference);
	retryWhileError(function () {
		let values, introduction = '', points = [];
		if (variant < 2) {
			let a = [2, 3, 5, 6, 7, 8].iz();
			let b = slKrome(a, 2, 8);
			let c = sl(2, 4);
			let d = sl(2, 5);
			let ra = '\\sqrt{' + a + '}';
			let rb = '\\sqrt{' + b + '}';
			let v = Math.sqrt(a);
			let w = Math.sqrt(b);
			let fraction = sl(8, 24);
			let base = sl(2, 4);
			let logArg = base ** 2 + sl(1, base);
			values = variant === 0 ? [
				[ra + '+' + c + rb, v + c * w],
				[ra + ':' + rb, v / w],
				[c + ra + '-' + rb, c * v - w],
				['(' + ra + ')^3-' + d, a * v - d],
			] : [
				['\\log_{' + base + '}{' + logArg + '}', Math.log(logArg) / Math.log(base)],
				[fraction.texfrac(7), fraction / 7],
				[ra, v],
				['(' + (2).texfrac(2 * d + 1) + ')^{-1}', d + 0.5],
			];
		} else {
			let m;
			if (variant === 2) {
				let [base, arg] = [[2, 3], [3, 5], [4, 6], [5, 4], [2, 5]].iz();
				m = Math.log(arg) / Math.log(base);
				introduction = 'Число $m$ равно $\\log_{' + base + '}{' + arg + '}$. ';
			} else {
				m = sl(12, 24) / 10;

				introduction = 'На координатной прямой отмечено число $m$. ';
				points = [-3, -2, -1, 0, 1, 2, 3].map(value => ({value, label: value, mark: 'line', labelPos: 'underAxis'}));
				points.push({value: m, label: 'm', mark: 'dot', labelPos: 'overAxis'});

			}
			let a = sl(3, 8);
			let b = sl(2, 5);
			let useSquare = sl1();
			let secondValue = useSquare ? ['m^2', m * m] : ['\\sqrt{m+' + a + '}', Math.sqrt(m + a)];
			values = [
				[a + '-m', a - m],
				secondValue,
				['m-1', m - 1],
				['-' + b.texfrac('m'), -b / m],
			];
		}
		let left = values.map(([expr, value]) => {
			let lower = Math.floor(value);
			let fraction = value - lower;
			genAssert(fraction > 0.07 && fraction < 0.93, 'Число слишком близко к границе отрезка');
			return {expr, solution: '[' + lower + '; ' + (lower + 1) + ']'};
		});
		let right = left.map(row => row.solution);
		genAssert(!right.hasDubl(), 'Числа должны лежать в разных отрезках');
		NAtask.setCorrespondenceTask({
			text: introduction + 'Установите соответствие между числами и отрезками, которым они принадлежат.',
			leftHeader: 'ЧИСЛА',
			rightHeader: 'ОТРЕЗКИ',
			left,
			right,
			autoLaTeXLeft: true,
			autoLaTeXRight: true,
			postText: 'Запишите номера отрезков в порядке букв.',
			preference,
		});
		if (points.length) {
			NAtask.modifiers.addCanvasIllustration({
				width: 560, height: 100,
				paint: ct => coordAxis_drawAuto(ct, {points, width: 560}),
			});
		}
	}, 1000);
})();

// B08673, 34F836, D45446, 43C366, A346D5, 553918, A611DA, 64747A, 70EAAF, 00511A, 787F51, 7B8937, 1F7492, 07DA0A, 260A20, 0E46D8, 374891, FBAD4D, AF39EB, 1C659A, 7D3F14, 6FB940, E2598D, D80090, 53E97D, 7878FA, 35954E, 633BCB, C11B2B, C02CE2

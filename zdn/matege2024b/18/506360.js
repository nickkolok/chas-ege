(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	let preference = ['radicals', 'mixedNumbers', 'givenLogarithm', 'oneAxis', 'givenRoot'];
	let key = nabor.preferences && nabor.preferences['11568755'] && !nabor.preferences['506360'] ? '11568755' : '506360';
	let variant = getSelectedPreferenceFromList(key, preference);
	function root(a) {
		return '\\sqrt{' + a + '}';
	}
	function coefficient(a) {
		return a === 1 ? '' : a === -1 ? '-' : a;
	}
	function signed(a) {
		return a ? (a > 0 ? '+' : '') + a : '';
	}
	function mExpression(type, a, b, c) {
		switch (type) {
			case 0:
				return [a + '-m', m => a - m];
			case 1:
				return ['m' + signed(b), m => m + b];
			case 2:
				return [coefficient(a) + 'm' + signed(b), m => a * m + b];
			case 3:
				return ['m^{' + c + '}' + (b ? (b > 0 ? '+' : '-') + Math.abs(b).texfrac(2) : ''), m => m ** c + b / 2];
			case 4:
				return [(a < 0 ? '-' : '') + root('m' + signed(b)), m => Math.sign(a) * Math.sqrt(m + b)];
			case 5:
				return [root(b + '-m'), m => Math.sqrt(b - m)];
			case 6:
				return ['-' + root('-m'), m => -Math.sqrt(-m)];
			case 7:
				return [a.texfrac('m'), m => a / m];
			case 8:
				return [(a < 0 ? '-' : '') + '\\frac{m}{' + Math.abs(a) + '}', m => m / a];
			case 9:
				return ['\\log_{' + Math.abs(a) + '}{m}', m => Math.log(m) / Math.log(Math.abs(a))];
			case 11:
				return [b + '+m', m => b + m];
			case 12:
				return [root(b + '+m'), m => Math.sqrt(b + m)];
			case 13:
				return ['m^{' + c + '}' + signed(b / 2), m => m ** c + b / 2];
			default:
				return [root('m') + signed(b), m => Math.sqrt(m) + b];
		}
	}
	retryWhileError(function () {
		let values, introduction = '', points = [], m, readingError = 0;
		if (variant === 0) {
			values = Array.from({length: 4}, () => {
				let a = sl(2, 15), b = sl(2, 15);
				let c = sl(1, 4), d = sl(1, 4);
				let v = Math.sqrt(a), w = Math.sqrt(b);
				let sign = sl1() ? 1 : -1;
				let offset = sl(-10, 3);
				return [
					[coefficient(c) + root(a) + (sign > 0 ? '+' : '-') + coefficient(d) + root(b), c * v + sign * d * w],
					[coefficient(c) + root(a) + ':' + root(b), c * v / w],
					[root(a) + '\\cdot ' + coefficient(c) + root(b), v * c * w],
					[coefficient(c) + root(a) + signed(offset), c * v + offset],
					['(' + root(a) + ')^3' + signed(offset), a * v + offset],
					['(' + root(a) + ')^3-' + root(b), a * v - w],
				].iz();
			});
		} else if (variant === 1) {
			let base = sl(2, 5), arg = sl(1, 5000) / 100;
			let numerator = sl(1, 50), denominator = sl(2, 15);
			let radicand = sl(1, 3000) / 100;
			let powerBase = sl(1, 300) / 100, power = sl(1, 3);
			values = [
				['\\log_{' + base + '}{' + arg + '}', Math.log(arg) / Math.log(base)],
				[numerator.texfrac(denominator), numerator / denominator],
				[root(radicand), Math.sqrt(radicand)],
				['(' + powerBase + ')^{-' + power + '}', powerBase ** -power],
			];
		} else {
			if (variant === 2) {
				let base = sl(2, 5), arg = sl(2, 6);
				m = Math.log(arg) / Math.log(base);
				introduction = 'Число $m$ равно $\\log_{' + base + '}{' + arg + '}$. ';
			} else if (variant === 4) {
				let radicand = sl(1, 600) / 100;
				m = Math.sqrt(radicand);
				introduction = 'Число $m$ равно $' + root(radicand) + '$. ';
			} else {
				m = slKrome(0, -25, 25) / 10;
				let fineTicks = sl1();
				// A point on a labelled integer tick has an exact coordinate.
				readingError = Number.isInteger(m) ? 0 : fineTicks ? 0.02 : 0.15;
				genAssert(Math.abs(m) > readingError, 'Окрестность числа не должна пересекать ноль');
				introduction = 'На координатной прямой отмечено число $m$. ';
				let tickScale = fineTicks ? 10 : 1;
				for (let tick = (Math.floor(m) - 1) * tickScale; tick <= (Math.ceil(m) + 1) * tickScale; tick++) {
					let value = tick / tickScale;
					let label = tick % tickScale === 0 ? value : '';
					points.push({value, label, mark: 'line', labelPos: 'underAxis'});
				}
				points.push({value: m, label: 'm', mark: 'dot', labelPos: 'overAxis'});
			}
			values = Array.from({length: 4}, () => {
				let expression = mExpression(sl(0, 13), slKrome(0, -10, 10), sl(-7, 8), sl(2, 3));
				return [expression[0], expression[1](m), expression[1]];
			});
		}
		let bounds = values.map(([, value, evaluate]) => {
			let checks = variant === 3 ? [evaluate(m - readingError), value, evaluate(m + readingError)] : [value];
			genAssert(checks.every(Number.isFinite), 'Выражение не определено');
			let low = Math.min(...checks), high = Math.max(...checks);
			genAssert(low > -15 && high < 20, 'Слишком большой диапазон координат');
			let lower = Math.floor(Math.round(low * 1e10) / 1e10) - sl1();
			let upper = Math.ceil(Math.round(high * 1e10) / 1e10) + sl1();
			if (lower === upper) {
				upper++;
			}
			return [lower, upper];
		});
		values.forEach(([, value, evaluate], i) => {
			let checks = variant === 3 ? [evaluate(m - readingError), value, evaluate(m + readingError)] : [value];
			genAssert(bounds.every(([low, high], j) => checks.every(v =>
				j === i ? v >= low - 1e-9 && v <= high + 1e-9 : v < low - 1e-9 || v > high + 1e-9)),
				'Соответствие должно оставаться единственным при неточном чтении координаты');
		});
		let right = bounds.map(([low, high]) => '[' + low + '; ' + high + ']');
		let left = values.map(([expr], i) => ({expr, solution: right[i]}));
		NAtask.setCorrespondenceTask({
			text: introduction + 'Каждому из четырёх чисел в левом столбце соответствует отрезок, которому оно принадлежит. ' +
				'Установите соответствие между числами и отрезками из правого столбца.',
			leftHeader: 'ЧИСЛА',
			rightHeader: 'ОТРЕЗКИ',
			left,
			right,
			autoLaTeXLeft: true,
			autoLaTeXRight: true,
			postText: 'Впишите в приведённую в ответе таблицу под каждой буквой соответствующий отрезку номер.',
			preference,
		});
		if (points.length) {
			NAtask.modifiers.addCanvasIllustration({
				width: 560, height: 100,
				paint: ct => coordAxis_drawAuto(ct, {points, width: 560}),
			});
		}
		NAtask.modifiers.allDecimalsToStandard();
	}, 20000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=506360
// B08673, 34F836, D45446, 43C366, A346D5, 553918, A611DA, 64747A, 70EAAF, 00511A, 787F51, 7B8937, 1F7492, 07DA0A, 9EC776, 0B6292, 034F55, C85877, 0531D1, 2F5C04, C78362, C7B75E, 260A20, 0E46D8, 374891, FBAD4D, AF39EB, 1C659A, 7D3F14, 6FB940, E2598D, D80090, 53E97D, 7878FA, 35954E, 633BCB, C11B2B, C02CE2

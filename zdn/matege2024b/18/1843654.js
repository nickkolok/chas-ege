(function () {
	'use strict';
	let preference = ['logarithmic', 'quadratic', 'rational', 'sharedRoot', 'logarithmsOnRight'];
	let variant = getSelectedPreferenceFromList('1843654', preference);
	let left;
	let halfline = (boundary, greater, closed) => greater ?
		(closed ? '[' : '(') + boundary + ';+\\infty)' :
		'(-\\infty;' + boundary + (closed ? ']' : ')');
	let interval = (a, b) => '(' + a + ';' + b + ')';
	let union = (a, b) => a + '\\cup' + b;
	let fraction = (a, b) => '\\frac{' + a + '}{' + b + '}';
	if (variant === 0) {
		let base = sl(2, 7);
		let exponent = sl(1, 2);
		let power = base ** exponent;
		let reciprocal = (1).texfrac(power);
		let log = '\\log_{' + base + '}';
		let bound = sl1() ? exponent : log + '{' + power + '}';
		left = [
			{expr: log + ' x>' + bound, solution: halfline(power, true, false)},
			{expr: log + ' x<-' + bound, solution: interval(0, reciprocal)},
			{expr: log + ' x>-' + bound, solution: halfline(reciprocal, true, false)},
			{expr: log + ' x<' + bound, solution: interval(0, power)},
		];
	} else if (variant === 1) {
		let a = sl(1, 5);
		let b = a + sl(1, 5);
		let c = sl(1, 6);
		let d = slKrome(c, 1, 8);
		left = [[a, b], [-b, -a], [-c, d], [-d, c]].map(([first, second], i) => {
			let expr = ['x^2', -(first + second) + 'x', first * second].slag0();
			let solution = i < 2 ?
				union(halfline(first, false, true), halfline(second, true, true)) :
				'[' + first + ';' + second + ']';
			return {expr: expr + (i < 2 ? '\\ge0' : '\\le0'), solution};
		});
	} else if (variant === 2) {
		let a = sl(1, 5);
		let b = a + sl(1, 6);
		let first = 'x-' + a;
		let second = 'x-' + b;
		left = [
			{expr: '(' + first + ')^2(' + second + ')<0', solution: union(halfline(a, false, false), interval(a, b))},
			{expr: '(' + first + ')(' + second + ')<0', solution: interval(a, b)},
			{expr: fraction(first, second) + '>0', solution: union(halfline(a, false, false), halfline(b, true, false))},
			{expr: fraction('(' + second + ')^2', first) + '>0', solution: union(interval(a, b), halfline(b, true, false))},
		];
	} else if (variant === 3) {
		let a = sl(1, 9);
		left = [
			{expr: 'x(x-' + a + ')\\le0', solution: '[0;' + a + ']'},
			{expr: 'x(x+' + a + ')\\le0', solution: '[-' + a + ';0]'},
			{expr: fraction('x', 'x-' + a) + '\\le0', solution: '[0;' + a + ')'},
			{expr: fraction('x', 'x+' + a) + '\\le0', solution: '(-' + a + ';0]'},
		];
	} else {
		let base = sl(2, 5);
		let a = sl(2, 4);
		let b = sl(1, a - 1);
		let power = base + '^x';
		let log = '\\log_{' + base + '}';
		left = [
			{expr: power + '>' + log + ' ' + base, solution: halfline(0, true, false)},
			{expr: power + '>' + base ** a, solution: halfline(a, true, false)},
			{expr: power + '<' + base ** b, solution: halfline(b, false, false)},
			{expr: power + '>' + log + '{' + (1).texfrac(base) + '}', solution: '\\mathbb{R}'},
		];
	}
	NAtask.setCorrespondenceTask({
		text: 'Установите соответствие между неравенствами и множествами их решений.',
		leftHeader: 'НЕРАВЕНСТВА',
		rightHeader: 'РЕШЕНИЯ',
		left,
		right: left.map(row => row.solution),
		autoLaTeXLeft: true,
		autoLaTeXRight: true,
		postText: 'Запишите номера решений в порядке букв.',
		preference,
	});
})();

// 44F70A, 2AAEFE, DE4B8F, 7609A1, 065A62, 621606, 6EE003, D8E203, 667216, CE4081, 19654A, F0F179, 6022B4, F6A854, 2D36FF, A992A6, F2B014, 1F83EF, 299C93, 44BA1E, 3C9519, C459F2, 22F167, 026BF5, 59BB7D, 3E9A97, EF2D21, 9667D6, CD07AA, 3EBD98, 8C4F9E, DB60CA, D7B5FB, 88FFE1, D9B7B1, 9A60B0, 86E7E6, 1BEE11, 00B7E3, A12814, AE4EE3, EF987E, E241C0, 5CF896, A6397F, 4CDBDE, 31A762, F5E83F, D54D39, 076415, 63CB5B, 1916DE, A9C9D4, 381F32, FB2476, 26D789, 902E7F, 879807, 624A1A, 840253, A30F44, 21FA9C, 4FEA96, 1C21C6, F0F335, 632C18, 16F6DB, EE6188, 6E60D3, DC6C98, C18983, C876DC, 71290C, 750D98, 19FFC1, 520ED5, 58DA4C, C01342, F3B20A, B28F7D, 2D7853, B095EA, F103AF, 8D58B3, 3F33D7, 03F1A6, 085187, 588F34, ECC8DE, 03F947, 06294E, C31199

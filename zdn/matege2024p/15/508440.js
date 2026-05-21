(function() {
	retryWhileError(function() {
		let a = sluchch(-5, 1);
		let b = slKrome(0, a + 1, a + 2);
		let d = slKrome(0, b + 1, b + 2);
		let slNum = sl1();
		let sign = ['+', '-', ''];
		let sign2 = ['-', '+', ''];
		let sign3 = ['-', ''];
		let denominator = sluchch(2, 5);
		let numerator = denominator * [b, d][slNum] - [b, d][slNum] / Math.abs([b, d][slNum]);

		genAssertIrreducible(numerator, denominator, 'Дробь должна быть несократима');
		genAssert(numerator / denominator > b, 'Правый конец должен быть больше левого');
		genAssert(numerator / denominator < d, 'Правый конец должен быть больше левого');

		const checkSign = (member) =>
			member > 0 ? 1 : member < 0 ? 0 : 2;
		let c = numerator + '/' + denominator;
		let e = d + sluchch(1, 2);
		let up = [a, b, d, e].shuffle();
		let down = up.filter(item => item !== up[0]);
		down = down.sortNumeric();
		const checkAnswer = (member) =>
			up[0] == member ? 0 : 1;
		const checkZero = (member) =>
			member == 0 ? "" : member;
		const checkOne = (member) =>
			member == 1 ? "" : member;
		const checkZeroWithCases = (member) =>
			member == 0 ? "x" : "(x" + sign[checkSign(member)] + Math.abs(member) + ")";

		let answer = "(-∞;" + a + ["]", ")"][checkAnswer(a)] + "U" + ["[", "("][checkAnswer(b)] + b + ";" + c + "]U" + [
			"[", "("
		][checkAnswer(d)] + d + ";" + e + ["]", ")"][checkAnswer(e)];

		function gcd(a, b) {
			a = Math.abs(a);
			b = Math.abs(b);
			while (b !== 0) {
				let t = b;
				b = a % b;
				a = t;
			}
			return a;
		}

		function lcm(a, b) {
			return Math.abs(a * b) / gcd(a, b);
		}

		function toFraction(value, eps = 1e-9) {
			let num = Math.round(value * 1e9);
			let den = 1e9;
			let g = gcd(num, den);
			return {
				num: num / g,
				den: den / g
			};
		}

		let k1 = -down[0];
		let k2 = -down[1];
		let k3 = -down[2];
		let am = denominator;
		let bm = denominator * up[0] + numerator;
		let cm = numerator * up[0];

		let N_A = (am * k1 * k1 + bm * k1 + cm) / ((k1 - k2) * (k1 - k3));
		let N_B = (am * k2 * k2 + bm * k2 + cm) / ((k2 - k1) * (k2 - k3));
		let N_C = (am * k3 * k3 + bm * k3 + cm) / ((k3 - k1) * (k3 - k2));

		let slSign = sl1();
		let lessOrMore;
		denominator < 0 ? lessOrMore = 0 : lessOrMore = 1;

		//Приведение к общему знаменателю
		let fracA = toFraction(N_A);
		let fracB = toFraction(N_B);
		let fracC = toFraction(N_C);

		let commonDen = lcm(lcm(fracA.den, fracB.den), fracC.den);

		let A_int = fracA.num * (commonDen / fracA.den);
		let B_int = fracB.num * (commonDen / fracB.den);
		let C_int = fracC.num * (commonDen / fracC.den);

		//Сокращение общего множителя
		let g_all = gcd(gcd(Math.abs(A_int), Math.abs(B_int)), Math.abs(C_int));
		if (g_all > 1) {
			A_int /= g_all;
			B_int /= g_all;
			C_int /= g_all;
		}

		genAssert(A_int < 1000, "Числитель должен быть меньше 1000");
		genAssert(B_int < 1000, "Числитель должен быть меньше 1000");
		genAssert(C_int < 1000, "Числитель должен быть меньше 1000");

		NAtask.setTask({
			text: 'Решите неравенство: $$' + sign3[Math.abs(checkSign(A_int) + [0, -1][slSign])] +
				'\\frac{' + Math.abs(A_int) + '}{' + 'x' + sign[checkSign(down[0])] + checkZero(Math.abs(down[0])) + '}' +
				sign2[Math.abs(checkSign(B_int) + [0, -1][slSign])] +
				'\\frac{' + Math.abs(B_int) + '}{' + 'x' + sign[checkSign(down[1])] + checkZero(Math.abs(down[1])) + '}' +
				sign2[Math.abs(checkSign(C_int) + [0, -1][slSign])] +
				'\\frac{' + Math.abs(C_int) + '}{' + 'x' + sign[checkSign(down[2])] + checkZero(Math.abs(down[2])) + '}' + [
					'\\ge', '\\le'
				][Math.abs(lessOrMore + [0, -1][slSign])] + '0' + '$$' +
				'Используйте в ответе знаки: -∞, +∞, U. Если в ответе есть дробь, записывайте её в виде x/y.',
			analys: 'Решение: ' +
				'$$' + sign3[Math.abs(checkSign(A_int) + [0, -1][slSign])] +
				'\\frac{' + Math.abs(A_int) + '}{' + 'x' + sign[checkSign(down[0])] + checkZero(Math.abs(down[0])) + '}' +
				sign2[Math.abs(checkSign(B_int) + [0, -1][slSign])] +
				'\\frac{' + Math.abs(B_int) + '}{' +
				'x' + sign[checkSign(down[1])] + checkZero(Math.abs(down[1])) + '}' +
				sign2[Math.abs(checkSign(C_int) + [0, -1][slSign])] +
				'\\frac{' + Math.abs(C_int) + '}{' + 'x' + sign[checkSign(down[2])] + checkZero(Math.abs(down[2])) + '}' + [
					'\\ge', '\\le'
				][Math.abs(lessOrMore + [0, -1][slSign])] + '0' +
				'\\Leftrightarrow' +
				'\\frac{' + sign3[Math.abs(checkSign(A_int) + [0, -1][slSign])] + checkOne(Math.abs(A_int)) +
				checkZeroWithCases(down[1]) + checkZeroWithCases(down[2]) +
				sign2[Math.abs(checkSign(B_int) + [0, -1][slSign])] + checkOne(Math.abs(B_int)) +
				checkZeroWithCases(down[0]) + checkZeroWithCases(down[2]) +
				sign2[Math.abs(checkSign(C_int) + [0, -1][slSign])] + checkOne(Math.abs(C_int)) +
				checkZeroWithCases(down[0]) + checkZeroWithCases(down[1]) + '}{' +
				checkZeroWithCases(down[0]) +
				checkZeroWithCases(down[1]) +
				checkZeroWithCases(down[2]) + '}' + ['\\ge', '\\le'][Math.abs(lessOrMore + [0, -1][slSign])] + '0' +
				'\\Leftrightarrow' +
				'\\frac{' + denominator + 'x^2' +
				sign[checkSign(denominator * up[0] + numerator)] + checkOne(Math.abs(denominator * up[0] + numerator)) + 'x' +
				sign2[checkSign(up[0] * numerator)] + checkZero(Math.abs(up[0] * numerator)) + '}{' +
				checkZeroWithCases(down[0]) +
				checkZeroWithCases(down[1]) +
				checkZeroWithCases(down[2]) + '} \\le 0' +
				' \\Leftrightarrow \\\\~\\\\ \\Leftrightarrow' +
				'\\frac{(' + denominator + 'x' + sign[checkSign(numerator)] + Math.abs(numerator) + ')' +
				checkZeroWithCases(up[0]) + '}{' +
				checkZeroWithCases(down[0]) +
				checkZeroWithCases(down[1]) +
				checkZeroWithCases(down[2]) + '} \\le 0' +
				'\\Leftrightarrow' +
				'\\left[\\begin{aligned} x ' + ['\\le', '<'][checkAnswer(a)] + a + '\\\\' +
				b + ['\\le', '<'][checkAnswer(b)] + ' x \\le ' +
				sign3[Math.abs(checkSign(numerator))] + '\\frac{' + Math.abs(numerator) + '}{' + denominator + '}' +
				' \\\\' +
				d + ['\\le', '<'][checkAnswer(d)] + ' x ' + ['\\le', '<'][checkAnswer(e)] + e +
				'\\end{aligned}\\right.$$',
			answers: answer,
			authors: ['Сергей Алендарь'],
		});
	}, 1000);
})();
//508440

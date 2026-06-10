retryWhileUndefined(function() {
	NAinfo.requireApiVersion(0, 2);

	//Генерация коэффициентов
	let k1 = sl(1, 2);
	let b1 = sl(-4, 3);
	let c1 = sl(-3, -1);
	let k2 = k1 + sl(1, 3);
	let b2 = -4 * k2;
	let left = (c1 - b1) / k1;
	let right = (-c1 - b1) / k1;
	let slC1 = sl1();

	// Проверка области рисования графика
	let vertex1 = -b1 / k1;
	let yVertex1 = Math.abs(k1 * vertex1 + b1) + c1;
	if (Math.abs(vertex1) > 5.5 || Math.abs(yVertex1) > 5.5) return;
	let vertex2 = -b2 / k2;
	if (Math.abs(vertex2) > 5.5) return;

	// Вспомогательные функции для вывода
	const checkSign = (member) =>
		member > 0 ? `+ ${member}` : member < 0 ? `- ${-member}` : ``;
	const checkOne = (member) =>
		member === 1 ? '' : (member === -1 ? '-' : member);

	// Формулы для отображения
	let fFormula = `|${checkOne(k1)}x ${b1 >= 0 ? '+' : '-'} ${Math.abs(b1)}|`;
	let gFormula = `|${checkOne(k2)}x - a|`;
	if (b1 === 0) fFormula = `|${k1}x|`;
	let leftExpr = gFormula + (slC1 ? '' : `${c1 >= 0 ? '-' : '+'} ${Math.abs(c1)}`);
	let rightExpr = fFormula + (slC1 ? `${c1 >= 0 ? '+' : '-'} ${Math.abs(c1)}` : '');

	//Функция рисования графика
	function drawGraphToDataURL() {
		let canvas = document.createElement('canvas');
		canvas.width = 400;
		canvas.height = 400;
		let ctx = canvas.getContext('2d');

		ctx.drawCoordPlane(300, 300, {
			hor: 1,
			ver: 1
		}, {
			x1: '1',
			y1: '1',
			sh1: 13
		}, 20);
		ctx.scale(20, -20);
		ctx.lineWidth = 0.1;

		ctx.strokeStyle = "darkblue";
		graph9AdrawFunction(ctx, function(x) {
			return Math.abs(k1 * x + b1) + c1;
		}, {
			minX: -6.8,
			maxX: 7.8,
			minY: -6.8,
			maxY: 6.8,
			step: 0.05
		});

		ctx.strokeStyle = "red";
		graph9AdrawFunction(ctx, function(x) {
			return Math.abs(k2 * x + b2);
		}, {
			minX: -6.8,
			maxX: 7.8,
			minY: -6.8,
			maxY: 6.8,
			step: 0.05
		});

		ctx.save();
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.font = "bold 16px Arial";
		ctx.fillStyle = "darkblue";
		ctx.fillText("f(x) = " + (fFormula + `${c1 >= 0 ? '+' : '-'} ${Math.abs(c1)}`).replace(/\|/g, '|'), 8, 255);
		ctx.fillStyle = "red";
		ctx.fillText("g(x) = " + gFormula.replace(/\|/g, '|'), 8, 275);
		ctx.fillStyle = "red";
		ctx.fillText('a', 215, 156);
		ctx.fillText('_', 215, 157);
		ctx.fillText(k2, 215, 174);
		ctx.restore();

		return canvas.toDataURL();
	}

	let imgSrc = drawGraphToDataURL();

	//Отображение знаков при раскрытии модуля
	let subExprAtLeft = k1 * left + b1; // равно c1 (отрицательное)
	let signLeft = (subExprAtLeft >= 0) ? '+' : '-';
	let coeffAfterAbs = (signLeft === '+') ? k1 : -k1;
	let constAfterAbs = (signLeft === '+') ? b1 : -b1;
	let rightPartConst = constAfterAbs + c1; // свободный член (целое)
	let rightPartCoeff = coeffAfterAbs; // коэффициент при x (целое)

	//Вычисление a в виде дроби
	let R = rightPartConst;
	let rc = rightPartCoeff;
	let P = k2 - rc;
	let Q = k2 + rc;
	let Z = k2 - k1;
	let N = k2 + k1;

	let numerator1 = P * Q - 2 * k2 * R;
	let denominator1 = 2 * rc;
	let numerator2 = Z * N - 2 * k2 * (b1 + c1);
	let denominator2 = 2 * k1;

	//НОД
	let gcd = (a, b) => {
		a = Math.abs(a);
		b = Math.abs(b);
		while (b !== 0) {
			let t = b;
			b = a % b;
			a = t;
		}
		return a;
	};
	let common = gcd(numerator1, denominator1);
	numerator1 /= common;
	denominator1 /= common;
	common = gcd(numerator2, denominator2);
	numerator2 /= common;
	denominator2 /= common;
	// Приводим знак к знаменателю > 0
	if (denominator1 < 0) {
		numerator1 = -numerator1;
		denominator1 = -denominator1;
	}
	if (denominator2 < 0) {
		numerator2 = -numerator2;
		denominator2 = -denominator2;
	}
	let checkOneDenom = (num, denom) => denom === 1 ? num : '\\frac{' + num + '}{' + denom + '}';
	let aFraction = (denominator1 === 1) ? numerator1.toString() : `\\frac{${numerator1}}{${denominator1}}`;
	let bFraction = (denominator2 === 1) ? numerator2.toString() : `\\frac{${numerator2}}{${denominator2}}`;
	let firstAnswer = (denominator1 === 1) ? numerator1 : numerator1 + '/' + denominator1;
	let secondAnswer = (denominator2 === 1) ? numerator2 : numerator2 + '/' + denominator2;
	let answer = firstAnswer + ',' + secondAnswer;

	NAtask.setTask({
		text: 'Найдите все значения $a$, при каждом из которых решения неравенства $' + leftExpr + '\\le' + rightExpr +
			'$ образуют отрезок длины 1.',
		answers: answer, // ответ в виде дроби или целого
		analys: '<b>Решение:</b>' + 
			'Построим схематично графики функций $f(x)=' + fFormula + `${c1 >= 0 ? '+' : '-'} ${Math.abs(c1)}` + '$ и $g(x)=' + gFormula + '$.' +
			'<br><br><div style="text-align: center;"><img src="' + imgSrc + '"></div>' +
			'На рисунке видно, что неравенство имеет решения только при ' +
			'$$\\frac{a}{' + k2 + '} \\le ' + left + ' \\text{ или } \\frac{a}{' + k2 + '} \\ge ' + right + '.$$' +

			'$$ 1. ' + '\\begin{cases} a \\le ' + k2 * left + ', \\\\ | ' + k2 + 'x - a| \\le ' + checkOne(rc) + 'x' + checkSign(R) + ' \\end{cases}' +
			'\\Leftrightarrow' +
			'\\begin{cases} a \\le ' + k2 * left + ', \\\\ ' + k2 + 'x - a \\le ' + checkOne(rc) + 'x' + checkSign(R) +
			', \\\\ ' + k2 + 'x - a \\ge ' + checkOne(-rc) + 'x' + checkSign(-R) + ' \\end{cases}' +
			'\\Leftrightarrow' +
			'\\begin{cases} a \\le ' + k2 * left + ', \\\\ x \\le ' + checkOneDenom('a' + checkSign(R), P) +
			', \\\\ x \\ge ' + checkOneDenom('a' + checkSign(-R), Q) + '. \\end{cases}' + '$$' +
			'Решения образуют отрезок длины 1, если ' +
			'$$ ' + checkOneDenom('a' + checkSign(R), P) + ' - \\left(' + checkOneDenom('a' + checkSign(-R), Q) + ' \\right) = 1 \\text{, откуда } a = ' + aFraction + '.$$' +

			'$$ 2. ' + '\\begin{cases} a \\ge ' + k2 * right + ', \\\\ | ' + k2 + 'x - a| \\le ' + checkOne(k1) + 'x' + checkSign(b1 + c1) + ' \\end{cases}' +
			'\\Leftrightarrow' +
			'\\begin{cases} a \\ge ' + k2 * right + ', \\\\ ' + k2 + 'x - a \\le ' + checkOne(k1) + 'x' + checkSign(b1 + c1) +
			', \\\\ ' + k2 + 'x - a \\ge ' + checkOne(-k1) + 'x' + checkSign(-(b1 + c1)) + ' \\end{cases}' +
			'\\Leftrightarrow' +
			'\\begin{cases} a \\ge ' + k2 * right + ', \\\\ x \\le ' + checkOneDenom('a' + checkSign(b1 + c1), Z) +
			', \\\\ x \\ge ' + checkOneDenom('a' + checkSign(-(b1 + c1)), N) + '. \\end{cases}' + '$$' +
			'Решения образуют отрезок длины 1, если ' +
			'$$ ' + checkOneDenom('a' + checkSign(b1 + c1), Z) + ' - \\left(' + checkOneDenom('a' + checkSign(-(b1 + c1)), N) + ' \\right) = 1 \\text{, откуда } a = ' + bFraction + '.$$',
		authors: ['Алендарь Сергей']
	});

	return true;
}, 100000);
//507589

(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '506380';
		let preference1 = ['quadratic', 'rational'];
		let preference2 = ['fractional', 'logarithmicMinus'];
		let preference3 = ['squareRational', 'exponential'];
		let rand1 = getSelectedPreferenceFromList(key, preference1);
		let rand2 = getSelectedPreferenceFromList(key, preference2);
		let rand3 = getSelectedPreferenceFromList(key, preference3);

		let a = sl(2, 5);
		let b = a + sl(1, 5);

		//квадратичные нер-ва
		let isQuadraticLess = sl1();
		let quadratic = {
			expr: `(x - ${a})(x - ${b}) ${isQuadraticLess ? '<' : '>'} 0`,
			solution: isQuadraticLess
				? `$${a} < x < ${b}$`
				: `$x < ${a} \\text{ или } x > ${b}$`
		};
		//дробные нер-ва
		let isFractionalLess = sl1();
		let fractional = {
			expr: `\\frac{x - ${a}}{x - ${b}} ${isFractionalLess ? '<' : '>'} 0`,
			solution: isFractionalLess
				? `$${a} < x < ${b}$`
				: `$x < ${a} \\text{ или } x > ${b}$`
		};
		//дробное с квадратом 
		let isSqRatGreater = sl1();
		let swapNumDen = sl1();
		let numPart = swapNumDen ? `(x - ${b})^2` : `x - ${a}`;
		let denPart = swapNumDen ? `x - ${a}` : `(x - ${b})^2`;
		let sqRatExpr = `\\frac{${numPart}}{${denPart}} ${isSqRatGreater ? '>' : '<'} 0`;
		let sqRatSolution = isSqRatGreater ? `$x > ${a}$` : `$x < ${a}$`;
		let squareRational = { expr: sqRatExpr, solution: sqRatSolution };
		//дробное рациональное второго типа
		let isRationalGreater = sl1();
		let rational = {
			expr: `\\frac{1}{(x - ${a})(x - ${b})} ${isRationalGreater ? '>' : '<'} 0`,
			solution: isRationalGreater
				? `$x < ${a} \\text{ или } x > ${b}$`
				: `$${a} < x < ${b}$`
		};
		//показательные нер-ва
		let expBase = sl(2, 3);
		let isExpGreater = sl1();
		let expSign = isExpGreater ? '>' : '<';
		let expValue = isExpGreater ? expBase.pow(a) : expBase.pow(b);
		let expExpr = `${expBase}^{x} ${expSign} ${expValue}`;
		let expSolution = isExpGreater ? `x > ${a}` : `x < ${b}`;
		let exponential = { expr: expExpr, solution: expSolution };
		//логарифмические нер-ва
		let logBase = sl1() ? a : b;
		let isLogGreater = sl1();
		let logExpr = isLogGreater ? `\\log_{${logBase}} x > 1` : `\\log_{${logBase}} x < 1`;
		let logSolution = isLogGreater ? `x > ${logBase}` : `x < ${logBase}`;
		let logarithmic = { expr: logExpr, solution: logSolution };
		//логарифмическое нер-во с минусом
		let logBaseMinus = b - a;
		let logExprMinus = `\\log_{${logBase}} (x - ${a}) < 1`;
		let logSolutionMinus = `$${a} < x < ${b}$`;
		let logarithmicMinus = { expr: logExprMinus, solution: logSolutionMinus };

		let all = [[quadratic, rational][rand1], [fractional, logarithmicMinus][rand2], [squareRational, exponential][rand3], logarithmic];

		//уникальные реш.
		let solutions = all.map(item => item.solution);
		let uniqueSolutions = new Set(solutions.map(s => s.replace(/\s/g, '')));
		genAssert(uniqueSolutions.size === 4, 'Дубликаты решений');

		NAtask.setCorrespondenceTask({
			text: 'Каждому из четырёх неравенств в левом столбце соответствует одно из решений в правом столбце. Установите соответствие между неравенствами и их решениями.',
			leftHeader: 'НЕРАВЕНСТВА',
			left: all,
			autoLaTeXLeft: true,
			rightHeader: 'РЕШЕНИЯ',
			right: solutions,
			autoLaTeXRight: true,
			postText: 'Напишите по порядку букв цифры каждого решения.',
			preference: [preference1, preference2, preference3],
		});

		NAtask.modifiers.allDecimalsToStandard();

	}, 20000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/test?likes=506380

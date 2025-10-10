(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '506380';
		let preference1 = ['quadratic', 'rational'];
		let preference2 = ['fractional', 'logarithmicMinus', 'powerFraction'];
		let preference3 = ['squareRational', 'exponential'];
		let rand1 = getSelectedPreferenceFromList(key, preference1);
		let rand2 = getSelectedPreferenceFromList(key, preference2);
		let rand3 = getSelectedPreferenceFromList(key, preference3);

		let a = sl(1, 5);
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
		let exponential;
		let doubleOrNothing = sl1();
		let isGreater = sl1();
		let value;
		if (doubleOrNothing == 0) {
			// Классическое показательное
			let base = sl(2, 3);
			value = isGreater ? base.pow(a) : base.pow(b);
			exponential = {
				expr: `${base}^{x} ${isGreater ? '>' : '<'} ${value}`,
				solution: isGreater ? `$x > ${a}$` : `$x < ${b}$`
			};
		} else {
			// Степенное с суммой
			let base = sl(2, 5);
			value = isGreater ? base.pow(b) : base.pow(a + b);
			genAssert(value < 10000, "value слишком больше число");
			if (isGreater) {
				exponential = {
					expr: `${base}^{-x + ${a + b}} > ${value}`,
					solution: `$x < ${a}$`
				};
			} else {
				exponential = {
					expr: `${base}^{-x + ${b}} > ${value}`,
					solution: `$x < ${b}$`
				};
			}
		}
		//показательные с дробью в правой части нер-ва
		let powerFraction;
		let valueFraction;
		let type = sl1();
		if (type === 0) {
			let base = sl(2, 5);
			let k = sl(2, 6);
			valueFraction = base.pow(k * a);
			genAssert(valueFraction < 10000, "valueFraction слишком больше число");
			powerFraction = {
				expr: `${base}^{-${k}x} > \\frac{1}{${valueFraction}}`,
				solution: `$x < ${a}$`
			};
		} else {
			// -x + c
			let base = sl(2, 5);
			valueFraction = base.pow(b - a);
			powerFraction = {
				expr: `${base}^{-x + ${b}} < \\frac{1}{${valueFraction}}`,
				solution: `$x > ${a}$`
			};
		}

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

		let all = [[quadratic, rational][rand1], [fractional, logarithmicMinus, powerFraction][rand2], [squareRational, exponential][rand3], logarithmic];
		//let all = [powerFraction, quadratic, logarithmicZero, fractional];
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

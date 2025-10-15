(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '506380';
		let preferenceLog = ['haveLog', 'noLog', 'randomLog'];
		let preferencePow = ['havePow', 'noPow', 'randomPow'];
		let preferenceLogType = ['logarithmic', 'logBaseMinus'];
		let preferencePowType = ['exponential', 'powerFraction'];
		let randLog = getSelectedPreferenceFromList(key, preferenceLog);
		let randPow = getSelectedPreferenceFromList(key, preferencePow);
		let randLogType = getSelectedPreferenceFromList(key, preferenceLogType);
		let randPowType = getSelectedPreferenceFromList(key, preferencePowType);

		let a = sl(1, 5);
		let b = a + sl(1, 5);

		//квадратичные нер-ва
		let isQuadraticLess = sl1();
		let holeQuad = sl(0, 2);
		let quadratic = {
			expr: [`(x - ${a})(x - ${b}) ${isQuadraticLess ? '<' : '>'} 0`,
			`(x - ${a})^2(x - ${b}) ${isQuadraticLess ? '<' : '>'} 0`,
			`(x - ${a})(x - ${b})^2 ${isQuadraticLess ? '<' : '>'} 0`][holeQuad],
			solution: [
				[`$${a} < x < ${b}$`, `$x < ${a}$ $\\text{ или }$ $x > ${b}$`][isQuadraticLess],
				[`$x > ${b}$`, `$x < ${a}$ $\\text{ или }$ $${a} < x < ${b}$`][isQuadraticLess],
				[`$${a} < x < ${b}$ $\\text{ или }$ $x > ${b}$`, `$x < ${a}$`][isQuadraticLess]
			][holeQuad]
		};
		//дробные нер-ва
		let isFractionalLess = sl1();
		let holeFrac = sl(0, 2);
		let fractional = {
			expr: [`\\frac{x - ${a}}{x - ${b}} ${isFractionalLess ? '<' : '>'} 0`,
			`\\frac{x - ${a}}{(x - ${a})(x - ${b})} ${isFractionalLess ? '<' : '>'} 0`,
			`\\frac{x - ${b}}{(x - ${a})(x - ${b})} ${isFractionalLess ? '<' : '>'} 0`][holeFrac],
			solution: [
				[`$${a} < x < ${b}$`, `$x < ${a}$ $\\text{ или }$ $x > ${b}$`][isFractionalLess], //обычный
				[`$x > ${b}$`, `$x < ${a}$ $\\text{ или }$ $${a} < x < ${b}$`][isFractionalLess], //дырка в a
				[`$${a} < x < ${b}$ $\\text{ или }$ $x > ${b}$`, `$x < ${a}$`][isFractionalLess] //дырка в b
			][holeFrac]
		};
		//дробное с квадратом 
		let isSqRatGreater = sl1();
		let swapNumDen = sl(0, 3);
		let numPart = [`(x - ${b})^2`, `(x - ${b})`, `x - ${a}`, `(x - ${a})^2`][swapNumDen];
		let denPart = [`x - ${a}`, `(x - ${a})^2`, `(x - ${b})^2`, `(x - ${b})`][swapNumDen];;
		let sqRatExpr = `\\frac{${numPart}}{${denPart}} ${isSqRatGreater ? '>' : '<'} 0`;
		let sqRatSolution = [
			[`$x < ${a}$`, `$x < ${a}$ $\\text{ или }$ $${a} < x < ${b}$`, `$x < ${a}$`, `$x < ${a}$ $\\text{ или }$ $${a} < x < ${b}$`][swapNumDen],
			[`$${a} < x < ${b}$ $\\text{ или }$ $x > ${b}$`, `$x > ${b}$`, `$${a} < x < ${b}$ $\\text{ или }$ $x > ${b}$`, `$x > ${b}$`][swapNumDen]
		][isSqRatGreater]
		let squareRational = { expr: sqRatExpr, solution: sqRatSolution };
		//дробное рациональное второго типа
		let isRationalGreater = sl1();
		let rational = {
			expr: `\\frac{1}{(x - ${a})(x - ${b})} ${isRationalGreater ? '>' : '<'} 0`,
			solution: isRationalGreater
				? `$x < ${a}$ $\\text{ или }$ $x > ${b}$`
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
			let c = sl1() ? a : b;
			value = base.pow(c);
			exponential = {
				expr: `${base}^{x} ${isGreater ? '>' : '<'} ${value}`,
				solution: isGreater ? `$x > ${c}$` : `$x < ${c}$`
			};
		} else {
			// Степенное с суммой
			let base = sl(2, 5);
			let c = sl1() ? b : (a + b);
			value = base.pow(c);
			genAssert(value < 10000, 'value слишком большое число');
			if (isGreater) {
				exponential = {
					expr: `${base}^{-x + ${c}} > ${value}`,
					solution: `$x < ${a}$`
				};
			} else {
				exponential = {
					expr: `${base}^{-x + ${c}} > ${value}`,
					solution: `$x < ${b}$`
				};
			}
		}
		//показательные с дробью в правой части нер-ва
		let powerFraction;
		let valueFraction;
		let type = sl1();
		if (!type) {
			let base = sl(2, 5);
			let k = sl(2, 6);
			valueFraction = base.pow(k * a);
			let fracStr = (1).texrndfrac(valueFraction);
			genAssert(valueFraction < 1000, 'valueFraction слишком большое число');
			powerFraction = {
				expr: `${base}^{-${k}x} > ${fracStr}`,
				solution: `$x < ${a}$`
			};
		} else {
			// -x + c
			let base = sl(2, 5);
			valueFraction = base.pow(b - a);
			powerFraction = {
				expr: `${base}^{-x + ${b}} < ${fracStr}`,
				solution: `$x > ${a}$`
			};
		}

		//логарифмические нер-ва
		let logarithmic;
		let logBase = sl1() ? a : b;
		if (a === 1) {
			//логарифм сравнивается с 0
			let baseZero = sl(2, 5);
			let isLogZero = sl1();
			logarithmic = {
				expr: `\\log_{${baseZero}} x ${isLogZero ? '>' : '<'} 0`,
				solution: isLogZero ? `$x > 1$` : `$x < 1$`
			};
		} else {
			// Обычный логарифм: log_base(x) > 1
			let isLogGreater = sl1();
			logarithmic = {
				expr: `\\log_{${logBase}} x ${isLogGreater ? '>' : '<'} 1`,
				solution: isLogGreater ? `$x > ${logBase}$` : `$x < ${logBase}$`
			};
		}
		//логарифмическое нер-во с минусом
		let logBaseMinus = b - a;
		genAssert(logBaseMinus != 1, 'основание логарифма не должно быть единицей');
		let logExprMinus = `\\log_{${logBaseMinus}} (x - ${a}) < 1`;
		let logSolutionMinus = `$${a} < x < ${b}$`;
		let logarithmicMinus = { expr: logExprMinus, solution: logSolutionMinus };

		let logTask = [logarithmic, logarithmicMinus][randLogType];
		let powTask = [exponential, powerFraction][randPowType];
		let allLogPow = [];
		if (randLog === 0 || randLog === 2 && sl1()) {
			allLogPow.push(logTask);
		}
		if (randPow === 0 || randPow === 2 && sl1()) {
			allLogPow.push(powTask);
		}
		let allRest = [fractional, quadratic, rational, squareRational].iz(4 - allLogPow.length);
		let all = [].concat(allRest).concat(allLogPow);

		//уникальные реш.
		let solutions = all.slice().map(item => item.solution);
		genAssert(!solutions.hasDubl(), 'Дубликаты решений');

		NAtask.setCorrespondenceTask({
			text: 'Каждому из четырёх неравенств в левом столбце соответствует одно из решений в правом столбце. Установите соответствие между неравенствами и их решениями.',
			leftHeader: 'НЕРАВЕНСТВА',
			left: all,
			autoLaTeXLeft: true,
			rightHeader: 'РЕШЕНИЯ',
			right: solutions,
			autoLaTeXRight: true,
			postText: 'Напишите по порядку букв цифры каждого решения.',
			preference: [preferenceLog, preferencePow],
		});

		NAtask.modifiers.allDecimalsToStandard();

	}, 20000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/test?likes=506380

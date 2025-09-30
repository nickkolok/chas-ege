function setCorrespondenceTask({ left, right, text, leftHeader, rightHeader, postText, autoLaTeXLeft, autoLaTeXRight }) {

	left.sort(() => Math.random() - 0.5);
	let shuffledSolutions = [...right].sort(() => Math.random() - 0.5);
	let leftCol = '';
	for (let i = 0; i < left.length; i++) {
		let letter = String.fromCharCode(65 + i);
		let the$ = '$'.esli(autoLaTeXLeft && (left[i].expr.search('\\$') === -1));
		leftCol += letter + ') ' + the$ + left[i].expr + the$ + '<br>';
	}
	let rightCol = '';
	let solutionToIndex = {};
	for (let i = 0; i < shuffledSolutions.length; i++) {
		let num = i + 1;
		let the$ = '$'.esli(autoLaTeXRight && (shuffledSolutions[i].search('\\$') === -1));
		rightCol += num + ') ' + the$ + shuffledSolutions[i] + the$ + '<br>';
		solutionToIndex[shuffledSolutions[i]] = num;
	}
	let answerSequence = left.map(item => solutionToIndex[item.solution]);

	NAtask.setTask({
		text: text + '<br><br>' +
			'<table style="border-collapse: collapse; width: 100%;"><tr>' +
			'<td style="vertical-align: top; padding-right: 20px;"><strong>' + leftHeader + '</strong><br>' + leftCol + '</td>' +
			'<td style="vertical-align: top;"><strong>' + rightHeader + '</strong><br>' + rightCol + '</td>' +
			'</tr></table><br>' +
			'<span style="font-family: monospace; font-size: 18px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><br>' +
			postText,
		answers: answerSequence.join(' '),
	});
}
(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(2, 5);
		let b = a + sl(1, 5);

		//квадратичные нер-ва
		let quadratic = {
			expr: `(x - ${a})(x - ${b}) ${sl1() ? '<' : '>'} 0`,
			solution: sl1() ? `${a} < x < ${b}` : `x < ${a} \\text{ или } x > ${b}`
		};
		//дробные нер-ва
		let rational = {
			expr: `\\frac{x - ${a}}{x - ${b}} ${sl1() ? '<' : '>'} 0`,
			solution: sl1() ? `${a} < x < ${b}` : `x < ${a} \\text{ или } x > ${b}`
		};
		//показательные нер-ва
		let expBase = sl(2, 3);
		let isExpGreater = sl1();
		let expExpr = isExpGreater ? `${expBase}^{x} > ${expBase.pow(a)}` : `${expBase}^{x} < ${expBase.pow(b)}`;
		let expSolution = isExpGreater ? `x > ${a}` : `x < ${b}`;
		let exponential = { expr: expExpr, solution: expSolution };
		//логарифмические нер-ва
		let logBase = sl1() ? a : b;
		let isLogGreater = sl1();
		let logExpr = isLogGreater ? `\\log_{${logBase}} x > 1` : `\\log_{${logBase}} x < 1`;
		let logSolution = isLogGreater ? `x > ${logBase}` : `x < ${logBase}`;
		let logarithmic = { expr: logExpr, solution: logSolution };

		let all = [quadratic, rational, exponential, logarithmic];

		//уникальные реш.
		let solutions = all.map(item => item.solution);
		let uniqueSolutions = new Set(solutions.map(s => s.replace(/\s/g, '')));
		genAssert(uniqueSolutions.size === 4, 'Дубликаты решений');

		setCorrespondenceTask({
			text: 'Каждому из четырёх неравенств в левом столбце соответствует одно из решений в правом столбце. Установите соответствие между неравенствами и их решениями.',
			leftHeader: 'НЕРАВЕНСТВА',
			left: all,
			autoLaTeXLeft: true,
			rightHeader: 'РЕШЕНИЯ',
			right: solutions,
			autoLaTeXRight: true,
			postText: 'Напишите по порядку букв цифры каждого решения.'
		});



		NAtask.modifiers.allDecimalsToStandard();

	}, 20000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/test?likes=506380

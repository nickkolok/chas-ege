function base18({ left, right }) {
	left.sort(() => Math.random() - 0.5);
	let shuffledSolutions = [...right].sort(() => Math.random() - 0.5);

	let leftCol = '';
	for (let i = 0; i < 4; i++) {
		let letter = String.fromCharCode(65 + i);
		leftCol += letter + ') ' + '$' + left[i].expr + '$<br>';
	}
	let rightCol = '';
	let solutionToIndex = {};
	for (let i = 0; i < 4; i++) {
		let num = i + 1;
		rightCol += num + ') ' + shuffledSolutions[i] + '<br>';
		solutionToIndex[shuffledSolutions[i]] = num;
	}

	let answerSequence = left.map(item => solutionToIndex[item.solution]);

	NAtask.setTask({
		text: 'Каждому из четырёх неравенств в левом столбце соответствует одно из решений в правом столбце. Установите соответствие между неравенствами и их решениями.<br><br>' +
			'<table style="border-collapse: collapse; width: 100%;"><tr>' +
			'<td style="vertical-align: top; padding-right: 20px;"><strong>НЕРАВЕНСТВА</strong><br>' + leftCol + '</td>' +
			'<td style="vertical-align: top;"><strong>РЕШЕНИЯ</strong><br>' + rightCol + '</td>' +
			'</tr></table><br>' +
			'<span style="font-family: monospace; font-size: 18px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><br>' +
			'Напишите по порядку букв цифры каждого решения.',
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
			solution: sl1() ? `$${a} < x < ${b}$` : `$x < ${a} \\text{ или } x > ${b}$`
		};
		//дробные нер-ва
		let rational = {
			expr: `\\frac{x - ${a}}{x - ${b}} ${sl1() ? '<' : '>'} 0`,
			solution: sl1() ? `$${a} < x < ${b}$` : `$x < ${a} \\text{ или } x > ${b}$`
		};
		//показетльные нер-ва
		let expBase = sl(2, 3);
		let isExpGreater = sl1();
		let expExpr = isExpGreater ? `${expBase}^{x} > ${expBase.pow(a)}` : `${expBase}^{x} < ${expBase.pow(b)}`;
		let expSolution = isExpGreater ? `$x > ${a}$` : `$x < ${b}$`;
		let exponential = { expr: expExpr, solution: expSolution };
		//логарифмические нер-ва
		let logBase = sl1() ? a : b;
		let isLogGreater = sl1();
		let logExpr = isLogGreater ? `\\log_{${logBase}} x > 1` : `\\log_{${logBase}} x < 1`;
		let logSolution = isLogGreater ? `$x > ${logBase}$` : `$x < ${logBase}$`;
		let logarithmic = { expr: logExpr, solution: logSolution };

		let all = [quadratic, rational, exponential, logarithmic];

		//уникальные реш.
		let solutions = all.map(item => item.solution);
		let uniqueSolutions = new Set(solutions.map(s => s.replace(/\s/g, '')));
		genAssert(uniqueSolutions.size === 4, 'Дубликаты решений');

		base18({ left: all, right: solutions });

		NAtask.modifiers.allDecimalsToStandard();

	}, 20000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/test?likes=506380

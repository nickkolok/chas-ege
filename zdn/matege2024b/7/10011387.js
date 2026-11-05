(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	let boundary = sl(1, 9);
	let shift = sl(1, 9).pm();
	let radicands = [`x-${boundary}`, `${boundary}-x`, `x+${boundary}`, 'x'];
	let domains = [`[${boundary};+\\infty)`, `(-\\infty;${boundary}]`, `[-${boundary};+\\infty)`, '[0;+\\infty)'];
	NAtask.setCorrespondenceTask({
		text: 'Каждой из четырёх функций в левом столбце соответствует область её определения в правом столбце. Установите соответствие между функциями и их областями определения.',
		leftHeader: 'ФУНКЦИИ',
		left: radicands.map((radicand, i) => ({
			expr: `f(x)=\\sqrt{${radicand}}${shift > 0 ? '+' : ''}${shift}`,
			solution: domains[i],
		})),
		rightHeader: 'ОБЛАСТИ ОПРЕДЕЛЕНИЯ',
		right: domains,
		autoLaTeXLeft: true,
		autoLaTeXRight: true,
		postText: 'Запишите номера областей определения в порядке, в котором перечислены функции.',
	});
})();
// ФИПИ 7.1: 98C2FB
// ФИПИ 7.2: 8B7E4D

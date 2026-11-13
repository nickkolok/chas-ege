(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	let shortRatio = sl(1, 9);
	let longRatio = sl(shortRatio + 1, 15);
	let factor = sl(2, 12);
	let sine = [0.5, 0.6, 0.8].iz();
	let shortSide = shortRatio * factor;
	let longSide = longRatio * factor;
	let givenHeight = (longSide * sine).okrugldo(0.1);
	let answer = (shortSide * sine).okrugldo(0.1);
	NAtask.setTask({
		text: 'Стороны параллелограмма равны $' + shortSide + '$ и $' + longSide +
			'$. Высота, опущенная на меньшую сторону, равна $' + givenHeight.ts() +
			'$. Найдите высоту, опущенную на большую сторону параллелограмма.',
		answers: answer,
		analys: 'Площадь параллелограмма не зависит от того, какую сторону взять за основание. ' +
			'Следовательно, $' + shortSide + '\\cdot' + givenHeight.ts() + '=' + longSide + 'h$, откуда $h=' + answer.ts() + '$.',
	});
})();
// E67C49, B8C3FC, 58F6FB, 079608, 9CA20C, 57B077, BA10B7, C29B16, 34571D, BF74DB, 3FA554, 1CD960, 2B936C, 580773, 111674, 950310, 5202A6, 44C79D, A7EA53, A66E22

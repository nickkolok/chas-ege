(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let the_orderToFind = decor.orderToFind.iz();

		let a = sl(2, 50);
		let b = slKrome([a], 2, 50);
		let c = slKrome([a, b], 2, 50, 0.5);

		let V = a * b * c;

		NAtask.setTask({

			text: 'Объём прямоугольного параллелепипеда вычисляется по формуле $V = abc$, где $a$, $b$ и $c$ – длины трёх его рёбер, ' +
				'выходящих из одной вершины. Пользуясь этой формулой, ' + the_orderToFind + ' $a$, если $V = ' + V + '$, $b = ' + b + '$ и $c = ' + c + '$.',
			answers: a,

		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//РешуЕГЭ (база) 2573 

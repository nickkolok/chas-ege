(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let the_orderToFind = decor.orderToFind.iz();

		let n = sl(4, 50);
		let E = n - 2;
		let word = ['определяется', 'находится', 'вычисляется', 'может быть вычислена', 'может быть определена', 'может быть найдена',
			'можно отыскать', 'можно найти', 'можно определить'].iz();

		NAtask.setTask({

			text: 'Сумма углов выпуклого многоугольника ' + word + ' по формуле $\\sum =' + ['(n-2)', '\\pi'].shuffleJoin() + '$, где $n$ – количество его углов. ' +
				'Пользуясь этой формулой, ' +
				the_orderToFind + ' $n$, если $\\sum = ' + [E, '\\pi'].shuffleJoin() + '$.',
			answers: n,

		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/test?likes=512412

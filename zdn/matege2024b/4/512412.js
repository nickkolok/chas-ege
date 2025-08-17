(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let the_orderToFind = decor.orderToFind.iz();

		let randWord = sl(0, 8);

		let n = sl(4, 50);
		let E = n - 2;
		let preword = ['', '', '', 'может быть ', 'может быть ', 'может быть ', 'можно ', 'можно ', 'можно '][randWord];
		let word = ['определяется', 'находится', 'вычисляется', 'вычислена', 'определена', 'найдена', 'отыскать', 'найти', 'определить'][randWord];


		NAtask.setTask({

			text: 'Сумма углов выпуклого многоугольника ' + preword + word + ' по формуле $\\sum =' + ['(n-2)\\pi', '\\pi(n-2)'].iz() + '$, где $n$ – количество его углов. ' +
				'Пользуясь этой формулой, ' +
				the_orderToFind + ' $n$, если $\\sum = ' + [E + '\\pi', '\\pi' + E].iz() + '$.',
			answers: n,

		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/test?likes=512412

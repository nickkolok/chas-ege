(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '5039';
		let preference = ['findH', 'findA', 'findB', 'findN'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let the_orderToFind = decor.orderToFind.iz();

		let n = sl(3, 15);
		let a = sl(10, 50);
		let b = sl(200, 400, 10);
		let h = (a + b) * n + a;

		genAssertAlmostInteger(h, 'Высота стеллажа должна быть целым числом');


		let descriptions = [
			'$h$ — высота стеллажа (в мм)',
			'$a$ — толщина одной доски (в мм)',
			'$b$ — высота одной полки (в мм)',
			'$n$ — число таких полок'
		];

		let givenParts = [
			'$h = ' + h + '$ мм',
			'$a = ' + a + '$ мм',
			'$b = ' + b + '$ мм',
			'$n = ' + n + '$',
		];
		givenParts.splice(rand, 1);
		givenParts = givenParts.shuffleJoin(', ');

		let unknown = [
			'высоту стеллажа $h$',
			'толщину одной доски $a$',
			'высоту одной полки $b$',
			'число полок $n$'
		][rand];

		let lastPhrase = rand !== 3 ? ' Ответ выразите в миллиметрах.' : '';

		NAtask.setTask({

			text: 'Высота деревянного стеллажа для книг равна $h = (a + b) \\cdot n + a$ миллиметров, где ' +
				descriptions.shuffleJoin(', ') + '. ' +
				'Пользуясь этой формулой, ' + the_orderToFind + ' ' + unknown + ', если ' + givenParts + '. ' + lastPhrase,
			answers: [h, a, b, n][rand],
			preference: preference,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://self-edu.ru/ege2019_base_30.php?id=27_4

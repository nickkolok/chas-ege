(function() {
	retryWhileError(function() {
		'use strict';

		let a = sluchch(2, 10);
		let b = sluchch(2, 4);
		let n = sluchch(10, 24);
		let l1 = sl1();
		let l2 = (l1 + 1) % 2;
		let n2 = n - sluchch(5, 7);
		let arr = ['Лена', 'Ира', 'Настя', 'Маша', 'Катя', 'Вера', 'Саша', 'Оля', 'Даша', 'Тоня', 'Аня', 'Ира', 'Женя'].iz();
		let arr2 = ['открытка', 'валентинка', 'приглашение', 'распоряжение', 'письмо', 'поздравление', 'ценник', 'книга',
			'документ'
		].iz();
		let arr3 = ['за первый день ' + arr + ' подписала ' + chislitlx(a, 'открытка', 'v'),
			'вся работа была выполнена за ' + chislitlx(n, 'день')
		];

		let progression = new ArithmeticProgression(a, b);

		NAtask.setTask({
			text: sklonlxkand(arr).de + ' надо подписать ' + chislitlx(progression.sum(n), arr2, 'v') +
				'. Ежедневно она подписывает на одно и то же количество открыток больше по сравнению с предыдущим днем. ' +
				'Известно, что ' + arr3[l1] + '. ' +
				'Определите, сколько открыток было подписано за ' + om.porchisl[n2].i[0] +
				' день, если ' + arr3[l2] +
				'.',

			answers: progression.member(n2),

		});
	}, 10000);
})();
//99585

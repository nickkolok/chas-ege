(function() {
	retryWhileError(function() {
		'use strict';

		let a = sluchch(2, 10);
		let b = sluchch(2, 4);
		let n = sluchch(10, 24);
		let n2 = n - sluchch(5, 7);
		var arr = ['Лена', 'Ира', 'Настя', 'Маша', 'Катя', 'Вера', 'Саша', 'Оля', 'Даша', 'Тоня', 'Аня', 'Ира', 'Женя'].iz();

		let progression = new ArithmeticProgression(a, b);

		function summa(n) {
			return progression.sum(n);
		}

		NAtask.setTask({
			text: sklonlxkand(arr).de + ' надо подписать ' + chislitlx(summa(n), 'открытка', 'v') +
				'. Ежедневно она подписывает на одно и то же количество открыток больше по сравнению с предыдущим днем. ' +
				'Известно, что за первый день ' + arr + ' подписала ' + chislitlx(a, 'открытка', 'v') + '. ' +
				'Определите, сколько открыток было подписано за ' + om.porchisl[n2].i[0] +
				' день, если вся работа была выполнена за ' + chislitlx(n, 'день') +
				'.',

			answers: progression.member(n2),

		});
	}, 10000);
})();
//Сергей Алендарь

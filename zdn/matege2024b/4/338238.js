(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '338238';
		let preference = ['findS', 'findD1'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let the_orderToFind = decor.orderToFind.iz();

		let d_2 = sl(10, 25);
		let d_1 = sl(3, d_2 - 2);
		let deNum = sl(3, 15);
		let num = (1, deNum - 1);
		let S = 0.5 * d_2 * d_1 * (num / deNum);

		genAssertZ1000(S, 'не более 3-х знаков после запятой');


		NAtask.setTask({

			text: 'Площадь четырёхугольника можно вычислить по формуле $S = \\frac{1}{2}d_1d_2 \\sin{\\alpha}$, где $d_1$ и $d_2$ – длины диагоналей четырёхугольника, ' +
				'$\\alpha$ – угол между диагоналями. ' +
				'Пользуясь этой формулой, ' + the_orderToFind + ' ' + ['площадь $S$', 'длину диагонали $d_1$'][rand] + ', если $d_2 = ' + d_2 + '$' +
				', $\\sin{\\alpha}= \\frac{' + num + '}{' + deNum + '}$, ' +
				'а ' + ['$d_1 =' + d_1 + '$', '$S =' + S + '$'][rand] + '.',
			answers: [S, d_1][rand],
			preference: preference,



		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://oge.sdamgia.ru/test?likes=338238


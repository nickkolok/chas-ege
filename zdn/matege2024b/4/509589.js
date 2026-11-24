(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let the_orderToFind = decor.orderToFind.iz();

		let d = sl(1, 20);
		let deNumA = sl(3, 30);
		let numA = sl(1, deNumA - 1);
		let S = (d ** 2 * (numA / deNumA)) / 2;

		genAssertZ1000(S, 'должно быть не более 3 знака после запятой');

		NAtask.setTask({

			text: ' Площадь прямоугольника можно вычислить по формуле $S = \\frac{d^2 \\cdot \\sin{\\alpha}}{2}$,' +
				'где $d$ – длина диагонали, $\\alpha$ – угол между диагоналями. ' +
				'Пользуясь этой формулой, ' + the_orderToFind + ' площадь $S$, если $d = ' + d + '$ и $\\sin{\\alpha} = \\frac{' + numA + '}{' + deNumA + '}$.',
			answers: S,

		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/problem?id=509589

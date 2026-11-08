(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);


		let l = sl(2, 20);
		let T = 2 * l;

		let the_orderToFind = decor.orderToFind.iz();

		NAtask.setTask({
			text:
				'Период колебания математического маятника $T$ (в секундах) приближенно можно вычислить по формуле $T =2\\sqrt{l}$,' +
				' где $l$ – длина нити (в метрах). Пользуясь этой формулой, ' + the_orderToFind +
				' длину нити маятника (в метрах), период колебаний которого составляет ' + chislitlx(T, 'секунда', 'v$') + '.',
			answers: l ** 2,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://oge.sdamgia.ru/test?likes=46

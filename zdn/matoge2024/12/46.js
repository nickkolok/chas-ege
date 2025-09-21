(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);


		let l = [4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400].iz();
		let T = 2 * l.sqrt();

		let the_orderToFind = decor.orderToFind.iz();

		NAtask.setTask({
			text:
				'Период колебания математического маятника $T$(в секундах) приближенно можно вычислить по формуле $T =2\\sqrt{l}$,' +
				' где $l$ – длина нити(в метрах).Пользуясь этой формулой, ' + the_orderToFind +
				' длину нити маятника(в метрах), период колебаний которого составляет ' + T + ' секунд.',
			answers: l,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://oge.sdamgia.ru/test?likes=46

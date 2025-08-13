(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let the_orderToFind = decor.orderToFind.iz();

		let m = sl(1, 20, 0.1);
		let h = slKrome([m], 1, 20, 0.1);
		let g = 9.8;
		let E = m * h * g;

		NAtask.setTask({

			text: 'Потенциальная энергия тела (в джоулях) в поле тяготения Земли вблизи её поверхности вычисляется по формуле $E = mgh$,' +
				' где $m$ – масса тела (в килограммах), $g$ – ускорение свободного падения(в $м/с^2$), а $h$ – высота (в метрах),' +
				' на которой находится это тело относительно поверхности. ' +
				'Пользуясь этой формулой, ' + the_orderToFind + ' $m$ (в килограммах), если $g = 9{,}8$ $м/с^2$, $h = ' + h + '$ $м$,а $E = ' + E + '$ $Дж$.',
			answers: m,

		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/test?likes=506737

(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let rand = sl(0, 8);
		let the_orderToFind = decor.orderToFind.iz();
		let planet = sklonlxkand(['Меркурий', 'Венера', 'Земля', 'Луна', 'Марс', 'Юпитер', 'Сатурн', 'Уран', 'Нептун'][rand]);

		let m = sl(1, 20, 0.1);
		let h = slKrome([m], 1, 20, 0.1);
		let g = [3.7, 8.9, 9.8, 1.6, 3.9, 23.9, 10.4, 8.9, 11][rand];
		let E = m * h * g;

		NAtask.setTask({

			text: 'Потенциальная энергия тела (в джоулях) в поле тяготения ' + planet.re + ' вблизи ' + ['его', 'её'][planet.rod] + ' поверхности вычисляется по формуле $E = mgh$,' +
				' где $m$ – масса тела (в килограммах), $g$ – ускорение свободного падения (в $\\mbox{м/с}^2$), а $h$ – высота (в метрах),' +
				' на которой находится это тело относительно поверхности. ' +
				'Пользуясь этой формулой, ' + the_orderToFind + ' $m$ (в килограммах), если $g = ' + g + '$ $\\mbox{м/с}^2$, $h = ' + h + '$ м, а $E = ' + E + '$ Дж.',
			answers: m,

		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/test?likes=506737

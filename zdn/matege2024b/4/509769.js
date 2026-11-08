(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '509769';
		let preference1 = ['lessWords', 'moreWords'];
		let preference2 = ['findV', 'findM', 'findE'];
		let rand = getSelectedPreferenceFromList(key, preference1);
		let rand2 = getSelectedPreferenceFromList(key, preference2);

		let the_orderToFind = decor.orderToFind.iz();

		let v = sl(2, 15);
		let m = sl(2, 15);
		let speed = sl(6, 34);
		let mass = sl(700, 3000, 5);

		let E = (m * v ** 2) / 2;
		let energy = (mass * speed ** 2) / 2;

		NAtask.setTask({

			text: 'Кинетическая энергия тела ' + ['(в джоулях)', 'массой $m$ кг двигающегося со скоростью $v$ м/с,'][rand] +
				' вычисляется по формуле $E =\\frac{mv^2}{2}$' + [', где ', ' и измеряется в джоулях (Дж).'][rand] +
				['$m$ – масса тела (в килограммах), а $v$ – его скорость (в м/с). Пользуясь этой формулой, ',
					' Известно, что автомобиль обладает ' +
					['массой $' + mass + '$ кг и кинетической энергией ' + chislitlx(energy, 'джоуль', '$'),
					'кинетической энергией ' + chislitlx(energy, 'джоуль', '$') + ' и скоростью $' + speed + '$ м/с',
					'массой $' + mass + '$ кг и скоростью $' + speed + '$ м/с'][rand2] + '.'
				][rand] +
				[the_orderToFind, ' ' + the_orderToFind.toZagl()][rand] + ' ' + [['$v$ (в м/с)', '$m$ (в кг)', '$E$ (в джоулях)'][rand2] + ', если ' +
					['$E = ' + E + '$ Дж и $m = ' + m + '$ кг', '$E = ' + E + '$ Дж и $v = ' + v + '$ м/с', '$v = ' + v + '$ м/с и $m = ' + m + '$ кг'][rand2],
				['скорость', 'массу', 'кинетическую энергию '][rand2] + ' этого автомобиля в ' + ['метрах в секунду', 'кг', 'джоулях'][rand2]][rand] + '.',
			answers: [[v, m, E][rand2], [speed, mass, energy][rand2]][rand],
			preference: [preference1, preference2],

		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/problem?id=509769

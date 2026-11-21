(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);
		let key = '512176';
		let preference = ['findM', 'findF', 'findA'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let the_orderToFind = decor.orderToFind.iz();

		let a = sl(1, 50);
		let m = slKrome([a], 1, 50);
		let F = a * m;

		NAtask.setTask({

			text: 'Второй закон Ньютона можно записать в виде $F = ma$, где $F$ – сила (в ньютонах), действующая на тело, ' +
				'$m$ – его масса (в килограммах), $a$ – ускорение(в м/с$^2$), с которым движется тело. ' +
				the_orderToFind.toZagl() + ' ' + ['$m$ (в килограммах)', '$F$ (в ньютонах)', '$a$ (в м/с$^2$)'][rand] +
				', если ' + ['$F = ' + F + '$ Н и $a = ' + a + '$ м/с$^2$.', '$m = ' + m + '$ кг и $a = ' + a + '$ м/с$^2$.', '$F = ' + F + '$ Н и $m = ' + m + '$ кг.'][rand],
			answers: [m, F, a][rand],
			preference: preference,


		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/test?likes=512176

(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '459972';
		let preference = ['findF', 'findV'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let the_orderToFind = decor.orderToFind.iz();
		let thing = ['объект', 'предмет'].iz();

		let V = sl(0.1, 0.9, 0.05);
		let F = V * 1000 * 9.8;

		NAtask.setTask({
			text:
				'Сила Архимеда, ' + 'выталкивающая на поверхность погружённый в воду ' + thing + ', ' +
				'вычисляется по формуле $F =\\rho gV$, где $\\rho=1000$ кг/м$^3$ – плотность воды, $g=9{,}8$ м/с$^2$ – ускорение свободного падения, ' +
				'а $V$ – объём ' + thing + 'а в кубических метрах. ' +
				'Сила $F$ измеряется в ньютонах. ' + the_orderToFind.toZagl() + ' ' + ['силу Архимеда', 'объём ' + thing + 'a'][rand] + ', ' + ['', 'если сила Архимеда '][rand] +
				'действу' + ['ющую', 'ет'][rand] + ' на ' + ['погружённый в воду ' + thing, 'него'][rand] + ' ' +
				['объёмом $' + V + '$ куб. м', 'с силой $' + F + '$ Н'][rand] + '.' +
				' Ответ дайте в ' + ['ньютонах', 'куб. м'][rand] + '.',
			answers: [F, V][rand],
			preference: preference,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://math-oge.sdamgia.ru/problem?id=459972

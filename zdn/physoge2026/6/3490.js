(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		// Плотности веществ:
		// - Керосин: 800 кг/м³ = 0.8 кг/л
		// - Машинное масло: 900 кг/м³ = 0.9 кг/л
		// Ответ должен быть целым числом литров
		
		let preference = ['керосин', 'машинное масло'].iz();
		let density, substanceName, declensionFunc;
		
		if (preference === 'керосин') {
			density = 0.8;
			substanceName = 'керосина';
			declensionFunc = function(n) { return 'кг'; };
		} else {
			density = 0.9;
			substanceName = 'машинного масла';
			declensionFunc = function(n) { return 'кг'; };
		}
		
		let V = sl(50, 150, 10); // объём в литрах
		let m = V * density; // масса вещества в кг
		
		genAssert(m.isAlmostInteger(), "масса должна быть целым числом");

		let vessel = [
			{full: 'Топливный бак трактора', noun: 'бак'},
			{full: 'Канистра', noun: 'канистра'},
		].iz();
		let vesselRe = sklonlxkand(vessel.noun).re;
		
		NAtask.setTask({
			text: vessel.full + ' вмещает ' + m + ' ' + substanceName + '. ' +
				'Чему равна ёмкость ' + vesselRe + '? Ответ запишите в литрах.',
			answers: V,
			analys: 'Для решения задачи используем формулу связи массы и объёма через плотность: ' +
				'$V = \\frac{m}{\\rho}$. ' +
				'Плотность ' + substanceName + ' составляет $\\rho = ' + (density * 1000) + '$ кг/м$^3 = ' + density + '$ кг/л. ' +
				'Тогда объём ' + vesselRe + ': ' +
				'$$V = \\frac{' + m + '}{' + density + '} = ' + V + ' \\text{ л}.$$ ' +
				'Таким образом, ёмкость ' + vesselRe + ' составляет $' + V + '$ литров.',
		});
	}, 1000);
})();
// https://phys-oge.sdamgia.ru/problem?id=24872
//zer00player
// ФИПИ A93201 DC23AC

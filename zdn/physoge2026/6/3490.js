(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		// Плотности веществ:
		// - Керосин: 800 кг/м³ = 0.8 кг/л
		// - Машинное масло: 900 кг/м³ = 0.9 кг/л
		// Ответ должен быть целым числом литров
		
		let substance = ['керосин', 'машинное масло'].iz();
		let density, substanceName;
		
		density = (substance === 'керосин') ? 0.8 : 0.9;
		substanceName = sklonlxkand(substance).re;
		
		// Ёмкость, л: бак трактора — десятки и сотни литров, канистра — до 40 л (DC23AC: 40 л)
		let vessel = [
			{full: 'Топливный бак трактора', noun: 'бак', V: [50, 150]},
			{full: 'Канистра', noun: 'канистра', V: [10, 40]},
		].iz();
		let V = sl(vessel.V[0], vessel.V[1], 10); // объём в литрах
		let m = V * density; // масса вещества в кг
		
		genAssert(m.isAlmostInteger(), "масса должна быть целым числом");

		let vesselRe = sklonlxkand(vessel.noun).re;
		
		NAtask.setTask({
			text: vessel.full + ' вмещает ' + m.ts() + ' кг ' + substanceName + '. ' +
				'Чему равна ёмкость ' + vesselRe + '? Ответ запишите в литрах.',
			answers: V,
			analys: 'Для решения задачи используем формулу связи массы и объёма через плотность: ' +
				'$V = \\frac{m}{\\rho}$. ' +
				'Плотность ' + substanceName + ' составляет $\\rho = ' + (density * 1000) + '$ кг/м$^3 = ' + density + '$ кг/л. ' +
				'Тогда объём ' + vesselRe + ': ' +
				'$$V = \\frac{' + m + '}{' + density + '} = ' + V + ' \\text{ л}.$$ ' +
				'Таким образом, ёмкость ' + vesselRe + ' составляет ' + chislitlx(V, 'литр', '$') + '.',
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 1000);
})();
// https://phys-oge.sdamgia.ru/problem?id=24872
//zer00player
// ФИПИ A93201 DC23AC

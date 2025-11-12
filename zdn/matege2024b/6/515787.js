(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let numOfStores = 6;
		let wantedDistance = sl(1.1, 1.9, 0.1);
		let nameOfPerson = sklonlxkand(om.maleNames.iz());
		let item = sklonlxkand(['пылесос', 'вентилятор', 'стол', 'микроволновка', 'принтер', 'тумба', 'мультиварка'].iz());

		let nums = Array.from({ length: numOfStores }, (_, i) => i + 1);
		let prices = [];
		prices.zapslch(0, numOfStores - 1, 1000, 5000, 5);
		let distances = []
		distances.zapslch(0, numOfStores - 1, 0.5, 2.5, 0.1);

		let tableHTML = '<table style="border-collapse: collapse; width: 100%; text-align: center;">';
		// Заголовок
		tableHTML += '<tr>' +
			'<th>Номер магазина</th>' +
			'<th>Стоимость ' + item.re + ' (руб.)</th>' +
			'<th>Удалённость от ' + nameOfPerson.re + ' (км)</th>' +
			'</tr>';

		// Строки данных
		for (let i = 0; i < numOfStores; i++) {
			tableHTML += '<tr>' +
				`<th>${nums[i]}</th>` +
				`<th>${prices[i].ts()}</th>` +
				`<th>${distances[i].ts()}</th>` +
				'</tr>';
		}
		tableHTML += '</table>';

		let minPrice = Infinity;
		for (let i = 0; i < numOfStores; i++) {
			if (distances[i] <= wantedDistance) {
				minPrice = Math.min(minPrice, prices[i]);
			}
		}
		genAssert(minPrice != Infinity, 'слишком большой результат');

		NAtask.setTask({
			text: nameOfPerson.de + ' ' + ['нужен', 'нужна'][item.rod] + ' ' + item.ie +
				'. В таблице показано $6$ предложений от разных магазинов и их удалённость от дома ' + nameOfPerson.re + '. ' +
				tableHTML +
				nameOfPerson.ie + ' хочет купить ' + item.ve + ' в магазине, который находится не дальше $' + wantedDistance + '$ км от него.' +
				' Найдите наименьшую стоимость ' + item.ie + ' в магазинах (из представленных), удовлетворяющих данному условию. Ответ дайте в рублях.',
			answers: minPrice.ts(),
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/test?likes=515787

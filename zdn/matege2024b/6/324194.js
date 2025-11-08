(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let item = sklonlxkand(['смартфон', 'планшет', 'ноутбук'].iz());
		let salons = ['Альфа', 'Бета', 'Гамма', 'Дельта', 'Эпсилон', 'Дзета', 'Эта', 'Тета', 'Йота', 'Каппа', 'Лямбда',
			'Мю', 'Ню', 'Кси', 'Омикрон', 'Пи', 'Ро', 'Сигма', 'Тау', 'Ипсилон', 'Фи', 'Хи', 'Пси', 'Омега'].iz(3);

		let costs = [];
		costs.zapslch(0, 2, 12000, 18000, 100);
		let downPercents = [];
		downPercents.zapslch(0, 2, 5, 15, 5);
		let terms = [];
		terms.zapslch(0, 2, 12, 24, 3);
		let monthlyPayments = [];
		let totalCosts = [];

		for (let i = 0; i < 3; i++) {
			let cost = costs[i];
			let down = Math.round(cost * downPercents[i] / 100);
			let loan = cost - down;
			let overpayment = Math.round(loan * sl(0.1, 0.9, 0.01)); // 10% переплаты
			let monthly = Math.round((loan + overpayment) / terms[i]);
			let total = down + monthly * terms[i];

			monthlyPayments.push(monthly);
			totalCosts.push(total);
		}
		let minTotal = Math.min(...totalCosts);

		let tableHTML = '<table style="border-collapse: collapse; width: 100%; text-align: center; margin: 10px 0;">';
		tableHTML += '<tr>' +
			'<th>Салон</th>' +
			'<th>Стоимость ' + item.re + ' (руб.)</th>' +
			'<th>Первоначальный взнос (в % от стоимости)</th>' +
			'<th>Срок кредита (мес.)</th>' +
			'<th>Сумма ежемесячного платежа (руб.)</th>' +
			'</tr>';

		for (let i = 0; i < 3; i++) {
			tableHTML += '<tr>' +
				`<td>${salons[i]}</td>` +
				`<td>${costs[i].ts()}</td>` +
				`<td>${downPercents[i]}</td>` +
				`<td>${terms[i]}</td>` +
				`<td>${monthlyPayments[i].ts()}</td>` +
				'</tr>';
		}
		tableHTML += '</table>';

		NAtask.setTask({
			text: 'В трёх салонах сотовой связи один и тот же ' + item.ie + ' продаётся в кредит на разных условиях. Условия приведены в таблице.' +
				tableHTML +
				'Определите, в каком из салонов покупка обойдётся дешевле всего (с учётом переплаты). В ответ запишите стоимость этой покупки в рублях.',
			answers: minTotal,
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/test?likes=324194

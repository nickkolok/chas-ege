(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	let key = '10599748';
	let preference = ['profitAndIncome', 'expensesAndLoss', 'profitExtremes', 'breakEven', 'incomeDrop'];
	let variant = getSelectedPreferenceFromList(key, preference);
	let data = [
		[[115, 125, 140, 120, 130], [110, 130, 120, 110, 90]],
		[[130, 120, 100, 120, 80], [110, 115, 110, 80, 70]],
		[[120, 100, 100, 110, 120], [85, 90, 95, 100, 80]],
		[[110, 120, 130, 150, 140], [100, 130, 130, 140, 120]],
		[[155, 120, 110, 80, 90], [130, 110, 90, 110, 110]],
	];
	// Одинаковые сдвиг и масштаб сохраняют сравнения, знаки и равенства.
	let factor = sl(1, 4);
	let shift = sl(-30, 30, 5);
	let [income, expense] = data[variant].map(row => row.map(value => factor * value + shift));
	let profit = income.map((value, i) => value - expense[i]);
	let months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
	let start = sl(0, 11);
	let names = income.map((_, i) => months[(start + i) % 12]);
	let rows = income.map((value, i) => [names[i].toZagl(), value, expense[i]]);
	let previous = (values, i) => values[i] - values[i - 1];
	let options = {
		incomeMax: ['наибольший доход среди четырёх перечисленных месяцев', i => income[i] === Math.max(...income.slice(1))],
		incomeUp: ['доход выше, чем в предыдущем месяце', i => previous(income, i) > 0],
		incomeDown: ['доход ниже, чем в предыдущем месяце', i => previous(income, i) < 0],
		drop: ['наибольшее снижение дохода относительно предыдущего месяца', i => previous(income, i) === Math.min(...[1, 2, 3, 4].map(j => previous(income, j)))],
		expenseMax: ['наибольший расход среди четырёх перечисленных месяцев', i => expense[i] === Math.max(...expense.slice(1))],
		expenseMin: ['наименьший расход среди четырёх перечисленных месяцев', i => expense[i] === Math.min(...expense.slice(1))],
		expenseUp: ['расход выше, чем в предыдущем месяце', i => previous(expense, i) > 0],
		expenseDown: ['расход ниже, чем в предыдущем месяце', i => previous(expense, i) < 0],
		profitMax: ['наибольшая разность дохода и расхода', i => profit[i] === Math.max(...profit.slice(1))],
		profitMin: ['наименьшая разность дохода и расхода', i => profit[i] === Math.min(...profit.slice(1))],
		lossMax: ['наибольшая разность расхода и дохода', i => profit[i] === Math.min(...profit.slice(1))],
		loss: ['расход больше дохода', i => profit[i] < 0],
		equal: ['доход равен расходу', i => profit[i] === 0],
	};
	let selected = [
		['expenseUp', 'incomeMax', 'incomeDown', 'profitMax'],
		['expenseUp', 'loss', 'incomeUp', 'expenseMin'],
		['incomeDown', 'profitMin', 'expenseMax', 'profitMax'],
		['loss', 'equal', 'incomeMax', 'expenseDown'],
		['drop', 'expenseMin', 'lossMax', 'incomeUp'],
	][variant].map(name => options[name]);
	let left = names.slice(1).map((name, i) => ({
		expr: name,
		solution: selected.find(([, matches]) => matches(i + 1))[0],
	}));
	let table = [['Месяц', 'Доход, тыс. руб.', 'Расход, тыс. руб.']].concat(rows).map(row => row.tr()).join('').vTabl();
	NAtask.setCorrespondenceTask({
		text: 'В таблице показаны доходы и расходы фирмы за пять месяцев.<br>' + table +
			'<br>Поставьте в соответствие каждому из четырёх перечисленных месяцев его характеристику.',
		leftHeader: 'МЕСЯЦЫ',
		left,
		rightHeader: 'ХАРАКТЕРИСТИКИ',
		right: selected.map(([description]) => description),
		postText: 'Запишите номера характеристик в порядке, в котором перечислены месяцы.',
		preference,
	});
})();
// ФИПИ 7.113: A1BD44
// ФИПИ 7.114: D69ABD
// ФИПИ 7.115: 294E9F
// ФИПИ 7.116: E9A3EB
// ФИПИ 7.117: 16A788

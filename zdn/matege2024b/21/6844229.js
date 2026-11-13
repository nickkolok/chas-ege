(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	let rows = sl(9, 23);
	let least = rows + sl(2, 12);
	let sums = [0, 0, 0];
	for (let i = 0; i < rows; i++) {
		let total = least + sl1();
		let first = sl(1, total - 2);
		let second = sl(1, total - first - 1);
		let row = [first, second, total - first - second].shuffle();
		row.forEach((value, col) => sums[col] += value);
	}
	let total = sums.sum();
	NAtask.setTask({
		text: `В таблице три столбца и несколько строк. В каждую клетку записали натуральное число. Сумма чисел в первом столбце равна $${sums[0]}$, во втором — $${sums[1]}$, в третьем — $${sums[2]}$. Сумма чисел в каждой строке больше $${least - 1}$, но меньше $${least + 2}$. Сколько строк в таблице?`,
		answers: rows,
		analys: `Сумма всей таблицы равна $${total}$. Сумма строки равна $${least}$ или $${least + 1}$. Если строк $n$, то $${least}n\\leqslant ${total}\\leqslant ${least + 1}n$. Единственное целое $n$, подходящее под обе границы, равно $${rows}$.`,
	});
})();

// 686F45, 3AEC4C, 5A031A, AB7415, B5172D, 8C7FDA, D41596, 43C642, 6416FA, 46A4BE, D051CF, 97433B, 6E5B75, 120CB6, BD6455, 20375B, E532F1, 526AAA

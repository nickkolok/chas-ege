(function() {
	NAinfo.requireApiVersion(0, 2);

	var a1 = sl(1, 30, 2);
	var d = sl(2, 5);
	var n = sl(3, 8);
	var m = sl(n + 3, n + 7);
	var x = sl(5, 15);
	var aN = a1 + d * (n - 1);
	var aM = a1 + d * (m - 1);
	var sX = ((2 * a1 + (x - 1) * d) / 2 * x).okrugldo(0.01);

	var a = new Array(3);
	Array.prototype.push.apply(a, ['третий','четвертый','пятый','шестой','седьмой','восьмой','девятый','десятый','oдиннадцатый','двенадцатый','тринадцатый','четырнадцатый','пятнадцатый',]);

	NAtask.setTask({
		text: 'В данной арифметической прогрессии ' + a[n] + ' член равен ' + aN + ', а ' + a[m] + ' - ' + aM + '. Найти сумму ' + x + ' первых членов прогрессии.',
		answers: sX,
	});
})();

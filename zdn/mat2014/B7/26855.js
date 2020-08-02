(function() {
	NAinfo.requireApiVersion(0, 0);
	var d = 1; // Основание первого логарифма
	var b = 1; // Основание второго логарифма
	var a = 1; // Подлогарифмическое
	var c = 1; // множитель в первой скобке
	var e = 1; // множитель во второй скобке
	do {
		c = sluchch(1, 5);
		e = sluchch(1, 5);
		d = sluchch(2, 9);
		b = sluchch(2, 9);
		a = b * d;
	} while (d == b || Math.pow(a, c) > 10000 || Math.pow(a, e) > 10000);
	var v1 = '(' + c + ' - ' + (c == 1 ? '' : '{' + c + '}') + '\\log_{' + d + '}{' + a + '})(' + e + ' - ' +
		(e == 1 ? '' : '{' + e + '}') + '\\log_{' + b + '}{' + a + '})'; //вариант с множителями перед логарифмами
	var v2 = '(' + c + ' - \\log_{' + d + '}{' + Math.pow(a, c) + '})(' + e + ' - \\log_{' + b + '}{' + Math.pow(a, e) +
		'})'; // вариант с внесением множителей под логарифм
	var x = [v1, v2].iz();
	NAtask.setTask({
		text: 'Найдите значение выражения $$' + x + '$$',
		answers: c * e,
	}, {
		tags: {
			log: 1,
		},
	});
})();
//https://math-ege.sdamgia.ru/problem?id=26855
//Автор: Арахов Никита
//Reviewed and commited by Aisse-258

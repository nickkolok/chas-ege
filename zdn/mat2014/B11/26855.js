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
	var sk1_out = '(' + c + ' - ' + c + '\\log_{' + d + '}{' + a + '})'; //первая скобка с множителем перед логарифмом
	var sk1_in = '(' + c + ' - \\log_{' + d + '}{' + Math.pow(a, c) + '})'; //первая скобка с множителем под логарифмом
	var sk2_out = '(' + e + ' - ' + e + '\\log_{' + b + '}{' + a + '})'; //вторая скобка с множителем перед логарифмом
	var sk2_in = '(' + e + ' - \\log_{' + b + '}{' + Math.pow(a, e) + '})' //вторая скобка с множителем под логарифмом
	var x = ([sk1_out, sk1_in].iz() + [sk2_out, sk2_in].iz()).plusminus();
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

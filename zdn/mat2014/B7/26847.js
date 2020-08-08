(function() {
	NAinfo.requireApiVersion(0, 0);
	var y = 1; // Степень (ответ)
	var a = 1; // Основание логарифма
	var b = 1; // Подлогарифмическое
	do {
		a = sluchch(2, 25);
		y = sluchch(2, 25, 0.5);
		b = Math.pow(a, y);
	} while (b > 10000 || b % 1 !== 0);
	NAtask.setTask({
		text: 'Найдите значение выражения $$ \\log_{' + a + '}' + b + ' $$',
		answers: y,
	}, {
		tags: {
			log: 1,
		},
	});
})();
//https://math-ege.sdamgia.ru/problem?id=26847
//Автор: Арахов Никита
//Reviewed and commited by Aisse-258

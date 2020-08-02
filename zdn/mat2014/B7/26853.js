(function() {
	NAinfo.requireApiVersion(0, 0);
	var a = 1; //основание первого логарифма
	var b = 1; //основание второго логарифма
	var c = 1;
	var d = 1; //подлогарифмическое первого
	var e = 1; //подлогарифмическое второго
	var f = 1;
	do {
		a = sluchch(2, 10);
		b = sluchch(2, 10);
		c = sluchch(1, 10);
		f = sluchch(1, 10);
		e = Math.pow(a, c);
		d = Math.pow(b, f);
	}
	while (e > 150 || d > 150 || a === b);
	NAtask.setTask({
		text: 'Найдите значение выражения $$\\log_{' + a + '}{' + d + '}\\cdot\\log_{' + b + '}{' + e + '} $$',
		answers: c * f,
	}, {
		tags: {
			log: 1,
		},
	});
})();
//https://math-ege.sdamgia.ru/problem?id=26853
//Автор: Арахов Никита
//Reviewed and commited by Aisse-258

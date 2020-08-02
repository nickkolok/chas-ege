(function() {
	NAinfo.requireApiVersion(0, 0);
	var a = sluchch(2, 10); //основание степени
	var b = 1; //основание логарифма
	var c = 1; //подлогарифмическое числителя
	var e = 1; //подлогарифмическое знаменателя
	var d = 1;
	do {
		b = sluchch(2, 20);
		d = sluchch(2, 10);
		e = sluchch(2, 1000);
		c = Math.pow(b, d) * e;
	}
	while (c > 1000 || e === b);
	NAtask.setTask({
		text: 'Найдите значение выражения $$\\frac{{' + a + '}^{\\log_{' + b + '}{' + c + '}}}{{' + a + '}^{\\log_{' + b +
			'}{' + e + '}}} $$',
		answers: Math.pow(a, d),
	}, {
		tags: {
			log: 1,
		},
	});
})();
//https://math-ege.sdamgia.ru/problem?id=26854
//Автор: Арахов Никита
//Reviewed and commited by Aisse-258

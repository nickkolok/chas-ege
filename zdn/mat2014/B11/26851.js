(function(){
	NAinfo.requireApiVersion(0, 0);
	var b = sluchch(2, 10);  // Основание логарифмов
	var a = 1; // Подлогарифмическое второго
	var c = 1; // Степень, оно же и ответ
	var e = 1; // Подлогарифмическое первого
	do {
		a = sluchch(2, 10);
		c = sluchch(2, 20);
		e = Math.pow(a, c);
	}
	while (e  > 2000);
	NAtask.setTask({
		text: 'Найдите значение выражения $$\\frac{\\log_{'+b+'}{'+e+'}}{\\log_{'+b+'}{'+a+'}} $$',
		answers: c,
	},{
		tags: {
			log:1,
		},
	});
})();
//https://math-ege.sdamgia.ru/problem?id=26851
//Автор: Арахов Никита
//Reviewed and commited by Aisse-258

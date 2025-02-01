(function(){
	NAinfo.requireApiVersion(0, 0);
	var b = sluchch(2, 20);
	var a = 1;
	var c = 1;
	var e = 1;
	do {
		a = sluchch(2, 10);
		c = sluchch(2, 10);
		e = Math.pow(a, c);
	}
	while (e > 100);
	NAtask.setTask({
		text: 'Найдите значение выражения $$\\frac{\\log_{'+a+'}{'+b+'}}{\\log_{'+e+'}{'+b+'}} $$',
		answers: c,
	},{
		tags: {
			log:1,
		},
	});
})();
//https://math-ege.sdamgia.ru/problem?id=26852
//Автор: Арахов Никита
//Reviewed and commited by Aisse-258

(function(){
	NAinfo.requireApiVersion(0, 0);
	var a;
	var c;
	var e;
	var d;
	var b;
	do {
		a = sluchch(2, 10);
		c = sluchch(2, 10);
		e = Math.pow(a, c);
		d = sluchch(2, 10);
		b = d*e;
	}
	while ( b > 600);
	NAtask.setTask({
		text: 'Найдите значение выражения $$\\frac{\\log_{'+a+'}{'+b+'}}{{'+c+'}+\\log_{'+a+'}{'+d+'}}$$',
		answers: 1,
	},{
		tags: {
			log:1,
		},
	});
})();
//https://math-ege.sdamgia.ru/problem?id=26858
//Автор: Арахов Никита
//Reviewed and commited by Aisse-258

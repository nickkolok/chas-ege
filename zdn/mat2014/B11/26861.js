(function(){
	NAinfo.requireApiVersion(0, 0);
	var a;
	var y;
	var e;
	var b;
	var c;
	do {
		a = sluchch(2, 10);
		y = sluchch(2, 10);
		e = sluchch(2, 10);
		b = Math.pow(a, y);
		c = Math.pow(e, y);
	}
	while (b > 100 || c > 100 || b == c);
	NAtask.setTask({
	text: 'Найдите значение выражения $${'+a+'}^{\\log_{'+b+'}{'+c+'}}$$',
	answers: e,
	},{
		tags: {
			log:1,
		},
	});
})();
//https://math-ege.sdamgia.ru/problem?id=26861
//Автор: Арахов Никита
//Reviewed and commited by Aisse-258

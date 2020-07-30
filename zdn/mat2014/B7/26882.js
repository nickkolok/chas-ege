(function(){
	NAinfo.requireApiVersion(0, 0);
	var a = 1;
	var b = 1;
	var c = 1;
	var ans = 1;
	do {
		a = sluchch(2, 10);
		b = sluchch(2, 10);
		c = sluchch(2, 15);
		ans = Math.pow(a, b)*c;
	}
	while (ans > 1000);
	NAtask.setTask({
		text: 'Найдите значение выражения $${'+a+'}^{{'+b+'}+\\log_{'+a+'}{'+c+'}}$$',
		answers: ans,
	},{
		tags: {
			log:1,
		},
	});
})();
//https://math-ege.sdamgia.ru/problem?id=26882
//Автор: Арахов Никита
//Reviewed and commited by Aisse-258

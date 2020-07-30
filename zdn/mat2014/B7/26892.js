(function(){
	NAinfo.requireApiVersion(0, 0);
	var a = sluchch(2, 10);
	var c = sluchch(2, 200);
	var b = sluchch(2*c, 200, c);
	NAtask.setTask({
		text: 'Найдите значение выражения $$\\frac{'+b+'}{{'+a+'}^{\\log_{'+a+'}{'+c+'}}}$$',
		answers: b/c,
	},{
		tags: {
			log:1,
		},
	});
})();
//https://math-ege.sdamgia.ru/problem?id=26892
//Автор: Арахов Никита
//Reviewed and commited by Aisse-258

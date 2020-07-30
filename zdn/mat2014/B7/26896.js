(function(){
	NAinfo.requireApiVersion(0, 0);
	var a = sluchch(2, 10);
	var c = sluchch(2, 20);
	var b = c*c;
	NAtask.setTask({
		text: 'Найдите значение выражения $$\\frac{\\log_{'+a+'}{\\sqrt{'+c+'}}}{\\log_{'+a+'}{'+b+'}}$$',
		answers: 1,
	},{
		tags: {
			log:1,
		},
	});
})();
//https://math-ege.sdamgia.ru/problem?id=26896
//Автор: Арахов Никита
//Reviewed and commited by Aisse-258

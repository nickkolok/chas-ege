(function(){
	NAinfo.requireApiVersion(0, 0);
	var a = sluchch(2, 20);
	var c = sluchch(2, 20);
	var d = [0.25, 0.1, 0.2, 0.05, 0.5].iz();
	var b = 1/d;
	NAtask.setTask({
		text: 'Найдите значение выражения $$\\frac{\\log_{'+a+'}{'+b+'}}{\\log_{'+a+'}{'+c+'}}+\\log_{'+c+'}{'+d+'}$$',
		answers: 0,
	},{
		tags: {
			log:1,
		},
	});
})();
//https://math-ege.sdamgia.ru/problem?id=26859
//Автор: Арахов Никита
//Reviewed and commited by Aisse-258

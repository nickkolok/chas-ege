(function(){
	NAinfo.requireApiVersion(0, 0);
	var a = sluchch(2, 10);
	var c = [2 , 3].iz();
	var y = [2, 3, 4, 5].iz();
	var b = Math.pow(a, y);
	NAtask.setTask({
		text: 'Найдите значение выражения $$\\log^{'+c+'}_{\\sqrt{'+a+'}}{'+b+'}$$',
		answers: Math.pow(2*y, c),
	},{
		tags: {
			log:1,
		},
	});
})();
//https://math-ege.sdamgia.ru/problem?id=26862
//Автор: Арахов Никита
//Reviewed and commited by Aisse-258

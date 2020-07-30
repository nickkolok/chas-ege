(function(){
	NAinfo.requireApiVersion(0, 0);
	var c = sluchch(3, 100);
	var a = sluchch(c/2, 75, c/2);
	var b = sluchch(2, 20);
	NAtask.setTask({
		text: 'Найдите значение выражения $${'+a.ts()+'}\\log_{'+b+'}{\\sqrt[{'+c+'}]{'+b+'}}$$',
		answers: a/c,
	},{
		tags: {
			log:1,
		},
	});
})();
//https://math-ege.sdamgia.ru/problem?id=26856
//Автор: Арахов Никита
//Reviewed and commited by Aisse-258

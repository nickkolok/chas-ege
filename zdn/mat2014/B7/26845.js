(function(){
	NAinfo.requireApiVersion(0, 0);
	var b = sluchch(2, 10); // Значение для основания log
	var a = [2, 3, 4].iz(); // Степень
	var c = Math.pow(b, a); // Значение для основания степени
	var d = sluchch(2, 10); // Значение под log
	NAtask.setTask({
		text: 'Найдите значение выражения $${'+c+'}^{\\log_{'+b+'}{'+d+'}} $$',
		answers: Math.pow(d, a),
	},{
		tags: {
			log:1,
		},
	});
})();
//https://math-ege.sdamgia.ru/problem?id=26845
//Автор: Арахов Никита
//Reviewed and commited by Aisse-258

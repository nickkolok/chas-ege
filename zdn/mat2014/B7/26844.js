(function(){
	NAinfo.requireApiVersion(0, 0);
	var b = sluchch(2, 10); // Начальное значение для основания второго логарифма 
	var a = sluchch(2, 10); // Начальное значение для подлогарифмического 
	var c = sluchch(2, 10); // Делитель для подлагорифмического 
	NAtask.setTask({
		text: 'Найдите значение выражения $$'+a+'\\cdot {'+b+'}^{\\log_{'+b+'}{'+c+'}} $$',
		answers: a*c,
	},{
		tags: {
			log:1,
		},
	});
})();
//https://math-ege.sdamgia.ru/problem?id=26844
//Автор: Арахов Никита
//Reviewed and commited by Aisse-258

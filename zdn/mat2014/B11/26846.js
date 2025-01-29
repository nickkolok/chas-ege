(function(){
	NAinfo.requireApiVersion(0, 0);
	var c = sluchch(-1, -3);
	var y = 1;
	var d = 1;
	var b = 1;
	do {
		y = [2, 5].iz();
		d = sluchch(2, 5);
		b = Math.pow(y, d);
	}
	while (b > 1000 || d % c !== 0);
	var a = Math.pow(y, c);
	NAtask.setTask({
		text: 'Найдите значение выражения $$ \\log_{'+a.ts()+'}'+b.ts()+' $$',
		answers: d/c,
	},{
		tags: {
			log:1,
		},
	});
})();
//https://math-ege.sdamgia.ru/problem?id=26846
//Автор: Арахов Никита
//Reviewed and commited by Aisse-258

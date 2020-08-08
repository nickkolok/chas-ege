(function() {
	NAinfo.requireApiVersion(0, 0);
	var y = 1;
	var a = 1;
	var b = 1;
	var c = [2, 5].iz();
	var d = [1, 0.5].iz();
	do {
		a = sluchch(1, 25);
		y = sluchch(2, 25, d);
		b = Math.pow(a, y);
	} while (b > 100000 || a % c !== 0 || b % 1 !== 0);
	NAtask.setTask({
		text: 'Найдите значение выражения $$ \\log_{' + a + '}' + b + ' $$',
		answers: y,
	}, {
		tags: {
			log: 1,
		},
	});
})();
//https://math-ege.sdamgia.ru/problem?id=26847
//Автор: Арахов Никита
//Reviewed and commited by Aisse-258

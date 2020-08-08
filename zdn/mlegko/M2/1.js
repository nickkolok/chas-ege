(function() {
	NAinfo.requireApiVersion(0, 0);
	var a;
	var c;
	var d;
	var t = [10, 100].iz();
	while ((t * (a * d) / c) % 1 !== 0) {
		a = sluchch(1, 40, 0.01);
		c = sluchch(1, 40, 0.01);
		d = sluchch(1, 10, 0.01);
	}
	var b = (a * d) / c;
	var x = latbukv.iz().toLowerCase();
	var v1 = '\\frac{' + a.ts() + '}{' + x + '}=\\frac{' + c.ts() + '}{' + d.ts() + '}';
	var v2 = '\\frac{' + x + '}{' + a.ts() + '}=\\frac{' + d.ts() + '}{' + c.ts() + '}';
	var v3 = '\\frac{' + c.ts() + '}{' + d.ts() + '}=\\frac{' + a.ts() + '}{' + x + '}';
	var v4 = '\\frac{' + d.ts() + '}{' + c.ts() + '}=\\frac{' + x + '}{' + a.ts() + '}';
	var z = [v1, v2, v3, v4].iz();
	NAtask.setTask({
		text: 'Решите уравнение $$' + z + '$$',
		answers: b.ts(),
	});
})();
//Задание на пропорцию
//Автор: Арахов Никита
//Reviewed and commited by Aisse-258

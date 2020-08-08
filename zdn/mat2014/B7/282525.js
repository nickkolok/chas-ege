(function() {
	NAinfo.requireApiVersion(0, 0);
	var c = [8, 12].iz();
	var e;
	switch (c) {
	case 8:
		e = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23].iz();
		break;
	case 12:
		e = [1, 5, 7, 11, 13, 17, 19].iz();
		break;
	}
	var g = Math.sin((e * Math.PI) / c) * Math.cos((e * Math.PI) / c);
	var v = '\\sin' + (e).texfracpi(c);
	var x = '\\cos' + (e).texfracpi(c);
	var var1 = [v, x].shuffle();
	var b = Math.round((g * g * 144));
	if (b === 0) {
		b = 1;
	}
	NAtask.setTask({
		text: 'Найдите значение выражения $$ ' + (b * sluchch(1, 20)).koren(true, true) + ' ' + var1[0] + '' + var1[1] +
			'$$',
		answers: Math.sqrt(b) * g,
	}, {
		tags: {
			tri: 1,
		},
	});
})();
//https://matematikalegko.ru/vichislnie-viragenii/najdite-znachenie-vyrazheniya.html №282525
//Автор: Арахов Никита
//Reviewed and commited by Aisse-258

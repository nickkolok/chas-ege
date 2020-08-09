(function() {
	NAinfo.requireApiVersion(0, 0);
	var a = (sluchch(1, 40, 2)) + 1;
	var b = (sluchch(1, 10, 2)) + 1;
	var c = [2, 3, 4, 6].iz();
	var d = [2, 3, 4, 6].iz();
	var e;
	switch (c) {
	case 2:
		e = [1, 3].iz();
		break;
	case 3:
		e = [1, 2].iz();
		break;
	case 4:
		e = 1;
		break;
	case 6:
		e = 1;
	}
	var g = Math.sin((e * Math.PI) / c);
	var h = Math.cos((Math.PI) / d);
	var l = [g, h].iz();
	var k = [g, h].iz();
	var v;
	var x;
	if (l == g) {
		v = '\\sin{\\frac{' + e + '\\pi}{' + c + '}}';
	} else {
		v = '\\cos{\\frac{' + e + '\\pi}{' + c + '}}';
	}
	if (k == g) {
		x = '\\sin{\\frac{\\pi}{' + d + '}}';
	} else {
		x = '\\cos{\\frac{\\pi}{' + d + '}}';
	}
	NAtask.setTask({
		text: 'Найдите значение выражения $$' + a + '\\sqrt{' + b + '}' + v + '' + x + '$$',
		answers: a * Math.sqrt(b) * l * k,
	});
})();
//https://math-ege.sdamgia.ru/problem?id=26759
//Автор: Арахов Никита
//Reviewed and commited by Aisse-258

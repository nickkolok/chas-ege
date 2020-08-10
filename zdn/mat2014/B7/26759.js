(function() {
	NAinfo.requireApiVersion(0, 0);
	var a = sluchch(1, 100); //первый множитель
	var b = 1; //число под корнем
	var c = [2, 3, 4, 6].iz(); //знаменатель первой функции
	var d = [2, 3, 4, 6].iz(); //знаменатель второй функции
	var e; //числитель первой функции
	var f; //числитель второй функции
	var func1 = ['sin', 'cos'].iz(), func2 = ['sin', 'cos'].iz();
	var answer;
	switch (c) {
	case 2:
		e = [1, 3].iz();
		break;
	case 3:
		e = [1, 2].iz();
		if(func1 == 'sin') {
			b *= 3;
		}
		break;
	case 4:
		e = [1, 3].iz();
		b *= 2;
		break;
	case 6:
		e = [1, 5].iz();
		if(func1 == 'cos') {
			b *= 3;
		}
		break;
	}
	switch (d) {
	case 2:
		f = [1, 3].iz();
		break;
	case 3:
		f = [1, 2].iz();
		if(func2 == 'sin') {
			b = b == 3 ? 1 : b * 3;
		}
		break;
	case 4:
		f = [1, 3].iz();
		b = b == 2 ? 1 : b * 2;
		break;
	case 6:
		f = [1, 5].iz();
		if(func2 == 'cos') {
			b = b == 3 ? 1 : b * 3;
		}
		break;
	}
	answer = a * Math.sqrt(b) * Math[func1](e * Math.PI / c) * Math[func2](f * Math.PI / d);
	var v = '\\' + func1 + e.texfracpi(c);
	var x = '\\' + func2 + f.texfracpi(d);
	koef = b === 1 ? a : a + '\\sqrt{' + b + '}';
	NAtask.setTask({
		text: ('Найдите значение выражения $$' + koef + v + '' + x + '$$').plusminus(),
		answers: answer.ts() == '-0' ? 0 : answer,
	});
})();
//https://math-ege.sdamgia.ru/problem?id=26759
//Автор: Арахов Никита
//Reviewed and commited by Aisse-258

let a = sluchch(1, 5);
let b = sluchch(2, 4);
let n = sluchch(3, 11);

let progression = new ArithmeticProgression(a, b);

let q = a + progression.member(n);

NAtask.setTask({
	text: ' Улитка ползет от одного дерева до другого.' +
		' Каждый день она проползает на одно и то же расстояние больше, чем в предыдущий день.' +
		' Известно, что за первый и последний дни улитка проползла в общей сложности ' + chislitlx(q, 'метр') +
		'. Определите, сколько дней улитка потратила на весь путь, если расстояние между деревьями равно ' +
		chislitlx(progression.sum(n), 'метр') + '.',

	answers: n,
});
//Сергей Алендарь

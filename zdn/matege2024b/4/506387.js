(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let the_orderToFind = decor.orderToFind.iz();
		let a = sl(2, 20);
		let b = slKrome([a], 2, 20);
		let c = slKrome([a, b], 2, 20);

		let p = (a + b + c) / 2;
		let triangle = p * (p - a) * (p - b) * (p - c).sqrt();
		genAssert(triangle > 0, "результат не должен быть нулевым или отрицательным");
		genAssert(triangle.isZ(), "результат должен быть целым");
		let trapeziod = (a + b) / 2 * c;
		let parallelepiped = 2 * (a * b + a * c + b * c);


		NAtask.setTask({

			text: '',
			questions: [
				{
					text: 'Площадь поверхности прямоугольного параллелепипеда с рёбрами $a$, $b$ и $c$ вычисляется по формуле $S = 2(ab +ac +bc)$. ' +
						the_orderToFind.toZagl() + ' площадь поверхности прямоугольного параллелепипеда с рёбрами $' + a + '$, $' + b + '$ и $' + c + '$.',
					answers: parallelepiped,
				},
				{
					text: 'Площадь трапеции получается по формуле $S=\\frac{a+b}{2}*h$ где $a$ и $b$ – основания трапеции, $h$ – её высота. ' +
						'Пользуясь этой формулой, ' + the_orderToFind + ' $S$, если $a = ' + a + '$, $b = ' + b + '$ и $h = ' + c + '$.',
					answers: trapeziod,
				},
				{
					text: 'Площадь треугольника со сторонами a, b, c можно найти по формуле Герона $S = \\sqrt{p(p-a)(p-b)(p-c)}$, где $p = \\frac{a+b+c}{2}$. '
						+ the_orderToFind.toZagl() + ' площадь треугольника, ' +
						'если длины его сторон равны $' + a + '$, $' + b + '$, $' + c + '$.',
					answers: triangle,
				},
			],
			postquestion: '',
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/test?likes=506570
//https://mathb-ege.sdamgia.ru/test?likes=507929
//https://mathb-ege.sdamgia.ru/test?likes=506387

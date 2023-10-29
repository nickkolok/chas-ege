(function() {
	'use strict';

	var a = sluchch(0.5, 1, 0.5);
	var b = 0;
	if (a == 0.5) {
		b = 6;
	} else {
		b = 3;
	}

	function plusmin(member) {
		var el = math.parse(member);
		return math.simplify(el).toTex();
	}


	var x2 = sluchch(-10, -1);
	var x1 = Math.abs(x2) + sluchch(3, 10);
	var c = Math.abs(a * x1 * x2) + sluchch(1, 20);
	var d = sluchch(1, 999);

	chas2.task.setTask({
		text: 'Материальная точка движется прямолинейно по закону:$$ x(t)=' + '\\frac{1}{' + b + '}' + plusmin('x^3+' +
				(((-1) * a * (x1 + x2)) / 2)) + plusmin('x^2+' + (a * x1 * x2 + c)) + 'x+' + d + ',' + '$$' +
			'где $x$ - расстояние от точки отсчёта в метрах, $t$ - время в секундах, измеренное с момента начала движения. В какой момент времени её скорость была равна ' +
			c + ' м/с?',
		analys: '$$' + 'Решение:' + '$$' + 'Найдём закон изменения скорости: ' + '$$' + 'v(t)=x^{\'}(t)=' + plusmin(a +
				'x^2' + (
					(-1) * a * (
						x1 +
						x2))) + 'x' + '+' + (a * x1 * x2 + c) + '$$' +
			'Чтобы найти, в какой момент времени $t$ скорость была равна ' + c +
			' м/с, решим уравнение:' + '$$' + plusmin(a + 'x^2' + ((-1) * a * (
				x1 +
				x2))) + 'x' + '+' + (a * x1 * x2 + c) + ' = ' + c + ' \\Rightarrow\\ ' + plusmin(a + 'x^2' + ((-1) * a * (
				x1 +
				x2))) + 'x' + plusmin('+' + (a * x1 * x2)) + ' = 0' + '$$' + '$$' + 'D = b^2-4ac = ' + ((-
				1) * a * (x1 +
				x2)) + '^2-4\\cdot' + a * a * x1 * x2 + '=' + (Math.pow(((-1) * a * (x1 +
				x2)), 2) - (4 * a * a * x1 * x2)) + '$$' + '$$\\begin{cases}' + 'x_1=' + '\\frac{-b+\\sqrt{D}}{2a}' + '=' +
			'\\frac{' + a * (x1 +
				x2) + '+\\sqrt{' + (Math.pow(((-1) * a * (x1 +
				x2)), 2) - (4 * a * a * x1 * x2)) + '}}{' + 2 * a + '}' + ' = ' + x1 + '\\\\~\\\\' + 'x_2=' +
			'\\frac{-b-\\sqrt{D}}{2a}' + '=' + '\\frac{' + a * (x1 +
				x2) + '-\\sqrt{' + (Math.pow(((-1) * a * (x1 +
				x2)), 2) - (4 * a * a * x1 * x2)) + '}}{' + 2 * a + '}' + ' = ' + x2 + '\\end{cases}$$',

		answers: x1,
	});
})();
//119919

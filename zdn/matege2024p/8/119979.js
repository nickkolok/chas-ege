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

	var x2 = (sluchch(-15, -1) * (b / 3)).pm();
	if (x2 < 0) {
		var x1 = Math.abs(x2) + sluchch(6, 36, 2);
		var ans = x1;
	} else {
		var x1 = -x2 - sluchch(6, 36, 2);
		var ans = x2;
	}

	var c = Math.abs(a * x1 * x2) + sluchch(2, 100).pm();
	var d = sluchch(-999, 999);


	chas2.task.setTask({
		text: 'Материальная точка движется прямолинейно по закону:' +
			'$$ x(t)=\\frac{1}{' + b + '}' + plusmin('t^3+' + ((-a * (x1 + x2)) / 2)) + plusmin('t^2+' + (a * x1 * x2 + c)) + plusmin('t+' + d) + ', $$'
			+ 'где $x$ - расстояние от точки отсчёта в метрах, $t$ - время в секундах, измеренное с момента начала движения.' +
			' В какой момент времени её скорость была равна ' + '$' + c + '$ м/с?',
		analys: 'Найдём закон изменения скорости: ' +
			'$$ v(t)=x^{\'}(t)=' + plusmin(a + 't^2+' + (-a * (x1 + x2))) + plusmin('t+' + (a * x1 * x2 + c)) + 
			'$$ Чтобы найти, в какой момент времени $t$ скорость была равна $' + c + '$ м/с, решим уравнение: $$'
			+ plusmin(a + 't^2+' + (-a * (x1 + x2))) + plusmin('t+' + (a * x1 * x2 + c)) + ' = ' + c +
			' \\Rightarrow\\ ' + plusmin(a + 't^2+' + (-a * (x1 + x2))) + 't' + plusmin('+' + (a * x1 * x2)) + ' = 0 $$' +
			'$$ D = b^2-4ac = ' + (-a * (x1 + x2)) + '^2+4 \\cdot' + -a * a * x1 * x2 + '=' + (Math.pow((-a * (x1 + x2)), 2) - (4 * a * a * x1 * x2)) +
 			'$$' + '$$ \\begin{cases} t_1= \\frac{-b+\\sqrt{D}}{2a} =' +
			'\\frac{' + a * (x1 + x2) + '+\\sqrt{' + (Math.pow((-a * (x1 + x2)), 2) - (4 * a * a * x1 * x2)) + '}}{' + 2 * a + '}' + 
			' = ' + x1 + '\\\\~\\\\' + 't_2= \\frac{-b-\\sqrt{D}}{2a}' + 
			' = ' + '\\frac{' + a * (x1 + x2) + '-\\sqrt{' + (Math.pow((-a * (x1 + x2)), 2) - (4 * a * a * x1 * x2)) + '}}{' + 2 * a + '}' + 
			' = ' + x2 + '\\end{cases}$$',

		answers: ans,
	});
})();
//119979


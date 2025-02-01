(function() {
	'use strict';

	var arr1 = ['максимумa', 'минимумa'];
	var arr2 = ['положительный', 'отрицательный'];
	var maxmin1 = sl(0, 1);
	var maxmin2 = (maxmin1 + 1) % 2;

	var ans = sl(2, 14, 2) / 10;
	var b = sl(5, 50, 5);
	var a = ans * b;
	var d = sluchch(-99, 99);

	if (maxmin1 == 1) {
		b = -b;
		a = -a;
	}

	function plusmin(member) {
		var el = math.parse(member);
		el = math.simplify(el);
		el = math.simplify(el, [{
			l: 'n1*n2',
			r: 'n1 n2'
		}]);
		return el.toTex({
			implicit: 'hide'
		});
	}

	chas2.task.setTask({
		text: 'Найдите точку ' + arr1[maxmin1] + ' функции' +
			'$$ y=(' + plusmin(b + 'x-' + a) + ')' + '\\cos ' + plusmin('x-' + b) + '\\sin ' + plusmin('x+' + d) + ', $$' +
			'принадлежащую промежутку $(0; \\frac{\\pi}{2} )$.',
		analys: '$$ y^{\'}=(' + plusmin(b + 'x-' + a) + ')^{\'}\\cos x+(' + plusmin(b + 'x-' + a) +')'+
			'(\\cos x)^{\'}+(' + -b + '\\sin x)^{\'}$$' +
			'$$ y^{\'}=' + b + '\\cos x-(' + plusmin(b + 'x-' + a) + ')' + '\\sin ' + plusmin('x-' + b) + '\\cos x' +
			' \\Rightarrow\\ ' +
			'y^{\'}=-(' + plusmin(b + 'x-' + a) + ')\\sin x$$' +
			'$$ y^{\'}=0' + ' \\Rightarrow\\ ' + '(' + plusmin(b + 'x-' + a) + ')\\sin x=0$$' +
			'$$1) \\quad' + plusmin(b + 'x-' + a) + '=0' + ' \\Rightarrow\\ ' +
			b + 'x=' + a + ' \\Rightarrow\\ ' + 'x=' + ans + '$$' +
			'$$2) \\quad \\sin x=0' + ' \\Rightarrow\\ ' + 'x=\\pi n, \\quad n \\in \\mathbb {Z}' + '$$' +
			'Промежутку $(0;\\frac{\\pi}{2} )$ принадлежит только точка $' + ans +
			'$. Подставляя любые значения из промежутка $(0;' + ans +
			')$ в найденную производную, мы узнаём, что она имеет ' + arr2[maxmin1] +
			' знак, а на промежутке $(' + ans + '; \\frac{\\pi}{2} )$ ' + arr2[maxmin2] +
			'. Производная функции меняет знак с ' +
			sklonlxkand(arr2[maxmin1]).re + ' на ' + arr2[maxmin2] + ',' + ' значит, $' + ans +
			'$ - это искомая точка ' + arr1[maxmin1] + '.',

		answers: ans,
	});
})();
//77492



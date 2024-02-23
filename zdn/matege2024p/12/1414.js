(function() {
	'use strict';

	var arr1 = ['максимумa', 'минимумa']
	var arr2 = ['положительный', 'отрицательный']
	var maxmin1 = sl(0, 1)
	var maxmin2 = (maxmin1 + 1) % 2


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
		return math.simplify(el).toTex();
	}


	chas2.task.setTask({
		text: 'Найдите точку ' + arr1[maxmin1] + ' функции:' +
			'$$ y=(' + plusmin(b + 'x-' + a) + ')' + plusmin('cosx-' + b) + plusmin('sinx+' + d) + ', $$' +
			'принадлежащую промежутку $(0, pi/2)$',
		analys: '$$ y^{\'}=(' + plusmin(b + 'x-' + a) + ')^{\'}cosx+(' + plusmin(b + 'x-' + a) + ')(cosx)^{\'}+(' + -b +
			'sinx)^{\'}$$' +
			'$$ y^{\'}=' + b + 'cosx-(' + plusmin(b + 'x-' + a) + ')' + plusmin('sinx-' + b) + 'cosx' + ' \\Rightarrow\\ ' +
			'y^{\'}=-(' + plusmin(b + 'x-' + a) + ')sinx$$' +
			'$$ y^{\'}=0' + ' \\Rightarrow\\ ' + '(' + plusmin(b + 'x-' + a) + ')sinx=0$$' +
			'$$1)' + plusmin(b + 'x-' + a) + '=0' + ' \\Rightarrow\\ ' +
			+b + 'x=' + a + ' \\Rightarrow\\ ' + 'x=' + ans + '$$' +
			'$$2)sinx=0' + ' \\Rightarrow\\ ' + 'x=0' + '$$' +
			'Промежутку $(0, pi/2)$ принадлежит только точка: "$' + ans +
			'$". Подставляя любые значения из промежутка $(0,' + ans +
			')$ в найденную производную, мы узнаём, что она имеет ' + arr2[maxmin1] +
			' знак, а на промежутке $(' + ans + ', pi/2)$ ' + arr2[maxmin2] +
			'. Производная функции меняет знак с ' +
			sklonlxkand(arr2[maxmin1]).re + ', на ' + arr2[maxmin2] + ',' + ' значит, "$' + ans +
			'$" - это искомая точка ' + arr1[maxmin1] + ' .',

		answers: ans,
	});
})();
//1414


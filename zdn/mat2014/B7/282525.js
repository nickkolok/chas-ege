(function() {
	NAinfo.requireApiVersion(0, 0);
	var c = [8, 12].iz(); // знаменатель дроби под синусом (косинусом)
	var e, // числитель дроби под синусом (косинусом)
		koef, // внешний коэффициент
 		mn = sluchch(2, 100), // случайный множитель (составляющая внешнего коэффициента)
		answer;
	switch (c) {
	case 8: // углы, кратные п/4
		e = sluchch(1, 23, 2);
		koef = [mn + '\\sqrt{2}', '\\frac{' + mn + '}{\\sqrt{2}}'].iz(); // умножить или поделить на sqrt{2}
		if (koef == '\\frac{' + mn + '}{\\sqrt{2}}') { // ответ зависит от расположения sqrt{2}
			answer = mn / 4;
		}
		else {
			answer = mn / 2;
		}
		break;
	case 12: // углы, кратные п/6
		e = [1, 5, 7, 8, 10, 11, 13, 14, 16, 17, 19, 20, 22, 26, 28].iz();
		koef = e % 2 === 0 ? ['\\frac{' + mn + '}{\\sqrt{3}}', mn + '\\sqrt{3}'].iz() : mn.ts(); // если е чётно, умножаем или делим на sqrt{3}
		if (koef == mn + '\\sqrt{3}') { // ответ зависит от расположения sqrt{3}
			answer = mn / 4 * 3;
		}
		else {
			answer = mn / 4;
		}
		break;
	}
	if (Math.sin(e * Math.PI / c * 2) < 0) {
		answer = -answer;
	}
	var sincos = ['\\sin' + (e).texfracpi(c), '\\cos' + (e).texfracpi(c)].shuffle();
	NAtask.setTask({
		text: 'Найдите значение выражения $$ ' + koef + sincos[0] + sincos[1] + '$$',
		answers: answer,
	}, {
		tags: {
			tri: 1,
		},
	});
})();
//https://matematikalegko.ru/vichislnie-viragenii/najdite-znachenie-vyrazheniya.html №282525
//Автор: Арахов Никита
//Reviewed and commited by Aisse-258

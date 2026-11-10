(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		// Случайный выбор коэффициента радиуса (2, 3, 4, 5)
		let rCoeff = sl(2, 5);
		
		// Случайный выбор направления радиуса (1 = увеличили, -1 = уменьшили)
		let dirR = sl(0, 1) === 0 ? -1 : 1;
		
		// Случайный выбор коэффициента скорости (2, 3, 4, 5)
		let vCoeff = [2, 3, 4, 5].iz();
		
		// Иногда добавляем √2 для разнообразия (вероятность 25%)
		let useSqrt = sl(0, 3) === 0;
		
		// Случайный выбор направления скорости
		let dirV = sl(0, 1) === 0 ? -1 : 1;
		
		// Вычисляем результат
		let rFactor = dirR === 1 ? rCoeff : 1/rCoeff;
		let v2Factor = useSqrt ? 
			(dirV === 1 ? 2 : 1/2) : 
			(dirV === 1 ? vCoeff*vCoeff : 1/(vCoeff*vCoeff));
		
		let aFactor = v2Factor / rFactor;
		
		// Определяем глагол результата
		let resultVerb, resultN;
		if (aFactor > 1) {
			resultVerb = 'увеличилось';
			resultN = aFactor;
		} else {
			resultVerb = 'уменьшилось';
			resultN = 1/aFactor;
		}
		
		// Проверяем, что результат - целое число
		genAssert(resultN.isAlmostInteger(), "Результат не целое число");
		
		// Формируем текст задачи
		let rVerb = dirR === 1 ? 'увеличили' : 'уменьшили';
		let vVerb = dirV === 1 ? 'увеличили' : 'уменьшили';
		let conjunction = dirR === dirV ? ', тоже ' : ', а ';
		
		let rText = rCoeff.toString();
		let vText = useSqrt ? '\\sqrt{2}' : vCoeff.toString();
		
		let text = 'Радиус окружности, по которой движется тело, ' + rVerb + ' в $' + rText + '$ раз(а)' +
			conjunction + 'линейную скорость тела ' + vVerb + ' в $' + vText + '$ раз(а). ' +
			'Во сколько раз ' + resultVerb + ' центростремительное ускорение тела?';
		
		// Формируем решение
		let v2Text = useSqrt ? '2' : '$' + vCoeff + '^2$';
		let rAction = dirR === 1 ? 'увеличении' : 'уменьшении';
		let rEffect = dirR === 1 ? 'уменьшается' : 'увеличивается';
		let vAction = dirV === 1 ? 'увеличении' : 'уменьшении';
		let vEffect = dirV === 1 ? 'увеличивается' : 'уменьшается';
		
		let analys = 'Центростремительное ускорение тела вычисляется по формуле $a = \\frac{v^2}{R}$. ' +
			'При ' + rAction + ' радиуса в $' + rText + '$ раз(а) ускорение ' + rEffect + ' в $' + rText + '$ раз(а). ' +
			'При ' + vAction + ' скорости в $' + vText + '$ раз(а) квадрат скорости, а значит и ускорение, ' + vEffect + ' в $' + v2Text + '$ раз(а). ' +
			'Таким образом, итоговое изменение ускорения составляет $' + resultN + '$ раз(а).';
		
		NAtask.setTask({
			text: text,
			answers: resultN,
			analys: analys,
		});
	}, 1000);
})();

(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		// Случайный выбор коэффициента радиуса (2, 3, 4, 5)
		let rCoeff = sl(2, 5);
		
		// Случайный выбор направления радиуса (1 = увеличили, -1 = уменьшили)
		let dirR = (1).pm();
		
		// Случайный выбор коэффициента скорости (2, 3, 4, 5)
		let vCoeff = sl(2, 5);
		
		// Иногда добавляем √2 для разнообразия (вероятность 25%)
		let useSqrt = sl(0, 3) === 0;
		
		// Случайный выбор направления скорости
		let dirV = (1).pm();
		
		// Вычисляем результат
		let rFactor = dirR === 1 ? rCoeff : 1/rCoeff;
		let v2Factor = useSqrt ? 
			(dirV === 1 ? 2 : 1/2) : 
			(dirV === 1 ? vCoeff*vCoeff : 1/(vCoeff*vCoeff));
		
		let aFactor = v2Factor / rFactor;
		genAssert(!aFactor.isAlmostEqual(1, 1e-9), 'Ускорение не изменилось');
		
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
		// «в $4$ раза», «в $5$ раз»; «тоже» — как у ФИПИ, только если скорость изменили так же, как радиус
		let rTimes = multiplierPhrase(rCoeff, false);
		let vTimes = useSqrt ? 'в $\\sqrt{2}$ раза' : multiplierPhrase(vCoeff, false);
		let same = dirR === dirV && !useSqrt && rCoeff === vCoeff;
		
		let text = 'Радиус окружности, по которой движется тело, ' + rVerb + ' ' + rTimes + ', ' +
			(dirR === dirV ? '' : 'а ') + 'линейную скорость тела ' + (same ? 'тоже ' : '') + vVerb + ' ' + vTimes + '. ' +
			'Во сколько раз ' + resultVerb + ' центростремительное ускорение тела?';
		
		// Формируем решение
		let v2Times = useSqrt ? multiplierPhrase(2, false) :
			'в $' + vCoeff + '^2 = ' + vCoeff * vCoeff + '$ ' + chislit(vCoeff * vCoeff, 'раз', 'раза', 'раз');
		resultN = Math.round(resultN);
		let rAction = dirR === 1 ? 'увеличении' : 'уменьшении';
		let rEffect = dirR === 1 ? 'уменьшается' : 'увеличивается';
		let vAction = dirV === 1 ? 'увеличении' : 'уменьшении';
		let vEffect = dirV === 1 ? 'увеличивается' : 'уменьшается';
		
		let analys = 'Центростремительное ускорение тела вычисляется по формуле $a = \\frac{v^2}{R}$. ' +
			'При ' + rAction + ' радиуса ' + rTimes + ' ускорение ' + rEffect + ' ' + rTimes + '. ' +
			'При ' + vAction + ' скорости ' + vTimes + ' квадрат скорости, а значит и ускорение, ' + vEffect + ' ' + v2Times + '. ' +
			'Таким образом, центростремительное ускорение ' + resultVerb + ' ' + multiplierPhrase(resultN, false) + '.';
		
		NAtask.setTask({
			text: text,
			answers: resultN,
			analys: analys,
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 1000);
})();
// ФИПИ C8FB81 E18D8C F7869E 83C331

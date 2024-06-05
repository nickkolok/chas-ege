(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(1,100);
		let expr = '' + sl(1,10) + ['sqrt(' + a + ')', sl(1,100)].iz() + '/' + [a, sl(1,100)].iz();
		let value = math.parse(expr);
		value = math.simplify(value, mathjsRules.omit1sqrt);

		let givenFn = ['sin', 'cos', 'tg', 'ctg'].iz();
		let askedFn = ['sin', 'cos', 'tg', 'ctg'].iz();

		genAssert(givenFn !== askedFn, 'Нельзя спрашивать функцию, которая уже дана');
		genAssert((givenFn + askedFn != 'tgctg') && (givenFn + askedFn != 'ctgtg'), 'Нельзя спрашивать тангенс по котангенсу и наоборот');
		genAssert(math.evaluate(expr).abs() < 1 || givenFn === 'tg' || givenFn === 'ctg', 'Синус и косинус не могут превышать 1 по модулю');

		let quarter = sl(0,3);

		let leftBound = quarter.texfracpi(2);
		let rightBound = (quarter+1).texfracpi(2);
		let angle = ['\\alpha','\\beta'].iz();
		let interval = angle + '\\in\\left' + ['(','['].iz() + leftBound + ';' + rightBound + '\\right' + [')',']'].iz();

		let middle = 'pi/4+' + quarter + '*pi/2';
		let givenSgn = math.evaluate(givenFn + '(' + middle + ')') >= 0 ? '' : '-';
		let askedSgn = math.evaluate(askedFn + '(' + middle + ')') >= 0 ? 1 : -1;

		let answExpr = math.parse(askedFn + '(arc' + givenFn + '(' + expr + '))');
		answExpr = math.simplify(answExpr, mathjsRules.trigRevTrig)
		let coeff = [sl(1,20),1].iz(); // Чтобы почаще выпадала единица
		let answ = askedSgn * answExpr.evaluate().abs() * coeff;
		genAssertZ1000(answ, 'Ответ должен быть в меру нецелым!')

		NAtask.setTask({
			text:
				'Найдите $' + ('' + coeff).esli(coeff != 1) + '\\'+ askedFn + ' ' + angle + '$, если ' +
				'$\\' + givenFn + ' ' + angle + '=' + givenSgn + value.toTex() + '$ и $' + interval + '$.',
			answers: answ,
		});
	}, 10000);
})();

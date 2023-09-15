(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(1, 100);
		let expr = '' + sl(1, 10) + ['sqrt(' + a + ')', sl(1, 100)].iz() + '/' + [a, sl(1, 100)].iz();
		let value = math.parse(expr);
		value = math.simplify(value, mathjsRules.omit1sqrt);

		let givenFn = ['tg', 'ctg'].iz();
		let askedFn = ['sin', 'cos'].iz();

		let quarter = sl(0, 3);

		let leftBound = quarter.texfracpi(2);
		let rightBound = (quarter + 1).texfracpi(2);
		let angle = ['\\alpha', '\\beta'].iz();
		let interval = angle + '\\in\\left' + ['(', '['].iz() + leftBound + ';' + rightBound + '\\right' + [')', ']'].iz();

		let middle = 'pi/4+' + quarter + '*pi/2';
		let givenSgn = math.evaluate(givenFn + '(' + middle + ')') >= 0 ? '' : '-';
		let askedSgn = math.evaluate(askedFn + '(' + middle + ')') >= 0 ? 1 : -1;

		let answExpr = math.parse(askedFn + '(arc' + givenFn + '(' + expr + '))');
		answExpr = math.simplify(answExpr, mathjsRules.trigRevTrig);
		let coeff = [sl(1, 20), 1].iz(); // Чтобы почаще выпадала единица
		let answ = askedSgn * answExpr.evaluate().abs() * coeff;
		genAssertZ1000(answ, 'Ответ должен быть в меру нецелым!');

		NAtask.setTask({
			text: 'Найдите $' + ('' + coeff).esli(coeff != 1) + '\\' + askedFn + ' ' + angle + '$, если ' +
				'$\\' + givenFn + ' ' + angle + '=' + givenSgn + value.toTex() + '$ и $' + interval + '$.',
			answers: answ,
		});
	}, 10000);
})();
// 26775 64273 548507 548526 64211 64213 64215 64217 64219 64221 64223 64225 64227 64229 64231 64233 64235 64237 64239 64241 64243 64245 64247 64249 64251 64253 64255 64257 64259 64261 64263 64265 64267 64271 26776 64275 64279 64341 64345 516251 516270 64277 64281 64283 64285 64287 64289 64291 64293 64295 64297 64299 64301 64303 64305 64307 64309 64311 64313 64315 64317 64319 64321 64323 64325 64327 64329 64331 64333 64335 64337 64339 64343

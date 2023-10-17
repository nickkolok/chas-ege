(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(1, 10);
		let b = sl(1, 10);
		let c = sl(1, 10);

		let find = [
			['длину диагонали $AC_1$', (a.pow(2) + b.pow(2) + c.pow(2)).sqrt()],
			['объём параллелепипеда', a * b * c],
			['площадь полной поверхности параллелепипеда', 2 * (a * b + a * c + b * c)]
		].iz();
		let answ = find.pop();

		NAtask.setTask({
			text: 'В прямоугольном параллелепипеде $ABCDA_1B_1C_1D_1$ известно, что ' + 
            ['$DD_1=' + a + '$', '$C_1D_1=' + b + '$', '$B_1C_1=' + c + '$' ].shuffleJoin(', ') +
			'. Найдите ' + find.iz() + '.',
			answers: answ,
		});
		NAtask.modifiers.multiplyAnswerBySqrt(13);
		NAtask.modifiers.variativeABC();
	});
})();
//2966
//https://ege314.ru/8-stereometriya-ege/reshenie-2966/

(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let labels = window.smallLatinLetters.iz(2);
		let labelA = labels[0];
		let labelB = labels[1];

		let plusOrMinus = sl1();
		let isALessThanB = sl1();

		let word = ['положительные', 'отрицательные'][plusOrMinus];

		let aSign = labelA + [' > ', ' < '][isALessThanB] + labelB;

		let numerator = sl(1, 9);
		let exprA = numerator.texfrac(labelA);
		let exprB = numerator.texfrac(labelB);

		let correct = exprA + [' < ', ' > '][isALessThanB] + exprB;

		let wrong = [
			exprA + ' < ' + exprB,
			exprA + ' > ' + exprB,
			exprA + ' = ' + exprB,
			'\\mbox{невозможно определить}'
		].filter(ans => ans !== correct);

		NAtask.setTask({
			text: 'Сравните числа, если $' + labelA + '$, $' + labelB + '$ – ' + word + ' числа и $' + aSign + '$. В ответе укажите номер правильного варианта.',
			answers: correct,
			wrongAnswers: wrong
		});
		AtoB(3, { autoLaTeX: true });

	}, 1000);
})();
//zer00player
//https://oge.sdamgia.ru/test?pid=337381

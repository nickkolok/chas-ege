(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		// Знаменатель дробей
		let denominator = sl(15, 25);
		
		// Границы отрезка [leftBound, rightBound]
		let leftBound = sl(2, 5);
		let rightBound = leftBound + 1;
		
		// Минимальный и максимальный числитель для попадания в отрезок
		let minNum = leftBound * denominator;
		let maxNum = rightBound * denominator;
		
		// Правильный числитель (строго внутри для однозначности)
		let correctNum = sl(minNum + 1, maxNum - 1);
		
		// Неправильные числители
		let wrong1 = sl(1, minNum - 1);
		let wrong2 = sl(1, minNum - 1);
		while (wrong2 === wrong1) {
			wrong2 = sl(1, minNum - 1);
		}
		let wrong3 = sl(maxNum + 1, maxNum + denominator);
		
		// Формируем варианты ответов
		let correctLatex = correctNum.texfrac(denominator);
		let wrongLatex1 = wrong1.texfrac(denominator);
		let wrongLatex2 = wrong2.texfrac(denominator);
		let wrongLatex3 = wrong3.texfrac(denominator);
		
		let answersArray = [correctLatex, wrongLatex1, wrongLatex2, wrongLatex3].shuffle();
		let correctIndex = answersArray.indexOf(correctLatex);
		let correctLetter = ['1', '2', '3', '4'][correctIndex];
		
		let optionsText = answersArray.map((opt, idx) => {
			return `${idx + 1}) $${opt}$`;
		}).join('; ');

		NAtask.setTask({
			text: `Какое из чисел $${answersArray.join('; ')}$ принадлежит отрезку $[${leftBound}; ${rightBound}]$?`,
			answers: correctLetter,
			solution: `Переведём границы отрезка $[${leftBound}; ${rightBound}]$ к знаменателю ${denominator}: ` +
					  `$${leftBound} = \\frac{${minNum}}{${denominator}}$, $${rightBound} = \\frac{${maxNum}}{${denominator}}$. ` +
					  `Число принадлежит отрезку, если его числитель находится в диапазоне от ${minNum} до ${maxNum}. ` +
					  `Числитель ${correctNum} удовлетворяет этому условию (${minNum} \\le ${correctNum} \\le ${maxNum}), ` +
					  `поэтому верный ответ: ${correctLetter}.`,
			wrongAnswers: answersArray.filter((_, idx) => idx !== correctIndex).map(a => '$' + a + '$')
		});
		
		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
// https://github.com/nickkolok/chas-ege

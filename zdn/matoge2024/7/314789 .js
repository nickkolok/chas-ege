(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let labels = window.smallLatinLetters.iz(2);
		let labelA = labels[0];
		let labelB = labels[1];

		// случаи: 0 — a < b (положительные), 1 — a > b (положительные)
		let variant = sl1();

		let conditionText = [labelA + ' < ' + labelB, labelA + ' > ' + labelB][variant]

		let minus = sl(1, 99, 1);
		let plus = slKrome([minus], 1, 99, 1);
		let denominatorMinus = slKrome([minus, plus], 1, 99, 1);
		let denominatorPlus = slKrome([minus, plus, denominatorMinus], 1, 99, 1);

		let correctForms = [];
		let wrongForm = '';

		if (variant === 0) {
			correctForms = [
				labelA + ' - ' + minus + ' < ' + labelB + ' - ' + minus,
				labelA + ' + ' + plus + ' < ' + labelB + ' + ' + plus,
				labelA.texfrac(denominatorPlus) + ' < ' + labelB.texfrac(denominatorPlus),
			];
			wrongForm = '-' + labelA.texfrac(denominatorMinus) + ' < -' + labelB.texfrac(denominatorMinus);
		}

		if (variant === 1) {
			correctForms = [
				labelA + ' - ' + minus + ' > ' + labelB + ' - ' + minus,
				labelA + ' + ' + plus + ' > ' + labelB + ' + ' + plus,
				labelA.texfrac(denominatorPlus) + ' > ' + labelB.texfrac(denominatorPlus),
			];
			wrongForm = '-' + labelA.texfrac(denominatorMinus) + ' > -' + labelB.texfrac(denominatorMinus);
		}

		NAtask.setTask({
			text: 'Какое из данных утверждений неверно, если $' + conditionText + '$?',
			answers: wrongForm,
			wrongAnswers: correctForms
		});

		AtoB(3, { autoLaTeX: true });
	}, 1000);
})();

//zer00player
//https://oge.sdamgia.ru/test?likes=314789 

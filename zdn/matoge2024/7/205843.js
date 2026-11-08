(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let labels = window.smallLatinLetters.iz(2);
		let labelA = labels[0];
		let labelB = labels[1];

		let variant = sl1();
		let rand = [variant, 1 - variant].iz();
		let conditionText = labelA + [' < ', ' > '][variant] + labelB;
		let reverseconditionText = labelA + [' < ', ' > '][1 - variant] + labelB;

		let minus = sl(1, 99);
		let plus = slKrome([minus], 1, 99);
		let denominatorMinus = slKrome([minus, plus], 1, 99);
		let denominatorPlus = slKrome([minus, plus, denominatorMinus], 1, 99);

		let wrongForm = '';
		let correctForms = [
			labelA + ' - ' + minus + [' < ', ' > '][variant] + labelB + ' - ' + minus,
			labelA + ' + ' + plus + [' < ', ' > '][variant] + labelB + ' + ' + plus,
			labelA.texfrac(denominatorPlus) + [' < ', ' > '][variant] + labelB.texfrac(denominatorPlus),
		];
		wrongForm = '-' + labelA.texfrac(denominatorMinus) + [' < -', ' > -'][variant] + labelB.texfrac(denominatorMinus);

		NAtask.setTask({
			text: 'Какое из данных утверждений ' + ['не', ''][rand] + 'верно, если $' + [conditionText, reverseconditionText][rand] + '$?',
			answers: wrongForm,
			wrongAnswers: correctForms
		});

		AtoB(3, { autoLaTeX: true });
	}, 1000);
})();

//zer00player
//https://oge.sdamgia.ru/problem?id=205843

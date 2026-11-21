(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	const gramsInPound = 400;
	const denominator = sl(1, 3) * 10;
	const numerator = sl(1, denominator - 1);
	let peopleInRecipe, requiredPeople, answer;
	do {
		peopleInRecipe = sl(5, 30);
		requiredPeople = slKrome(peopleInRecipe, 3, 12);
		answer = gramsInPound * numerator * requiredPeople / (denominator * peopleInRecipe);
	} while (!(answer * 100).isAlmostInteger());
	const product = sklonlxkand(['чернослив', 'черника', 'земляника', 'ежевика'].iz());
	NAtask.setTask({
		text: 'Имеется рецепт пирога с ' + product.te + '. Для пирога на ' + peopleInRecipe +
			' человек следует взять $' + numerator.frac(denominator) + '$ фунта ' + product.re +
			'. Сколько граммов ' + product.re + ' следует взять для пирога, рассчитанного на ' +
			requiredPeople + ' человек? Считайте, что 1 фунт равен 0,4 кг.',
		answers: answer.okrugldo(0.01),
	});
	NAtask.modifiers.allDecimalsToStandard();
})();
// Обзад 318582
// Sergey Naumov aka DrMGC

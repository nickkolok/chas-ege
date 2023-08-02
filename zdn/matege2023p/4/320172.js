(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let product = sklonlxkand(['пончик', 'леденец', 'сладость', 'батончик', 'линза'].iz());
		let machine = sklonlxkand(['автомат', 'прилавок'].iz());
		let firstProbability = sl(0.05, 0.49, 0.01);
		let secondProbability;
		let probability;
		if (sl1()) {
			probability = 'такая же';
			secondProbability = firstProbability;
		} else {
			secondProbability = slKrome(firstProbability, 0.05, 0.5, 0.01);
			probability = secondProbability.ts();
		}
		let thirdProbability = sl(0.05, firstProbability + secondProbability - 0.01, 0.01);
		NAtask.setTask({
			text: 'В торговом центре два одинаковых ' + machine.re + ' с ' + product.tm + '. ' +
				'Вероятность того, что к концу дня в первом автомате закончатся ' + product.im + ', ' +
				'равна ' + firstProbability.ts() + '. Вероятность того, что ' + product.im +
				' закончатся во втором автомате, ' +
				'' + probability + '. Вероятность того, что ' + product.im + ' закончатся в двух автоматах, равна ' +
				thirdProbability.ts() + '. ' +
				'Найдите вероятность того, что к концу дня ' + product.im + ' останутся в двух ' + machine.pm + '.',
			answers: 1-(firstProbability + secondProbability - thirdProbability),
			analys: '',
		});
	});
})();
//320172 510117 320431 509531 320433 320435 320437 320439 320441 320443 320445 320447 320449 320451 320453 320455 320457 320459 320461 320463 320465 320467 320469 
//SugarHedgehog

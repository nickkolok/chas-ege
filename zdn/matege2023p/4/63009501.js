(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let numString = ['двух', 'трёх', 'четырёх', 'пяти'];
		let probability = sl(0.1, 0.9, 0.01);
		let antiProbability = 1 - probability;
		let numberOfTarget = sl(2, 4);
		let numberOfWin = sl(1, numberOfTarget - 1);
		let answ = probability.pow(numberOfTarget - numberOfWin) * antiProbability.pow(numberOfWin);
		genAssertZ1000(answ * 10000, 'Кривой ответ');
		let condition = ['последнюю', 'первую', 'вторую', 'третью', 'четвёртую'];
		condition.splice(numberOfTarget+1,numberOfTarget);
		switch (numberOfWin) {
		case 1:
			condition = condition.iz();
			if (condition == 'вторую')
				condition = 'о ' + condition;
			else
				condition = ' ' + condition;
			condition += ' мишень';
			break;

		case 2:
			if (sl1()) {
				if (sl1())
					condition.splice(numberOfTarget, 1);
				else
					condition.shift();
				if (sl1())
					condition = condition.iz(2);
				condition = 'о'.esli(condition[0] == 'вторую') + ' ' + condition[0] + ' и ' + condition[1];
			} else
				condition = ' две ' + ['последние', 'первые'].iz();
			condition += ' мишени';
			break;
		case 3:
			if (sl1()) {
				if (sl1())
					condition.splice(numberOfTarget, 1);
				else
					condition.shift();
				condition = condition.iz(3);
				condition = 'о'.esli(condition[0] == 'вторую') + ' ' + condition[0] + ', ' + condition[1] + ' и ' + condition[2];
			} else
				condition = ' три ' + ['последние', 'первые'].iz();
			condition += ' мишени';
			break;
		}
		NAtask.setTask({
			text: 'Стрелок стреляет по одному разу в каждую из ' + numString[numberOfTarget - 2] + ' мишеней. ' +
				'Вероятность попадания в мишень при каждом отдельном выстреле равна ' + probability.ts() + '. ' +
				'Найдите вероятность того, что стрелок <b>НЕ</b> попадёт только в' + condition + '.',
			answers: answ,
			analys: '',
		});
	});
})();
// 630095 630182
//SugarHedgehog

(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '529741';
		let preference = ['isDecreasing', 'isIncreasing'];
		let isIncreasing = getSelectedPreferenceFromList(key, preference);

		// Разрешённые делители, основанные на школьных признаках делимости
		let divisor = [12, 15, 18, 20, 24, 25, 30, 36, 40, 45, 50, 60, 75, 90].iz();		
		let directionText = isIncreasing ? 'больше предыдущей' : 'меньше предыдущей';

		// 1. Находим все валидные четырёхзначные числа для выбранных условий
		let allValidNumbers = [];
		for (let n = 1000; n < 10000; n++) {
			if (n % divisor === 0) {
				let s = String(n);
				let isValid = true;
				for (let i = 0; i < 3; i++) {
					if (isIncreasing) {
						if (parseInt(s[i]) >= parseInt(s[i+1])) {
							isValid = false;
							break;
						}
					} else {
						if (parseInt(s[i]) <= parseInt(s[i+1])) {
							isValid = false;
							break;
						}
					}
				}
				if (isValid) {
					allValidNumbers.push(n);
				}
			}
		}

		genAssert(allValidNumbers.length > 0, `Нет решений для делителя ${divisor} и направления ${isIncreasing ? 'возрастание' : 'убывание'}`);

		// 2. Выбираем одно из валидных чисел и формируем вокруг него реалистичный диапазон
		let targetNumber = allValidNumbers.iz();
		let thousands = Math.floor(targetNumber / 1000);
		let minVal = thousands * 1000;
		let maxVal = Math.min(10000, (thousands + 2) * 1000);

		// 3. Фильтруем ответы, чтобы они попадали в выбранный диапазон
		let validNumbersInRange = allValidNumbers.filter(n => n > minVal && n < maxVal);
		
		genAssert(validNumbersInRange.length > 0, `Нет решений в диапазоне ${minVal}-${maxVal}`);

		NAtask.setTask({
			text: 'Найдите четырёхзначное число, большее ' + minVal + ', но меньшее ' + maxVal + 
			      ', которое делится на ' + divisor + 
			      ' и каждая следующая цифра которого ' + directionText + '. В ответе укажите какое-нибудь одно такое число.',
			answers: validNumbersInRange,
			preference,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();

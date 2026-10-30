(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '3488';
		let preference = ['findA', 'findV'];
		let rand = getSelectedPreferenceFromList(key, preference);

		// Генерируем ускорение в м/с^2 (0.5, 1, 1.5, 2, 2.5, 3)
		let a_num = sl(1, 6, 1);
		let a = a_num * 0.5;
		
		// Генерируем время в секундах (чётное от 2 до 20)
		let t = sl(2, 20, 2);
		
		// Вычисляем скорость в м/с
		let v_ms = a * t;
		
		// Переводим скорость в км/ч для выбора адекватного ТС
		let v_kmh = v_ms * 3.6;
		
		// Получаем список подходящих транспортных средств
		let adequateVehicles = getAdequateVehicles(v_kmh);
		
		// Если список пустой, повторим (маловероятно при наших параметрах)
		genAssert(adequateVehicles.length > 0, 'Нет подходящих транспортных средств');
		
		// Выбираем случайное ТС
		let vehicleName = adequateVehicles.iz();
		let vehicle = sklonlxkand(vehicleName);

		let text, answers, analys;

		if (rand === 0) {
			// Найти ускорение (задача 3488)
			text = vehicle.ie.toZagl() + ', начав двигаться равноускоренно из состояния покоя по прямолинейной дороге, за $' + t + '$ с приобрёл скорость $' + v_ms + '$ м/с. Чему равно ускорение ' + vehicle.re + '?';
			answers = a.ts();
			analys = 'Движение ' + vehicle.re + ' равноускоренное и прямолинейное без начальной скорости. Его скорость найдём по формуле: $v = at$. Отсюда ускорение $a = \\frac{v}{t} = \\frac{' + v_ms + '}{' + t + '} = ' + a.ts() + '$ м/с$^2$.';
		} else {
			// Найти скорость (задача 32437)
			text = vehicle.ie.toZagl() + ' разгоняется по прямолинейной дороге из состояния покоя с постоянным ускорением $' + a.ts() + '$ м/с$^2$. Какой будет скорость ' + vehicle.re + ' через $' + t + '$ с?';
			answers = v_ms;
			analys = 'Движение ' + vehicle.re + ' равноускоренное и прямолинейное без начальной скорости. Его скорость найдём по формуле: $v = at = ' + a.ts() + ' \\cdot ' + t + ' = ' + v_ms + '$ м/с.';
		}

		NAtask.setTask({
			text: text,
			answers: answers,
			analys: analys,
		});
	}, 1000);
})();
// https://github.com/nickkolok/chas-ege/issues/3488
// https://phys-oge.sdamgia.ru/problem?id=32437
// https://phys-oge.sdamgia.ru/problem?id=32590

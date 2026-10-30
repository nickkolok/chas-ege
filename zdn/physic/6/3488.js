(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '3488';
		let preference = ['findA', 'findV'];
		let rand = getSelectedPreferenceFromList(key, preference);

		let a_num = sl(1, 6, 1);
		let a = a_num * 0.5;
		let t = sl(2, 20, 2);
		let v = a * t;

		let objects = [
			{im: 'Автомобиль', rod: 'автомобиля'},
			{im: 'Мотоцикл', rod: 'мотоцикла'},
			{im: 'Автобус', rod: 'автобуса'},
			{im: 'Троллейбус', rod: 'троллейбуса'},
			{im: 'Поезд', rod: 'поезда'},
			{im: 'Трамвай', rod: 'трамвая'}
		];
		let obj = objects.iz();

		let text, answers, analys;

		if (rand === 0) {
			// Найти ускорение (задача 3488)
			text = obj.im + ', начав двигаться равноускоренно из состояния покоя по прямолинейной дороге, за $' + t + '$ с приобрёл скорость $' + v + '$ м/с. Чему равно ускорение ' + obj.rod + '?';
			answers = a.ts();
			analys = 'Движение ' + obj.rod + ' равноускоренное и прямолинейное без начальной скорости. Его скорость найдём по формуле: $v = at$. Отсюда ускорение $a = \\frac{v}{t} = \\frac{' + v + '}{' + t + '} = ' + a.ts() + '$ м/с$^2$.';
		} else {
			// Найти скорость (задача 32437)
			text = obj.im + ' разгоняется по прямолинейной дороге из состояния покоя с постоянным ускорением $' + a.ts() + '$ м/с$^2$. Какой будет скорость ' + obj.rod + ' через $' + t + '$ с?';
			answers = v;
			analys = 'Движение ' + obj.rod + ' равноускоренное и прямолинейное без начальной скорости. Его скорость найдём по формуле: $v = at = ' + a.ts() + ' \\cdot ' + t + ' = ' + v + '$ м/с.';
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

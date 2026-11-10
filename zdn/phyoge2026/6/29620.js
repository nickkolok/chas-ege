(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '29620';

		// Справочник ускорений свободного падения на различных небесных телах (м/с²)
		let planets = [
			{name: 'Луны', g: 1.6},
			{name: 'Меркурия', g: 3.7},
			{name: 'Марса', g: 3.7},
			{name: 'Венеры', g: 8.9},
			{name: 'Сатурна', g: 10.4},
			{name: 'Нептуна', g: 11.2},
			{name: 'Урана', g: 8.7},
			{name: 'Юпитера', g: 24.8},
			{name: 'Плутона', g: 0.62},
			{name: 'Цереры', g: 0.28},
			{name: 'Ганимеда', g: 1.4},
			{name: 'Титана', g: 1.4},
			{name: 'Каллисто', g: 1.2},
			{name: 'Ио', g: 1.8},
			{name: 'Европы', g: 1.3},
		];

		let planet = planets.iz();
		let g = planet.g;
		let name = planet.name;

		// Два варианта задачи: найти скорость или путь
		let preference = ['velocity', 'distance'];
		let rand = getSelectedPreferenceFromList(key, preference);

		// Время падения (в секундах)
		let t = sl(2, 8);

		if (rand === 0) {
			// Вариант: найти скорость (v = g * t)
			let v = g * t;
			let vStd = v.ts();

			genAssert(vStd !== NaN, 'Скорость должна быть числом');

			let planetWord = (name === 'Луны') ? 'Луны' : 'планеты';

			let taskText = 'Ускорение свободного падения вблизи поверхности ' + name +
				' равно $' + g + '$ м/с². Атмосфера у ' + planetWord +
				' отсутствует. Какую скорость приобретёт камень за $' + t +
				'$ с падения из состояния покоя у поверхности ' + name + '? ' +
				'Ответ дайте в м/с.';

			let analys = 'Данный вид движения — равноускоренное без начальной скорости. ' +
				'Тогда приобретённая скорость равна $v = g \\cdot t = ' +
				g + ' \\cdot ' + t + ' = ' + vStd + '$ м/с.';

			NAtask.setTask({
				text: taskText,
				answers: vStd,
				analys: analys,
				preference: preference,
			});
		} else {
			// Вариант: найти путь (s = g * t^2 / 2)
			let s = g * t * t / 2;
			let sStd = s.ts();

			genAssert(sStd !== NaN, 'Путь должен быть числом');

			let planetWord = (name === 'Луны') ? 'Луны' : 'планеты';

			let taskText = 'Ускорение свободного падения вблизи поверхности ' + name +
				' равно $' + g + '$ м/с². Атмосфера у ' + planetWord +
				' отсутствует. Какой путь по вертикали пройдёт камень за $' + t +
				'$ с из состояния покоя у поверхности ' + name + '? ' +
				'Ответ дайте в метрах.';

			let analys = 'При равноускоренном движении под действием силы тяжести ' +
				'происходит движение с ускорением свободного падения. Путь при этом равен ' +
				'$s = \\frac{g \\cdot t^2}{2} = \\frac{' + g + ' \\cdot ' +
				t + '^2}{2} = \\frac{' + g + ' \\cdot ' + (t * t) +
				'}{2} = ' + sStd + '$ м.';

			NAtask.setTask({
				text: taskText,
				answers: sStd,
				analys: analys,
				preference: preference,
			});
		}
	}, 1000);
})();
// https://phys-oge.sdamgia.ru/problem?id=29620
// https://phys-oge.sdamgia.ru/problem?id=29718

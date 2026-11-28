(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let t = sl(1, 3, 1);
		let g = 10;
		let v0 = sl(g * t + 5, 45, 5);
		let v = v0 - g * t;

		NAtask.setTask({
			text: 'Тело брошено с поверхности Земли вертикально вверх со скоростью ' +
				'$' + v0 + '$ м/с. Сопротивление воздуха пренебрежимо мало. ' +
				'Определите, какова скорость тела через $' + t + '$ с полёта. Ответ дайте в м/с.',
			answers: v,
			analys: 'Скорость тела при равноускоренном движении определяется по формуле: ' +
				'$$v = v_0 - gt. $$ ' +
				'Подставим значения: ' +
				'$$v = ' + v0 + ' - ' + g + ' \\cdot ' + t + ' = ' + v + ' \\text{ м/с}. $$',
		});
	}, 1000);
})();
// https://github.com/nickkolok/chas-ege/issues/3492
// Открытый банк ФИПИ, ОГЭ физика: https://oge.fipi.ru/bank/questions.php?proj=B24AFED7DE6AB5BC461219556CCA4F9B
//zer00player
// ФИПИ 3E2EF2

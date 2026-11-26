(function() {
	retryWhileError(function() {
		'use strict';
		let key = "77486";
		let preference1 = ['positive_pow', 'negative_pow'];
		let rand1 = getSelectedPreferenceFromList(key, preference1);
		//Знак степени однозначно задаёт тип экстремума: у y = m*x + pow*ln(x+b)
		//производная m + pow/(x+b) имеет ноль только при m*pow < 0,
		//причём при pow > 0 это максимум, а при pow < 0 - минимум.
		//Пары positive_pow+minimum и negative_pow+maximum невозможны.
		let preference2 = rand1 ? ['minimum'] : ['maximum'];
		let preference3 = ['even_power', 'odd_power'];
		let rand2 = getSelectedPreferenceFromList(key, preference2);
		let rand3 = getSelectedPreferenceFromList(key, preference3);

		let pow = sl(2, 30, 2) * [1, -1][rand1] + [0, 1][rand3];
		let [forbidMinY, forbidMaxY] = (preference2[rand2] === 'minimum') ? [0, 1] : [1, 0];
		let b = sl(1,30).pm();
		//Знак линейного коэффициента берём так, чтобы ноль производной попал
		//в область определения x > -b: при pow > 0 нужен m < 0, при pow < 0 — m > 0.
		let m = sl(1,30) * [-1, 1][rand1];
		//Ноль производной m + pow/(x+b) считаем сами. На отрицательных степенях
		//mathjs оставляет в производной несвёрнутое (-6 - 1), nerdamer на нём
		//возвращает [] — и шаблон получал «Искать-то нечего!» при любом m.
		let theExtremum = -pow / m - b;
		genAssertZ1000(theExtremum);

		NAtask.setLocalExtremumTask({
			extremums: ['' + theExtremum],
			expr: [
				'' + m + 'x',
				'ln((x +' + b +')^' + pow + ')',
				'' +  sl(1,30).pm(),
			].joinPlusMinus(),
			authors: ['Николай Авдеев'],
			forbidMinY,
			forbidMaxY,
			preference: [preference1, preference2, preference3],
			domain: x => x > - b
		});
	}, 200);
})();
//77486

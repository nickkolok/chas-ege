(function () {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	retryWhileError(function () {

		let key = '509393';
		let preference = ['two_times', 'three_times', 'four_times'];
		let rand = getSelectedPreferenceFromList(key, preference);

		// k - количество выпадений выбранной стороны
		let k = rand + 2;
		let side = moneta.iz();
		let success = sklonlxkand(side);
		let failure = sklonlxkand(moneta.filter(name => name !== side).iz());
		// Математическое ожидание числа бросков до k успехов равно 2*k
		let answer = 2 * k;

		NAtask.setTask({
			text: `Монету подбрасывают до тех пор, пока ${side} не выпадет ${k} раза (не обязательно подряд). Найдите математическое ожидание числа бросков.`,
			answers: answer,
			analys: `Обозначим за $E_n$ математическое ожидание числа дополнительных бросков, необходимых для получения $${k}$ ${success.rm}, если у нас уже есть $n$ ${success.rm}. Нам нужно найти $E_0$.` +
				`<br/>Если у нас $n$ ${success.rm} ($n < ${k}$), то следующим броском мы с вероятностью $0.5$ получим ${success.ve} (перейдём в состояние $n+1$) или ${failure.ve} (останемся в состоянии $n$).` +
				`<br/>Уравнение: $E_n = 1 + 0.5 \\cdot E_{n+1} + 0.5 \\cdot E_n$.` +
				`<br/>Отсюда: $0.5 \\cdot E_n = 1 + 0.5 \\cdot E_{n+1} \\Rightarrow E_n = 2 + E_{n+1}$.` +
				`<br/>Граничное условие: когда ${success.rm} уже $${k}$, броски не нужны, значит $E_${k} = 0$.` +
				`<br/>Тогда:` +
				`<br/>$E_${k - 1} = 2 + E_${k} = 2$;` +
				`<br/>$E_${k - 2} = 2 + E_${k - 1} = 4$;` +
				`<br/>...` +
				`<br/>$E_0 = 2 \\cdot ${k} = ${answer}$.` +
				`<br/>Ответ: ${answer}.`
		});

		NAtask.modifiers.allDecimalsToStandard(true);
	});
})();
//509393

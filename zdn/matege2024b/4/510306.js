(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let key = '510306';
		let preference = ['boost', 'boostCentripetal'];
		let rand = getSelectedPreferenceFromList(key, preference);
		let the_orderToFind = decor.orderToFind.iz();

		let w = sl(2, 20);
		let R = slKrome([w], 2, 20);

		let answer = w ** 2 * R;

		NAtask.setTask({

			text: ['Ускорение тела (в $\\mbox{м/с}^2$) при равномерном', 'Центростремительное ускорение при'][rand] + ' движении по окружности ' +
				['', '(в $\\mbox{м/с}^2$)'][rand] + ' можно вычислить по формуле $a = \\omega^2R$,' +
				' где $\\omega$ – угловая скорость ' + ['вращения', ''][rand] + ' (в $\\mbox{с}^{-1}$), а $R$ – радиус окружности ' + ['(в метрах)', ''][rand] +
				'. Пользуясь этой формулой, ' + the_orderToFind + ' ' +
				[' $a$ (в $\\mbox{м/с}^2$), если $R = ' + R + '$ м и $\\omega = ' + w + '$ $\\mbox{с}^{-1}$',
				'радиус $R$ (в метрах), если угловая скорость равна $' + w + '$ $\\mbox{с}^{-1}$, а центростремительное ускорение равно $' + answer + '$' +
				'$\\mbox{м/с}^2$. Ответ дайте в метрах'][rand] + '.',
			answers: [answer, R][rand],
			preference: preference,

		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/problem?id=510306

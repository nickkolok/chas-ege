(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let the_orderToFind = decor.orderToFind.iz();

		let w = sl(2, 20);
		let R = slKrome([w], 2, 20);

		let answer = w ** 2 * R;

		NAtask.setTask({

			text: 'Ускорение тела (в $\\mbox{м/с}^2$) при равномерном движении по окружностиможно вычислить по формуле $a = \\omega^2R$,' +
				' где $\\omega$ – угловая скорость вращения (в $\\mbox{с}^{-1}$), а $R$ – радиус окружности (в метрах). Пользуясь этой формулой, ' + the_orderToFind + ' ' +
				' $a$ (в $\\mbox{м/с}^2$), если $R = ' + R + '$ м и $\\omega = ' + w + '$ $\\mbox{с}^{-1}$.',
			answers: answer,

		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/problem?id=510306

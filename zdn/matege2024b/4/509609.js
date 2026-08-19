(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let the_orderToFind = decor.orderToFind.iz();

		let t_2 = sl(100, 900);
		let t_1 = sl(90, t_2 - 9);
		let c = sl(100, 1000, 100);
		let m = sl(2, 20);

		let Q = c * m * (t_2 - t_1);

		NAtask.setTask({

			text: 'Количество теплоты (в джоулях), полученное однородным телом при нагревании, ' +
				'вычисляется по формуле $Q = cm(t_2 - t_1)$, где $c$ – удельная теплоёмкость (в Дж),' +
				' $m$ – масса тела (в килограммах), $t_1$ – начальная температура тела (в кельвинах), а $t_2$' +
				' – конечная температура тела (в кельвинах). Пользуясь этой формулой, ' +
				the_orderToFind + ' $Q$ (в джоулях), если $t_2 = ' + t_2 + '$ К, $c = ' + c + '$ $\\frac{\\mbox{Дж}}{\\mbox{кг} \\cdot \\mbox{К}}$,' +
				' $m = ' + m + '$ кг и $t_1 = ' + t_1 + '$ К.',
			answers: Q,

		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/problem?id=509609

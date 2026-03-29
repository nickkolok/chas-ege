(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let the_orderToFind = decor.orderToFind.iz();

		let h = sl(1, 50, 0.5);
		let v = (2 * 9.8 * h).sqrt()

		genAssertZ1000(v, 'должно быть не более 3 знаков после запятой');

		NAtask.setTask({

			text: 'Скорость камня (в м/с), падающего с высоты $h$ (в м), в момент удара о землю можно найти по формуле $v = \\sqrt{2gh}$. ' +
				the_orderToFind.toZagl() + ' скорость (в м/с), с которой ударится о землю камень, ' +
				'падающий с высоты $' + h + '$ м. ' + 'Считайте, ' +
				'что ускорение свободного падения $g$ равно $9{,}8$ м/с$^2$.',
			answers: v,

		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//zer00player
//https://mathb-ege.sdamgia.ru/test?likes=512712

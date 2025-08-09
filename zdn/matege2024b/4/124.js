(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let number = sl(4, 25);
		let cost = 6000 + 4100 * number;
		let name = ['Родник', 'Исток', 'Ручеёк', 'Рамштайн', 'ДДТ', 'Курочка', 'Камень-и-Ножницы', 'Стальная Красавица', 'Барон Суббота', 'Хозяйка Малахитовой горы'].iz();
		
		NAtask.setTask({
			text:
				'В фирме «' + name + '» стоимость(в рублях) колодца из железобетонных колец рассчитывается по формуле $С = 6000+4100*n$, где $n$ – число колец, ' +
				'установленных при рытье колодца. ' +
				'Пользуясь этой формулой, ' +
				'рассчитайте стоимость колодца из $' + number + '$ колец.',
			answers: cost,
		});
		NAtask.modifiers.allDecimalsToStandard();
	}, 2000);
})();
//https://oge.sdamgia.ru/test?likes=124
//zer00player

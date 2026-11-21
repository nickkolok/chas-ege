(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		'use strict';

		let people = sklonlxkand(['дедушка', 'мама', 'папа', 'бабушка', 'племянница', 'внучка', 'сын', 'племянник',	'внук'].iz());
		let dishes = sklonlxkand(['чашка', 'кружка', 'пиала', 'стакан'].iz());
		let drink = sklonlxkand(['чай', 'компот', 'сок', 'морс', 'кофе', 'молоко', 'кефир', 'ряженка', 'снежок', 'квас'].iz());
		let color = om.trickyColors.iz(2);
		color = color.map(elem => elem.replace('ый','ыми').replace('ой','ыми'));
		let decor = ['цветами', 'крапинками', 'треугольниками', 'узорами', 'полосками'].iz();
		
		let numberOfDishesAll = sl(5, 30);
		let numberOfDishesFirst = sl(1, numberOfDishesAll-1);
		let answ = (numberOfDishesAll - numberOfDishesFirst) / numberOfDishesAll;
		genAssertZ1000(answ);

		NAtask.setTask({
			text: `У ${people.re} ${chislitlx(numberOfDishesAll, dishes.ie, '$')}: $${numberOfDishesFirst}$ с${`о`.esli(color[0][0]=='с')} ${color[0]} ${decor}, остальные с${`о`.esli(color[1][0]=='с')} ${color[1]}. 
			${people.ie.toZagl()} наливает ${drink.ve} в случайно выбранн${['ый','ую','ое'][dishes.rod]} ${dishes.ve}. 
			Найдите вероятность того, что это будет ${dishes.ie} с${`о`.esli(color[1][0]=='с')} ${color[1]} ${decor}.`,
			answers: answ,
			authors: ['Суматохина Александра'],
		});
	}, 100);
})();

//525374: 525396 525419 525440 530494

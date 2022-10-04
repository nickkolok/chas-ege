(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	let pr1, r1, r2, an;
	do {
		pr1 = sluchch(2, 30);
		r1 = sluchch(2, 6);
		r2 = sluchch(r1 + 2, 10);
		an = ((100 - pr1) * r2) / r1 - 100;
	} while ((an < 0) || !an.isZ());

	let things = sklonlxkand(([
		['рубашка', 'куртка', 'футболка', 'шапка', 'платье', 'жилет', 'майка', 'шарф'],
		['примочка', 'пиявка', 'зелье', 'отвар', 'жаба', 'порошок', 'амулет'],
		['плед', 'одеяло', 'подушка', 'простыня', 'пододеяльник', 'матрас', 'дакимакура'],
		['мишка', 'зайка', 'белочка', 'ёжик'],
	]).iz().iz(2));
	NAtask.setTask({
		text: `${chislitlx(r1,things[0].ie)} дешевле ${things[1].re} на ${pr1}\%.` +
		` На сколько процентов таких же ${chislitlx(r2,things[0].ie)} дороже ${things[1].re}?`,
		answers: an,
	});
})();
//Обзад 99567


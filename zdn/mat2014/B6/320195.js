//44. Задание 4 № 320195
//Вероятность того, что новый DVD-проигрыватель в течение года поступит в гарантийный ремонт, равна 0,045.
//В некотором городе из 1000 проданных DVD-проигрывателей в течение года в гарантийную мастерскую поступила 51 штука.
//На сколько отличается частота события «гарантийный ремонт» от его вероятности в этом городе?

(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 0);
	var predm = sklonlxkand(['DVD-проигрыватель', 'ноутбук', 'телевизор', 'монитор', 'холодильник', 'пылесос', 'блендер',
		'принтер', 'сканер', 'шуруповерт', 'насос'
	].iz());
	var period = sklonlxkand(['год', 'месяц'].iz());

	do {
		var ver = sluchch(0.013, 0.089, 0.001);
		var kolvo = sluchch(40, 500);
		var prodano = sluchch(900, 2000);
		var answers = kolvo / prodano - ver;
	} while ((answers * 1000) % 1 !== 0 || kolvo / prodano - ver < 0);

	NAtask.setTask({
		text: 'Вероятность того, что новый ' + predm.ie + ' в течение ' + period.re + ' поступит ' +
			'в гарантийный ремонт, равна ' + ver.ts() + '. В некотором городе из ' + prodano + ' проданных ' + predm.rm + ' ' +
			'в течение ' + period.re + ' в гарантийную мастерскую поступило ' + chislitlx(kolvo, 'штука') +
			'. На сколько отличается частота ' +
			'события «гарантийный ремонт» от его вероятности в этом городе?',
		answers: Math.abs(answers),
	});
})();
//committed by SugarHedgehog, fixed by Диана Белова
//320195 321685 321589 321591 321593 321595 321597 321599 321601 321603 321605 321607 321609 321611 321613 321615 321617 321619 321621 321623 321625 321627 321629 321631 321633 321635 321637 321639 321641 321643 321645 321647 321649 321651 321653 321655 321657 321659 321661 321663 321665 321667 321669 321671 321673 321675 321677 321679 321681 321683 321687 321689

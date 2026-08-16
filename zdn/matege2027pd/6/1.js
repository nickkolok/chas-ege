(function() { 'use strict'; retryWhileError(function() {
	let p = ['100', '1000', '5000', '10 000', '50 000'];
	let c0 = sluchch(300, 900, 100);
	let c1 = sluchch(80, 250, 10);
	let c2 = sluchch(8, 90, 2);
	let c3 = sluchch(2, 15);
	let c4 = sluchch(1, 5);
	let s = (100*c0 + 1000*c1 + 5000*c2 + 10000*c3 + 50000*c4) / 10000;

	let y = ['Выигрыш (в рублях)'].concat(p).tr('th');
	let z = [['Число выигрышных билетов', c0.ts(), c1.ts(), c2.ts(), c3.ts(), c4.ts()].tr()];
	let table = (y + z.soed()).vTabl();

	NAtask.setTask({
		text: `Организаторы лотереи выпустили 10 000 билетов. Выигрыши распределены следующим образом:<br/><br/>${table}Найдите математическое ожидание величины «выигрыш на один билет». Ответ дайте в рублях.`,
		answers: s.ts(),
	});
}, 2000);})();

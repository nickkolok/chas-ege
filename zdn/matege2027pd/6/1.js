(function() { 'use strict'; retryWhileError(function() {
	let prizes = [
		{
			weights: [100, 1000, 5000, 10000, 50000],
			divs: [100, 10, 2, 1, 1],
		},
		{
			weights: [50, 500, 2000, 10000, 50000],
			divs: [200, 20, 5, 1, 1],
		},
		{
			weights: [200, 1000, 5000, 50000, 100000],
			divs: [50, 10, 2, 1, 1],
		},
	].iz();

	let p = prizes.weights.map(w => w.ts());
	let c0 = sluchch(300, 1200, prizes.divs[0]);
	let c1 = sluchch(80, 300, prizes.divs[1]);
	let c2 = sluchch(8, 120, prizes.divs[2]);
	let c3 = sluchch(2, 20, prizes.divs[3]);
	let c4 = sluchch(1, 8, prizes.divs[4]);

	let s = (prizes.weights[0]*c0 + prizes.weights[1]*c1 + prizes.weights[2]*c2 + prizes.weights[3]*c3 + prizes.weights[4]*c4) / 10000;

	let y = ['Выигрыш (в рублях)'].concat(p).tr('th');
	let z = [['Число выигрышных билетов', c0.ts(), c1.ts(), c2.ts(), c3.ts(), c4.ts()].tr()];
	let table = (y + z.soed()).vTabl();

	NAtask.setTask({
		text: `Организаторы лотереи выпустили 10 000 билетов. Выигрыши распределены следующим образом:<br/><br/>${table}Найдите математическое ожидание величины «выигрыш на один билет». Ответ дайте в рублях.`,
		answers: s.ts(),
	});
}, 2000);})();

//
//	10. Потомственный коррупционер Федя Взяткин планирует откосить от армии под
//	углами 4 и 266. Помогите Феде рассчитать сумму, которую нужно попросить у
//	отца, если она выражается формулой |161293 (cos 4°)/(-sin 266°)|
//

(function(){'use strict';
NAinfo.requireApiVersion(0, 0);

var sinorcos=["\\sin","\\cos"].shuffle();

var angle1 = sl(1,89);
var angle2 = 180 * sl(1,5) - angle1;
angle1 = 180 * sl(0,3) + angle1;
var sum = sl(100000, 1000000);

NAtask.setTask({
	text: 'Потомственный коррупционер Федя Взяткин планирует откосить от армии под ' +
		'углами $' + angle1 + '^\\circ$ и $' + angle2 + '^\\circ$. Помогите Феде рассчитать сумму, которую нужно попросить у ' +
		'отца, если она выражается формулой $$\\left|\\frac{' + (''.esli(sl1())) + sum + sinorcos[0] + angle1 + '°}{' +
		(''.esli(sl1())) + sinorcos[1] + angle2 + '°}\\right|$$',
	answers: sum,
});

})();

//
//	Юмористически набор, №10
//	https://bitbucket.org/chas-ege-team/chas-ege/issues/55/
//	hripunov
//  patched  by NickKolok

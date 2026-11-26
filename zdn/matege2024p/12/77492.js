(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	const numerator = sl(1, 7);
	const multiplier = sl(1, 10);
	const direction = (1).pm();
	const a = direction * numerator * multiplier;
	const b = direction * 5 * multiplier;
	const d = sl(-99, 99);
	const answer = numerator / 5;
	const extremum = direction > 0 ? 'максимума' : 'минимума';
	const linear = (b.ts() + 'x+' + (-a).ts()).plusminus();
	const formula = ('(' + linear + ')\\cos x+' + (-b).ts() + '\\sin x+' + d.ts()).plusminus();
	NAtask.setTask({
		text: 'Найдите точку ' + extremum + ' функции $y=' + formula +
			'$, принадлежащую промежутку $(0; \\frac{\\pi}{2})$.',
		answers: answer,
		analys: 'Производная равна $y\'=-(' + linear + ')\\sin x$. На данном промежутке $\\sin x>0$, ' +
			'поэтому производная обращается в нуль только при $x=' + a.texfrac(b) + '$. ' +
			'В этой точке производная меняет знак ' + (direction > 0 ? 'с плюса на минус' : 'с минуса на плюс') +
			', поэтому это искомая точка ' + extremum + '.',
	});
	NAtask.modifiers.allDecimalsToStandard();
})();
// 77492

(function () {
	'use strict';
	retryWhileError(function () {
		NAinfo.requireApiVersion(0, 2);

		let r1 = sl(2, 10, 1);
		let l1 = sl(r1 + 1, 15, 1);
		let r2 = sl(1, 8, 1);
		let l2 = sl(r2 + 1, 12, 1);

		let s1 = r1 * l1;
		let s2 = r2 * l2;

		if (s1 <= s2) throw new Error('s1 must be greater than s2');

		let ratio = s1 / s2;

		let ratioTimes10 = ratio * 10;
		if (Math.abs(ratioTimes10 - Math.round(ratioTimes10)) > 1e-9) throw new Error('Ratio is not nice');

		if (ratio > 10) throw new Error('Ratio too large');

		genAssertZ1000(ratio);

		NAtask.setTask({
			text: `Даны два конуса. Радиус основания и образующая первого конуса равны соответственно $${r1}$ и $${l1}$, а второго — $${r2}$ и $${l2}$. Во сколько раз площадь боковой поверхности первого конуса больше площади боковой поверхности второго?`,
			answers: ratio,
			analys: `Площадь боковой поверхности конуса вычисляется по формуле $S = \\pi r l$, где $r$ — радиус основания, $l$ — образующая. ` +
				`Площадь боковой поверхности первого конуса: $S_1 = \\pi \\cdot ${r1} \\cdot ${l1} = ${s1}\\pi$. ` +
				`Площадь боковой поверхности второго конуса: $S_2 = \\pi \\cdot ${r2} \\cdot ${l2} = ${s2}\\pi$. ` +
				`Найдём отношение площадей: $\\frac{S_1}{S_2} = \\frac{${s1}\\pi}{${s2}\\pi} = \\frac{${s1}}{${s2}} = ${ratio}$.`
		});

		NAtask.modifiers.allDecimalsToStandard();
	}, 1000);
})();
//https://mathb-ege.sdamgia.ru/test?likes=522699

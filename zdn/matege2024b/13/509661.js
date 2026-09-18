(function() {
	retryWhileError(function() {
		'use strict';
		NAinfo.requireApiVersion(0, 2);
		
		let r = sl(2, 15);
		let h = sl(2, 30);
		genAssert((r * r * h) % 3 == 0, 'Объём не является целым числом');
		
		let V = r * r * h / 3;
		
		NAtask.setTask({
			text: `Объём конуса равен $${V}\pi$, а его высота равна $${h}$. Найдите радиус основания конуса.`,
			answers: r,
			authors: ['Селена'],
		});
		NAtask.modifiers.allDecimalsToStandard(true);
	}, 1000);
})();
// https://mathb-ege.sdamgia.ru/problem?id=509661

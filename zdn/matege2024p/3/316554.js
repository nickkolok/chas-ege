(function() {
	'use strict';
	NAinfo.requireApiVersion(0, 2);
	retryWhileError(function() {

		let letters = ['A', 'B', 'C', 'D'];
		let letterWithIndex = letters.map((elem) => elem + '₁');
		let allLet = letters.concat(letterWithIndex);

		let diagonal = sl1();
		let upper = sl1();
		let preference = ['parallel', 'perpendicular', 'inclined'];
		let variant = getSelectedPreferenceFromList('316554', preference);
		let first = [letters[diagonal], letters[diagonal + 2]];
		if (upper) {
			first = first.map(letter => letter + '_1');
		}
		let second;
		if (variant === 0) {
			second = [letters[diagonal], letters[diagonal + 2]];
			if (!upper) {
				second = second.map(letter => letter + '_1');
			}
		} else if (variant === 1) {
			second = [letters[1 - diagonal], letters[3 - diagonal]];
			if (sl1()) {
				second = second.map(letter => letter + '_1');
			}
		} else {
			second = letters.slice().permuteCyclic(sl(1, 4)).slice(0, 2);
			second[sl1()] += '_1';
		}
		let letters1 = first.shuffle().join('');
		let letters2 = second.shuffle().join('');
		let objects = ['прямыми', 'отрезками'].iz();
		let answer = [0, 90, 60][variant];

		let paint1 = function(ctx) {
			ctx.translate(110, 50);
			let edge = 25;
			ctx.scale(10, 10);

			ctx.lineWidth = 0.2;
			ctx.font = "3px liberation_sans";
			ctx.drawParallelepiped({
				width: edge,
				height: edge,
				depth: edge / 2,
				angle: 40,
				scale: 20,
				lettersOnVertex: allLet,
				internalLinesWithDash: [
					[sl(0, 7), sl(0, 7)]
				],
			}, [0, 3, 4], false, [0.4, 0.5]);
		};
		NAtask.setTask({
			text: 'В кубе $ABCDA_1B_1C_1D_1$ найдите угол между ' + objects + ' $' + letters1 + '$ и $' + letters2 +
				'$. Ответ дайте в градусах.',
			answers: answer,
			preference: preference,
			author: ['Суматохина Александра']
		});
		NAtask.modifiers.variativeABC(allLet);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	});
})();
// 316554 316751 316753 316755 316757 316759 316761 316763 316765 316767 316769 316771

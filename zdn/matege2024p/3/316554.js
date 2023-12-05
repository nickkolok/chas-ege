(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let letters = ['A', 'B', 'C', 'D'];
		let letterWithIndex = letters.map((elem) => elem + '₁');
		let allLet = letters.concat(letterWithIndex);

		let letters1 = [
			[letters[0], letters[2]],
			[letters[1], letters[3]]
		].iz();
		if (sl1()) {
			letters1 = letters1.map((elem) => elem + '_1');
		}
		letters1 = letters1.join('');

		let letters2 = letters.slice().permuteCyclic(sl(1, 4)).slice(0, 2);

		letters2 = (sl1()) ? letters2.join('_1') : letters2.join('') + '_1';

		let paint1 = function(ctx) {
			ctx.translate(110, 50);
			let edge = 25;
			ctx.scale(10, 10);

			ctx.lineWidth = 0.2;
			ctx.font = "2.5px liberation_sans";
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
			text: 'В кубе $ABCDA_1B_1C_1D_1$ найдите угол между прямыми $' + letters1 + '$ и $' + letters2 +
				'$. Ответ дайте в градусах.',
			answers: 60,
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

(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let letters = ['A', 'B', 'C', 'D'];
		let letterWithIndex = letters.map((elem) => elem + '₁');

		let subangle = [
			[
				[letters[0], letters[3]],
				[letters[1], letters[2]]
			],
			[letters.slice(0, 2), letters.slice(2, 4)],
		].iz();
		let letters1, letters2;

		letters1 = subangle.shuffle();
		letters2 = letters1.pop();
		letters1 = letters1.pop();

		if (sl1()) {
			letters1 = letters1.map((elem) => elem + '_1');
			letters1 = letters1.join('');
		} else {
			letters1 = letters1.iz();
			letters1 += letters1 + '_1';
		}


		letters2 = (sl1()) ? letters2.join('_1') : letters2.join('') + '_1';


		let paint1 = function(ctx) {
			ctx.translate(110, 50);
			let edge = 25;
			ctx.scale(10, 10);

			ctx.lineWidth = 0.2;
			ctx.drawParallelepiped({
				width: edge,
				height: edge,
				depth: edge / 2,
				angle: 40,
				scale: 20,
				internalLinesWithDash: [
					[sl(0, 7), sl(0, 7)]
				],
			}, [0, 3, 4], false, [0.4, 0.5]);
		};
		NAtask.setTask({
			text: 'В кубе $ABCDA_1B_1C_1D_1$ найдите угол между прямыми $' + letters1 + '$ и $' + letters2 +
				'$. Ответ дайте в градусах.',
			answers: 45,
			author: ['Суматохина Александра']
		});
		NAtask.modifiers.variativeABC(letters);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	});
})();
// 24 По Ширяевой 2024

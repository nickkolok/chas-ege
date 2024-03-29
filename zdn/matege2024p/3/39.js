(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let letters = ['A', 'B', 'C', 'D'];
		let letterWithIndex = letters.map((elem) => elem + '₁');
		let allLet = letters.concat(letterWithIndex);
		let rand = sl1();

		let letters1 = [
			letters.slice(0, 2),
			letters.slice(2, 4)
		].iz();

		if (rand) {
			letters1 = letters1.map((elem) => elem + '_1');
		}
		letters1 = letters1.join('');

		let letters2 = [letters.slice(0, 2),
			letters.slice(2, 4).reverse()
		].iz();
		letters2 = letters2.join('') + '_1';

		let a = sl(1, 20);
		let b = slKrome(a, 1, 20);
		let c = sl(1, 20);

		let question = [
			['косинус', a / (a.pow(2) + c.pow(2)).sqrt()],
			['синус', c / (a.pow(2) + c.pow(2)).sqrt()]
		].iz();

		let answ = question.pop();

		let paint1 = function(ctx) {
			ctx.translate(105, 50);
			let edge = 24;
			ctx.scale(10, 10);
			ctx.font = "2.5px liberation_sans";

			ctx.lineWidth = 0.2;
			ctx.drawParallelepiped({
				width: edge * 1.1,
				height: edge * 0.9,
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
			text: 'В прямоугольном параллелепипеде $ABCDA_1B_1C_1D_1$ известны длины рёбер: $AB=' + a + '$, $AD=' + b +
				'$, $AA_1=' + c + '$. ' +
				'Найдите ' + question + ' угла между прямыми $' + letters1 + '$ и $' + letters2 + '$.',
			answers: answ,
			author: ['Суматохина Александра'],
		});
		NAtask.modifiers.variativeABC(allLet);
		NAtask.modifiers.multiplyAnswerBySqrt(13);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	});
})();
// 39 по Ширяевой 2024

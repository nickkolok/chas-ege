(function() {
	lx_declareClarifiedPhrase('площадь', 'большей боковой грани');
	lx_declareClarifiedPhrase('ребро', 'боковое');
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let a = sl(1, 20);
		let b = slKrome(a, 1, 20);
		let h = sl(1, 20);
		let question = [
			[
				['объём', a * b * h / 2],
				['площадь большей боковой грани', (a.pow(2) + b.pow(2)).sqrt() * h]
			].iz(), [
				['боковое ребро', 'высота'].iz(), h
			]
		].shuffle();

		let number = question.T()[1];
		genAssertZ1000(number[0]);

		question = sklonlxkand(question.T()[0]);

		let paint1 = function(ctx) {
			ctx.translate(110, 10);
			let edge = 30;
			ctx.scale(10, 10);
			ctx.lineWidth = 0.2;
			ctx.drawPrism({
				width: edge,
				height: edge * 0.8,
				depth: edge * 0.9,
				angle: Math.PI / 1.8,
				scale: 20,
			}, [0, 3, 4], [0.4, 0.5]);
		};


		NAtask.setTask({
			text: 'Основанием прямой треугольной призмы является прямоугольный треугольник с катетамии $' + a + '$ и $' + b +
				'$, а ' + question[0].ie + ' призмы рав' + ['ен', 'на', 'но'][question[0].rod] + ' $' + number[0].ts() +
				'$. Найдите ' +
				question[1].ve + ' призмы.',
			answers: number[1],
			analys: '',
		});
		NAtask.modifiers.multiplyAnswerBySqrt(13);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	});
})();
// 27082 73641 73663 73703 641915 73643 73645 73647 73649 73651 73653 73655 73657 73659 73661 73665 73667 73669 73671 73673 73675 73677 73679 73681 73683 73685 73687 73689 73691 73693 73695 73697 73699 73701

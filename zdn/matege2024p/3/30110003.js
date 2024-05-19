(function() {
	retryWhileError(function() {
		lx_declareClarifiedPhrase('сторона', 'основания');
		NAinfo.requireApiVersion(0, 2);
		let letters = ['A', 'B', 'C', 'D', 'S', 'O'];
		let a = sl(2, 20, 2);
		let h = slKrome(a, 1, 20);
		let b = (a * (2).sqrt() / 2).pow(2) + h.pow(2);

		let question = [
			[sklonlxkand('боковое ребро'), b.texsqrt(sl1())],
			[sklonlxkand('объём'), (a * a * h).texrndfrac(3)],
			[sklonlxkand('сторона основания'), a],
		];

		let answ = Number.isInteger(question[2][1]) ? question[2][1] : b.sqrt();

		let paint1 = function(ctx) {
			ctx.font = "3px liberation_sans";
			ctx.translate(0, 500);
			ctx.scale(10, 10);
			ctx.lineWidth = 2 / 15;
			ctx.drawRightPyramid4({
				edge: 21,
				angle: Math.PI / 4,
				height: -23,
				scale: 10,
				lettersOnVertex: letters,
			}, [0, 2, 5], [1, 0.5], true);
		};

		NAtask.setTask({
			text: 'В правильной четырёхугольной пирамиде $SABCD$ с ' +
				'основанием $ABCD$ ' + question[0][0].ie + ' рав' + ['ен', 'на', 'но'][question[0][0].rod] + ' $' + question[0][1] + '$, ' +
				question[1][0].ie + ' рав' + ['ен', 'на', 'но'][question[1][0].rod] + ' $' + question[1][1] + '$' +
				'. Найдите ' + question[2][0].ve + ' пирамиды.',
			answers: answ,
			author: ['Суматохина Александра'],
		});
		NAtask.modifiers.multiplyAnswerBySqrt(13);
		NAtask.modifiers.variativeABC(letters);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	});
})();
//https://ege314.ru/8-stereometriya-ege/reshenie-3011/
//3011

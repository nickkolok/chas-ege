(function() {
	retryWhileError(function() {
		lx_declareClarifiedPhrase('ребро', 'боковое');
		lx_declareClarifiedPhrase('сторона', 'основания');
		NAinfo.requireApiVersion(0, 2);
		let a = sl(2, 20, 2);
		let h = slKrome(a, 1, 20);
		let b = 0.5 * a.pow(2) + h.pow(2);
		let ap = (0.5 * a).pow(2) + h.pow(2);

		let question = [
            [sklonlxkand('высота'), h],
			[sklonlxkand('боковое ребро'), b.texsqrt(sl1())],
			[sklonlxkand('сторона основания'), a],
		];

		let answ;
		switch (question[2][0].ie) {
		case 'апофема':
			answ = ap.sqrt();
			break;
		case 'боковое ребро':
			answ = b.sqrt();
			break;
		default:
			answ = question[2][1];
		}

		let paint1 = function(ctx) {
			ctx.translate(0, 500);
			ctx.scale(10, 10);
			ctx.lineWidth = 2 / 15;
			ctx.drawRightPyramid4({
				edge: 21,
				angle: Math.PI / 4,
				height: -23,
				scale: 10,
			}, [0, 2, 5], [1, 0.5], true);
		};

		NAtask.setTask({
			text: 'В правильной четырёхугольной пирамиде ' +
				question[0][0].ie + ' рав' + ['ен', 'на', 'но'][question[0][0].rod] + ' $' + question[0][1] + '$, а ' +
				question[1][0].ie + ' рав' + ['ен', 'на', 'но'][question[1][0].rod] + ' $' + question[1][1] + '$. ' +
				'Найдите ' + question[2][0].ve + ' пирамиды.',
			answers: answ,
			author: ['Суматохина Александра'],
		});
		NAtask.modifiers.multiplyAnswerBySqrt(13);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	});
})();
//https://ege314.ru/8-stereometriya-ege/reshenie-168/
//168

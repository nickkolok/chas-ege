(function() {
	retryWhileError(function() {
		lx_declareClarifiedPhrase('сторона', 'основания');
		NAinfo.requireApiVersion(0, 2);
		let a = sl(2, 20, 2);
		let h = slKrome(a, 1, 20);

		let question = [
			[sklonlxkand('сторона основания'), a],
			[sklonlxkand('высота'), h],
			[sklonlxkand('объём'), (a * a * h).texrndfrac(3)],
		];

		genAssertZ1000(question[2][1]);

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
			answers: question[2][1],
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
// 27109 74849 74855 74887 510065 74851 74853 74857 74859 74861 74863 74865 74867 74869 74871 74873 74875 74877 74879 74881 74883 74885 74889 74891

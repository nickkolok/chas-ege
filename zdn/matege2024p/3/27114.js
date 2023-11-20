(function() {
	retryWhileError(function() {
		let letters = ['A', 'B', 'C', 'D', 'S', 'E'];

		let v = sl(1, 400);

		let paint1 = function(ctx) {
			ctx.translate(0, 500);
			ctx.scale(10, 10);
			ctx.font = "3px liberation_sans";

			ctx.lineWidth = 2 / 15;

			ctx.drawRightPyramid3({
				edge: 21,
				angle: Math.PI / 4,
				height: -15.4,
				scale: 10,
				strokeStyle: om.primaryBrandColors.iz(),
				lettersOnVertex: ['', '', ''].concat(letters[5]),
			}, [0, 2, 4], [1, 0.7]);

			ctx.drawRightPyramid4({
				edge: 21,
				angle: Math.PI / 4,
				height: -23,
				scale: 10,
				lettersOnVertex: letters.slice(0, 5),
			}, [0, 2, 5], [1, 0.7]);
		};

		NAtask.setTask({
			text: 'Объём правильной четырёхугольной пирамиды $SABCD$ равен $' + v + '$. ' +
				'Точка $E$ – середина ребра $SA$. Найдите объём треугольной пирамиды $EABD$.',
			answers: v / 4,
			author: ['Суматохина Александра'],
		});
		NAtask.modifiers.variativeABC(letters);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	});
})();
//27114 75015 75063 519535 75017 75019 75021 75023 75025 75027 75029 75031 75033 75035 75037 75039 75041 75043 75045 75047 75049 75051 75053 75055 75057 75059 75061

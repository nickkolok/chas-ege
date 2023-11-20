(function() {
	retryWhileError(function() {

		let a = sl(2, 20);
		let v = a.pow(3) / (8 * 3 * (2).sqrt());
		let s = 0.5 * a * (a ^ 2 - (a / 2) ^ 2).sqrt();
		let h = 0.5 * a / (2).sqrt();

		let question = [
			['объём', v],
			['площадь боковой поверхности', s],
			['высоту', h]
		].iz();

		let paint1 = function(ctx) {
			ctx.translate(0, 500);
			ctx.scale(10, 10);
			ctx.lineWidth = 2 / 15;
			ctx.drawRightPyramid4({
				edge: 21,
				angle: Math.PI / 4,
				height: -23,
				scale: 10,
			}, [0, 2, 5], [1, 0.7]);

			ctx.translate(9, -20.5);
			ctx.lineWidth = 3 / 15;
			ctx.drawRightPyramid4({
				edge: 21 / 2,
				angle: Math.PI / 4,
				height: -23 / 2,
				scale: 10,
				strokeStyle: om.primaryBrandColors.iz(),
			}, [0, 2, 5], [1, 0.7]);
		};

		NAtask.setTask({
			text: 'В правильной четырёхугольной пирамиде все рёбра равны $' + a + '$. ' +
				'Найдите ' + question[0] + ' пирамиды, отсечённой плоскостью, проходящей через середины боковых рёбер.',
			answers: question[1],
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
//324450001

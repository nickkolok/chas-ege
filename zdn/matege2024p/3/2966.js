(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let a = sl(1, 10);
		let b = sl(1, 10);
		let c = sl(1, 10);

		let find = [
			['длину диагонали '+['$AC_1$','параллелепипеда'].iz(), (a.pow(2) + b.pow(2) + c.pow(2)).sqrt()],
			['объём параллелепипеда', a * b * c],
			['площадь полной поверхности параллелепипеда', 2 * (a * b + a * c + b * c)]
		].iz();
		let answ = find.pop();
		
		let paint1 = function(ctx) {
		ctx.translate(110, 50);
		let edge = 17;
		ctx.scale(10, 10);

		ctx.font = "3px liberation_sans";
		ctx.lineWidth = 0.2;
		ctx.drawParallelepiped({
			width: edge * 1.6,
			height: edge * 1.3,
			depth: edge / 1.5,
			angle: Math.PI / 1.1,
			scale: 20,
		}, [0, 3, 4], find[0].includes('диагонали'), [0.4, 0.5]);
	};

		NAtask.setTask({
			text: 'В прямоугольном параллелепипеде $ABCDA_1B_1C_1D_1$ известно, что ' + 
            ['$DD_1=' + a + '$', '$C_1D_1=' + b + '$', '$B_1C_1=' + c + '$' ].shuffleJoin(', ') +
			'. Найдите ' + find.iz() + '.',
			answers: answ,
		});
		NAtask.modifiers.multiplyAnswerBySqrt(13);
		NAtask.modifiers.variativeABC();
		NAtask.modifiers.addCanvasIllustration({
		width: 400,
		height: 400,
		paint: paint1,
	});
	});
	
})();
//2966
//https://ege314.ru/8-stereometriya-ege/reshenie-2966/

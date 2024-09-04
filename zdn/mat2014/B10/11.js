(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let width = sl(5, 15);
		let height = sl(5, 12);
		let depth = sl(5, 10);
		let diagonal = (width.pow(2) + height.pow(2) + depth.pow(2));
		let question = [
			['площадь основания', (depth * width).pow(2)],
			['площадь полной поверхности', (2 * (width * height + width * depth + height * depth)).pow(2)],
			['объём', (width * height * depth).pow(2)],
			['диагональ', diagonal]
		].iz();

		let paint1 = function(ct) {
			ct.translate(110, 80);
			let scale = 18;
			ct.font = "20px serif";
			if (width * height * depth > 450) {
				ct.scale(15, 15);
				ct.lineWidth = 2 / 15;
			} else {
				ct.scale(20, 20);
				scale = 20;
				ct.lineWidth = 0.1;
			}

			ct.drawParallelepiped({
				width: width,
				height: height,
				depth: depth,
				angle: 40,
				strokeStyle: "#809DF2",
				diagonalStrokeStyle: ["#D777F2", "#F2A2D6"].iz(),
				lengthOfEdge: true,
				scale: scale,
			}, [0, 3, 4], question.includes('диагональ'), [0.5, 0.2]);

		};

		NAtask.setTask({
			text: 'Найдите ' + question[0] + ' параллелепипеда, изображённого на рисунке.',
			answers: question[1].sqrt(),
			authors: ['Александра Суматохина', '_zevs'],
		});
		NAtask.modifiers.multiplyAnswerBySqrt(21, sl1());
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	});

})();
//by _zevs
//refactoring by SugarHedgehog 
//original

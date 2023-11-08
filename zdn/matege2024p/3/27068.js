(function() {
	retryWhileError(function() {
		lx_declareClarifiedPhrase('площадь', 'боковой поверхности');
		NAinfo.requireApiVersion(0, 2);
		let question = [
			['площадь боковой поверхности', 0.5],
			['объём', 0.25]
		].iz();
		let ratio = question.pop();
		question = sklonlxkand(question[0]);
		let rand = sl1();
		let number = sl(5, 100);
		let answ = !rand ? number * ratio : number / ratio;

		let paint1 = function(ctx) {
			ctx.translate(110, 50);
			let edge = 26;
			ctx.scale(10, 10);
			ctx.lineWidth = 0.2;
			ctx.font = "3px liberation_sans";
			ctx.drawPrism({
				width: edge,
				height: edge * 0.8,
				depth: edge * 0.8,
				angle: Math.PI / 1.7,
				scale: 10,
			}, [0, 3, 4], [0.4, 0.5]);
			ctx.drawPrism({
				width: edge / 2,
				height: edge * 0.8,
				depth: edge * 0.8 / 2,
				angle: Math.PI / 1.7,
				scale: 10,
				strokeStyle: om.primaryBrandColors.iz(),
			}, [0, 3, 4, 5, 6, 8], [0.4, 0.5]);
		};


		NAtask.setTask({
			text: 'Через среднюю линию основания треугольной призмы проведена плоскость, параллельная боковому ребру. ' +
				question.ie.toZagl() +
				' отсечённой'.esli(rand) + ' призмы рав' + ['ен', 'на'][question.rod] + ' ' + number +
				'. Найдите объём ' + ['отсечённой', 'исходной'][rand] + ' треугольной призмы.',
			answers: answ,
			analys: '',
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	});
})();
//27068 73157 509838 73111 73113 73115 73117 73119 73121 73123 73125 73127 73129 73131 73133 73135 73137 73139 73141 73143 73145 73147 73149 73151 73153 73155

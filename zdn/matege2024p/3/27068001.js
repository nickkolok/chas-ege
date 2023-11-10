(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let rand = sl1();
		let question = ['призмы, у которой в основании трапеция', [
			['исходной', 4 / 3],
			['отсечённой', 1 / 3]
		].iz()];
		let ratio = question[1].pop();
		question[1]+=' призмы';

		console.log(question);

		let number = sl(5, 100);
		let answ = !rand ? number * ratio : number / ratio;
		
			genAssertZ1000(answ);

		if (!rand) question = question.reverse();


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
			text: 'Через среднюю линию основания треугольной ' +
				'призмы проведена плоскость, параллельная боковому ребру. Найдите объём ' + question[0] + ', если объём ' +
				question[1] + ' равен ' + number+'.',
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
//27068001

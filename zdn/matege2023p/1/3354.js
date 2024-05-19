(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let angle = sl(2, 89);

		let vertices = [];
		do {
			let a = slLetter(vertices).toUpperCase();
			if (!vertices.includes(a))
				vertices.push(a);
		}
		while (vertices.length < 4);

		let copyVertices = vertices.slice(0, 4);
		if (sl1()) {
			copyVertices = copyVertices.reverse();
		}

		let numbers = [
			[0, 2, 3],
			[1, 0, 2],
			[2, 0, 3],
			[1, 2, 0]
		].iz();
		//не придумала ничего умнее, чем просто перечислить спрашиваемые вершины
		let letters = numbers.map((elem) => vertices[elem]);

		if (sl1()) {
			letters = letters.reverse();
		}

		let subangle = [vertices[0],
			[vertices[1], vertices[3]].iz(), vertices[2]
		];

		if (sl1()) {
			subangle = subangle.reverse();
		}

		let paint1 = function(ctx) {
			ctx.lineWidth = 2;
			ctx.strokeStyle = "#809DF2";

			ctx.drawLine(100, 80, 350, 80);
			ctx.drawLine(10, 320, 270, 320);
			ctx.drawLine(100, 80, 10, 320);
			ctx.drawLine(270, 320, 350, 80);

			ctx.strokeStyle = ["#D777F2","#F2A2D6"].iz();

			ctx.drawLine(100, 80, 270, 320);

			ctx.font = "23px liberation_sans";
			ctx.fillText(vertices[0], 100, 80 - 10);
			ctx.fillText(vertices[1], 350, 80 - 10);
			ctx.fillText(vertices[2], 270, 320 + 20);
			ctx.fillText(vertices[3], 10, 320 + 20);

		};

		NAtask.setTask({
			text: 'В ромбе $' + copyVertices.permuteCyclic(sl(1, 3)).join('') + '$ угол $' + subangle.join('') +
				'$ равен $' + angle + '^\\circ$. Найдите ' +
				'угол $' + letters.join('') + '$. Ответ дайте в градусах',
			answers: 0.5 * (180 - angle),
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//3354(вообще неизвестно, что у него за номер)

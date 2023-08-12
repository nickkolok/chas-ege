(function() {
	lx_declareClarifiedPhrase('площадь', 'поверхности');
	lx_declareClarifiedPhrase('квадрат', 'диагонали');
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		let cubeEdge = sl(2, 10);

		let nameCube = [
			['ребро', cubeEdge],
			['площадь поверхности', 6 * cubeEdge.pow(2)],
			['объём', cubeEdge.pow(3)],
			['квадрат диагонали', cubeEdge.pow(2) * 3],
			['диагональ', cubeEdge, 'Ответ поделите на $\\sqrt{3}$.']
		].iz();
		let nameSphere = [
			['радиус', cubeEdge / 2],
			['площадь поверхности', cubeEdge.pow(2), ', делённую на $\\pi$', '$\\pi$'],
			['объём', 4 * (cubeEdge / 2).pow(3) / 3, ', делённый на $\\pi$', '$\\pi$'],
			['диаметр', cubeEdge]
		].iz();

		genAssert((nameSphere[1] * 100).isZ(), 'кривой ответ');

		let paint1 = function(ct) {
			ct.lineWidth = 2;
			ct.translate(100, 40);
			ct.scale = (100, 100);
			ct.fillStyle = "black";
			let cubeEdge = 400;
			ct.drawParallelepiped({
				strokeStyle: "#809DF2",
				width: cubeEdge / 1.5,
				height: cubeEdge / 1.5,
				depth: cubeEdge / (2.5 * 1.5),
				angle: 40
			}, [0, 3, 4], false, [4, 5]);

			ct.translate(0, 80);
			ct.beginPath();
			ct.setLineDash([4, 5]);
			ct.strokeStyle = ["#D777F2", "#F2A2D6"].iz();
			ct.arc(100, 80, 150, 0, 2 * Math.PI);
			ct.ellipse(100, 80, 150, 30, 0, 0, 2 * Math.PI);
			ct.stroke();
		};
		let question = [
			['В куб с ' + sklonlxkand(nameCube[0]).te + ' $' + nameCube[1] + '$ вписан шар. Найдите ' + sklonlxkand(
				nameSphere[0]).ve + ' этого шара' + (nameSphere[2] || '') + '.', nameSphere[1]],
			['Прямоугольный параллелепипед описан около сферы c ' + sklonlxkand(nameSphere[0]).te + ' $' + nameSphere[1] +
				'$' + (nameSphere[3] || '') + '. Найдите его ' +
				sklonlxkand(nameCube[0]).ve + '. ' + (nameCube[2] || ''), nameCube[1]
			]
		].iz();

		NAtask.setTask({
			text: question[0],
			answers: question[1],
		});
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);

})();
//4883,27043

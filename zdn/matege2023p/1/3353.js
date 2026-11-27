(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);
		
		let vertices = latbukv.slice(0, 4);
		let rand = sl1();

		let rhombus = new Rhombus({
			length: sl(1, 50),
			angles: {
				angle: { angleA: slKrome(90, 30, 150) },
				angleInDegree: true,
			},
		});

		const diagonalPairs = [[0, 2], [1, 3]];
		rhombus.connectVerticesInConnectionMatrix([diagonalPairs[rand]]);

		let oppositeVertices = diagonalPairs.map(pair => pair.map(i => vertices[i]));
		let angleQ = [oppositeVertices[rand].shuffleJoin() + oppositeVertices[1 - rand].iz(), [rhombus.angleAInDegrees, rhombus.angleBInDegrees][rand] / 2];
		angleQ[0] = sl1() ? angleQ[0] : angleQ[0].reverse();
		
		let points = autoScale(rhombus.rotate(rhombus.angleAInRadians / 2).vertices, undefined, [], {startX: -160, finishX: 160});

		let paint1 = function(ctx) {

			ctx.translateToCenter();
			ctx.scale(1, -1);
			ctx.strokeStyle = om.secondaryBrandColors.iz();
			ctx.lineWidth = 2;
			ctx.drawFigure(points, rhombus.connectionMatrix);
			
			ctx.scale(1, -1);
			ctx.font = '20px liberation_sans';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			const center = {x: points.map(point => point.x).sum() / points.length, y: -points.map(point => point.y).sum() / points.length};
			points.forEach((point, i) => {
				const label = labelPositionAwayFrom({x: point.x, y: -point.y}, center, 18);
				ctx.fillText(vertices[i], label.x, label.y);
			});
			
		};

		NAtask.setTask({
			text: `В ромбе $ABCD$ угол $${[vertices.slice(0, 3), vertices.slice(1, 4)][rand].randomReverse().join('')}$ равен $${[rhombus.angleBInDegrees, rhombus.angleAInDegrees][rand]}^\\circ$. Найдите угол $${angleQ[0]}$. Ответ дайте в градусах.`,
			answers: angleQ[1],
		});
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 1000);
})();
//3353

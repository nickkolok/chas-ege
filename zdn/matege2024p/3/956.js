(function() {
	retryWhileError(function() {
		NAinfo.requireApiVersion(0, 2);

		let side = sl(1, 50);

		let prism = new RegularPrism({
			height: side,
			baseSide: side,
			numberSide: 3
		});
		let letter = ['A', 'B', 'C', 'C₁', 'A₁', 'B₁', ];
		let letterTex = ['A', 'B', 'C'];
		let strok = [5, 4];

		let height = [letterTex.iz()];
		height.push(height[0]+'_1');
		
		let diagonal = letterTex.shuffle().iz(2);
		diagonal[0]+='_1';
		
		let matrixPrism = [
			[1],
			[strok, strok],
			[0, 0, strok],
			[1, 0, 0, 1],
			[0, 1, 0, 1, 1]
		];

		let camera = {
			x: 0,
			y: 0,
			z: 0,
			scale: 1,

			rotationX: -Math.PI / 2 + Math.PI / 14,
			rotationY: 0,
			rotationZ: Math.PI /sl(3,20,0.1) ,
		};
		
		let point2DPar = prism.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));

		autoScale(prism, camera, point2DPar, {
			startX: -180,
			finishX: 160,
			startY: -160,
			finishY: 160,
			maxScale: 100,
			step : 0.1,
		});

		point2DPar = prism.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));

		let paint1 = function(ctx) {
			let h = 400;
			let w = 400;
			ctx.translate(h / 2, w / 2);
			ctx.lineWidth = 2;
			ctx.strokeStyle = om.primaryBrandColors[0];
			ctx.strokeStyle = om.secondaryBrandColors;
			ctx.drawFigure(point2DPar, matrixPrism);
			ctx.font = "25px liberation_sans";

			point2DPar.forEach((elem, i) => ctx.fillText(letter[i], elem.x, elem.y + ((i < point2DPar.length / 2) ? 15 : -10)));
		};


		NAtask.setTask({
			text: 'В правильной треугольной призме $ABCA_1B_1C_1$, все рёбра которой равны $' + prism.baseSide +
				'$, найдите угол между прямыми $' + [height.shuffleJoin(), diagonal.shuffleJoin()].shuffleJoin('$ и $') + '$.',
			answers: 45,
			analys: '',
		});
		NAtask.modifiers.variativeABC(letter);
		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	});
})();
//https://ege314.ru/8-stereometriya-ege/reshenie-956/

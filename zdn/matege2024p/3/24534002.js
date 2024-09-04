(function() {
	retryWhileError(function() {

		let v1 = 1;
		let v2 = 0;

		let prism = new RegularPrism({
			height: sl(10, 30),
			baseSide: sl(10, 50),
			numberSide: 3
		});

		let pyr = new Pyramid({
			height: prism.height,
			baseArea: prism.baseArea.ceil(),
		});

		let letter = ['A', 'B', 'C', 'C₁', 'A₁', 'B₁', ];
		let strok = [5, 4];

		let matrixPrism = [
			[1],
			[strok, strok],
			[
				[strok, 0][v1],
				[strok, 0][v1], strok
			],
			[1, 0, [strok, 0][1 - v1], 1],
			[0, 1, [strok, 0][1 - v1], 1, 1]
		];

		let vert = [
			['A', 'B', 'C'],
			['A_1', 'B_1', 'C_1']
		];
		vert = (v1) ? vert.reverse() : vert;
		vert = vert[0].concat(['C_1', 'C'][v1]);

		let camera = {
			x: 0,
			y: 0,
			z: 0,
			scale: 5,

			rotationX: -Math.PI / 2 + Math.PI / 14,
			rotationY: 0,
			rotationZ: Math.PI / 4,
		};

		let point2DPar = prism.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));

		autoScale(prism.verticesOfFigure, camera, point2DPar, {
			startX: -180,
			finishX: 160,
			startY: -160,
			finishY: 160,
			maxScale: 50,
		});

		point2DPar = prism.verticesOfFigure.map((coord3D) => project3DTo2D(coord3D, camera));
		if (v1)
			genAssert((point2DPar[3].y - point2DPar[2].y).abs() > 20, 'Сечение не видно');

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

		NAinfo.requireApiVersion(0, 2);
		NAtask.setTask({
			text: ['Найдите ', 'Дана пирамида $' + vert.shuffleJoin('') + '$, площадь основания которой равна $' +
				pyr.baseArea + '$, а высота, проведённая к этому основанию, равна $' + pyr.height + '$. Найдите '
			][v2],
			questions: [{
				text: 'объём',
				answers: [pyr.volume, pyr.volume * 3][v2],
			}, ],
			postquestion: [' многогранника, ' +
				'вершинами которого являются вершины $' + vert.shuffleJoin(', ') +
				'$ правильной треугольной призмы ' +
				'$ABCA_1B_1C_1$, площадь основания которой равна $' + pyr.baseArea + '$, а боковое ребро равно $' + prism.height +
				'$', ' прямой призмы с вершинами $' + ['A', 'B', 'C', 'A_1', 'B_1', 'C_1'].shuffleJoin(', ') + '$'
			][v2] + '.',
			analys: '',
			author: ['Суматохина Александра']
		});
		NAtask.modifiers.allDecimalsToStandard(true);
		NAtask.modifiers.assertSaneDecimals();
		NAtask.modifiers.variativeABC(letter);

		NAtask.modifiers.addCanvasIllustration({
			width: 400,
			height: 400,
			paint: paint1,
		});
	}, 100000);
})();
/*
Решу ЕГЭ
245340 266513 266741 501705 501747 501980 519509 266515 266517 266519 266521 266523 266525 266527 266529 266531 266533 266535 266537 266539 266541 266543 266545 266547 266549 266551 266553 266555 266557 266559 266561 266563 266565 266567 266569 266571 266573 266575 266577 266579 266581 266583 266585 266587 266589 266591 266593 266595 266597 266599 266601 266603 266605 266607 266609 266611 266613 266615 266617 266619 266621 266623 266625 266627 266629 266631 266633 266635 266637 266639 266641 266643 266645 266647 266649 266651 266653 266655 266657 266659 266661 266663 266665 266667 266669 266671 266673 266675 266677 266679 266681 266683 266685 266687 266689 266691 266693 266695 266697 266699 266701 266703 266705 266707 266709 266711 266713 266715 266717 266719 266721 266723 266725 266727 266729 266731 266733 266735 266737 266739 266743 266745
*/

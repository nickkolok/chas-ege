(function() {
	retryWhileError(function() {

		let v = 0;

		let prism = new RegularPrism({
			height: sl(10, 100),
			baseSide: sl(15, 100) ,
			numberSide: 6
		});

		let pyr = new Pyramid({
			height: prism.height,
			baseArea: prism.baseArea,
		});

		let letter = ['A', 'B', 'C', 'D', 'E', 'F', 'F₁', 'A₁', 'B₁', 'C₁', 'D₁', 'E₁', ];
		let strok = [5, 4];

		let matrixPrism = [
			[1],
			[0, 1],
			[0, 0, strok],
			[0, 0, 0, strok],
			[1, 0, 0, 0, strok],
			[0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 1],
			[0, 1, 0, 0, 0, 0, 0, 1],
			[0, 0, 1, 0, 0, 0, 0, 0, 1],
			[0, 0, 0, strok, 0, 0, 0, 0, 0, 1],
			[0, 0, 0, 0, strok, 0, 1, 0, 0, 0, 1],
		];

		let vert = [['A', 'B', 'C', 'D', 'E', 'F'],
		['A_1', 'B_1', 'C_1', 'D_1', 'E_1', 'F_1'],
		];
		vert = sl1()?vert.reverse():vert;
		vert = vert[0].concat(vert[1].iz());

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
			text: ['Найдите ', 'Дана шестиугольная пирамида $' + vert.join('') + '$, площадь основания которой равна $' +
				pyr.baseArea.pow(2).texsqrt(1) + '$, а высота, проведённая к этому основанию, равна $' + pyr.height + '$. Найдите '
			][v],
			questions: [{
				text: 'объём',
				answers: [pyr.volume, prism.volume][v],
			}, ],
			postquestion: [' многогранника, ' +
				'вершинами которого являются вершины $' + vert.shuffleJoin(', ') +
				'$ правильной шестиугольной призмы ' +
				'$ABCDFEA_1B_1C_1D_1F_1E_1$, площадь основания которой равна $' + prism.baseArea.pow(2).texsqrt(1) +
				'$, а боковое ребро равно $' +	prism.height +
				'$', ' прямой призмы с вершинами $' + ['A', 'B', 'C', 'D', 'E', 'F', 'A_1', 'B_1', 'C_1', 'D_1', 'E_1', 'F_1']
				.shuffleJoin(', ') + '$'
			][v] + '.',
			analys: '',
			author: ['Суматохина Александра']
		});
		NAtask.modifiers.multiplyAnswerBySqrt(12);
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
 245343 267215 501685 501940 267217 267219 267221 267223 267225 267227 267229 267231 267233 267235 267237 267239 267241 267243 267245 267247 267249 267251 267253 267255 267257 267259 267261 267263 267265 267267 267269 267271 267273 267275 267277 267279 267281 267283 267285 267287 267289 267291 267293 267295 267297 267299 267301 267303 267305 267307 267309 267311 267313 267315 267317 267319 267321 267323 267325 267327 267329 267331 267333 267335 267337 267339 267341 267343 267345 267347 267349 267351 267353 267355 267357 267359 267361 267363 267365 267367 267369 267371 267373 267375 267377 267379 267381 267383 267385 267387 267389 267391 267393 267395 267397 267399 267401 267403 267405 267407 267409 267411 267413 267415 267417 267419 267421 267423 267425 267427 267429 267431 267433 267435 267437 267439 267441 267443 267445 267447 267449 267451 267453 267455 267457 267459 267461 267463 267465 267467 267469 267471 267473 267475 267477 267479 267481 267483 267485 267487 267489 267491 267493 267495 267497 267499 267501 267503 267505 267507 267509 267511 267513 267515 267517 267519 267521 267523 267525 267527 267529 267531 267533 267535 267537 267539 267541 267543 267545 267547 267549 267551 267553 267555 267557 267559 267561 267563 267565 267567 267569 267571 267573 267575 267577 267579 267581 267583 267585 267587 267589 267591 267593 267595 267597 267599 267601 267603 267605 267607 267609 267611 267613 267615 267617 267619 267621 267623 267625 267627 267629 267631 267633 267635 267637 267639 267641 267643 267645 267647 267649 267651 267653 267655 267657 267659 267661 267663 267665 267667 267669 267671 267673 267675 267677 267679 267681 501725 
*/

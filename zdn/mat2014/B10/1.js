retryWhileError(function() {
	let letters = window.latbukv.iz(4);
	let edges = generateMatrix(1, 3, 1, 20).iz();
	let lettersWithIndexLatex = letters.map(elem => elem + '_{1}');

	let index = sl(0, 3);

	let edgeNames = [
		[letters.slice(0, 2), letters.slice(2, 4)].iz(), //глубина
		[letters.slice().permuteCyclic(1).slice(0, 2), //ширина
			letters.slice(1, 3)
		].iz(), [letters[index], letters[index] + '_{1}'].shuffle(), //высота
	];
	if (sl1()) {
		edgeNames[0] = edgeNames[0].map((elem) => elem + '_{1}');
	}
	if (sl1()) {
		edgeNames[1] = edgeNames[1].map((elem) => elem + '_{1}');
	}

	edgeNames = edgeNames.map((elem, index) => '$' + elem.shuffleJoin() + '=' + edges[index] + '$');

	let letterWithIndex = letters.map((elem) => elem + '₁');

	let vertexForCross = [
		[
			[2, 5, 4, 3],
			edges[0].pow(2) * (edges[1].pow(2) + edges[2].pow(2))
		],
		[
			[
				[0, 2, 6, 4],
				[1, 3, 7, 5]
			].iz(), edges[1].pow(2) * (edges[0].pow(2) + edges[2].pow(2))
		],
		[
			[
				[0, 3, 6, 5],
				[1, 4, 7, 2]
			].iz(), edges[2].pow(2) * (edges[0].pow(2) + edges[1].pow(2))
		]
	].iz();

	let answ = vertexForCross.pop();

	vertexForCross = vertexForCross.iz();

	let nameVertexForCross = vertexForCross.map((elem) => '$' + letters.concat(lettersWithIndexLatex)[elem] + '$');

	let paint1 = function(ctx) {
		ctx.translate(110, 50);
		let edge = 15;
		ctx.scale(10, 10);

		ctx.font = "3px liberation_sans";
		ctx.lineWidth = 0.2;
		ctx.drawParallelepiped({
			width: edge * 1.6,
			height: edge * 1.3,
			depth: edge / 1.5,
			angle: Math.PI / 1.1,
			scale: 20,
			lettersOnVertex: letters.concat(letterWithIndex),
			crossSection: vertexForCross,
			internalLinesWithDash: [[sl(0,7),sl(0,7)]],
		}, [0, 3, 4], false, [0.4, 0.5]);
	};


	NAinfo.requireApiVersion(0, 2);
	NAtask.setTask({
		text: 'В прямоугольном параллелепипеде $' + [letters.soed(), letters.join('_{1}') + '_{1}'].shuffleJoin() + '$' +
			' известно, что ' + edgeNames.shuffle().joinWithConjunction() +
			'. Найдите площадь сечения, проходящего через вершины ' + nameVertexForCross.iz(3).joinWithConjunction() + '.',
		answers: answ.sqrt(),
		author: ['Авддеев Николай', 'Суматохина Александра']
	});

	NAtask.modifiers.multiplyAnswerBySqrt(13);

	NAtask.modifiers.addCanvasIllustration({
		width: 400,
		height: 400,
		paint: paint1,
	});
}, 1000);
//324452 325291 513339 513360 516375 516395 325285 325287 325289 325293 325295 325297 325299 325301 325303 325305 325307 325309 325311 325313 325315 325317 325319 325321 325323 325325 325327 325329 325331 325333 325335 325337 325339 325341 325343 325345 325347 325349 325351 325353 325355 325357 325359 325361 325363  316552 507883 507906 523989 524016 316559 316561 316563 316565 316567 316569 316571 316573 316575 316577 316579 316581 316583 316585 316587 316589 316591 316593 316595 316597 316599 316601 316603 316605 316607 316609 316611 316613 316615 316617 316619 316621 316623 316625 316627 316629 316631 316633 316635 316637 316639 316641 316643 316645 316647 316649 316651 316653 316655 316657

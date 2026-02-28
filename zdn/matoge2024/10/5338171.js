(function() { 
	'use strict'; 
	retryWhileError(function() {
	/* На рисунке изображена диаграмма Эйлера для случайных событий A и B в некотором случайном опыте. Точками показаны все равновозможные элементарные события опыта. Найдите вероятность события A. */

	let key = '5338171';
    let preference = ['probabilityA', 'probabilityB', 'probabilityAAndB', 'probabilityAOrB', 'probabilityNAAndB', 'probabilityAAndNB', 'probabilityNAOrB', 'probabilityAOrNB', 'probabilityNotAAndB', 'probabilityNotAOrB'];
    let rand = getSelectedPreferenceFromList(key, preference);
    
	let numberOfCoordinateA = sl(1,4);
	let numberOfCoordinateB = slKrome(numberOfCoordinateA, 1, 4);
	let numberOfCoordinateAAndB = sl(1,2);
	let numberOfCoordinateNot = 10 - numberOfCoordinateA - numberOfCoordinateB - numberOfCoordinateAAndB;
	
	let coordinateA = [arrayOfUniqueValues(numberOfCoordinateA, -6, -2.5, 0.5), arrayOfUniqueValues(numberOfCoordinateA, -3.5, 3.5, 0.5)];
	coordinateA = coordinateA.T();
	
	let coordinateB = [arrayOfUniqueValues(numberOfCoordinateB, 2.5, 6, 0.5), arrayOfUniqueValues(numberOfCoordinateB, -3.5, 3.5, 0.5)];
	coordinateB = coordinateB.T();
	
	let coordinateAB = [arrayOfUniqueValues(numberOfCoordinateAAndB, -0.5, 0.5, 0.2), arrayOfUniqueValues(numberOfCoordinateAAndB, -1.3, 1.3, 0.5)];
	coordinateAB = coordinateAB.T();
	
	let coordinateNotAB = [arrayOfUniqueValues(numberOfCoordinateNot, -9, 9, 0.5), arrayOfUniqueValues(numberOfCoordinateNot, 5, 8, 0.5)];
	coordinateNotAB = coordinateNotAB.T();

	let the_orderToFind = decor.orderToFind.iz(); // ["найдите","определите","вычислите"]
	
	let paint = function(ctx) {
		let w = 400;
		let h = 400;
		ctx.strokeRect(10, 10, w-20, h-20);
		ctx.translate(w/2, h/2 + 30);
		ctx.scale(20, -20);
		ctx.lineWidth = 0.1;
		
		ctx.fillStyle = om.transparentBrandColors[1];
		ctx.beginPath();
		ctx.ellipse(-4,0, 5, 4.5, 0, 0, 2*Math.PI);
		ctx.fill();
		
		ctx.fillStyle = om.transparentBrandColors[0];
		ctx.beginPath();
		ctx.ellipse(4,0, 5, 4.5, 0, 0, 2*Math.PI);
		ctx.fill();
		
		ctx.drawEllipse(-4,0, 5, 4.5);
		ctx.drawEllipse(4,0, 5, 4.5);
		
		ctx.fillStyle = "black";
		graph9AmarkCircles(ctx, coordinateA, coordinateA.length, 0.2);
		graph9AmarkCircles(ctx, coordinateB, coordinateB.length, 0.2);
		graph9AmarkCircles(ctx, coordinateAB, coordinateAB.length, 0.2);
		graph9AmarkCircles(ctx, coordinateNotAB, coordinateNotAB.length, 0.2);
		
		ctx.font = "15px liberation_sans";
		ctx.scale(1 / 20, -1 / 20);
		ctx.fillText('A', -170, 0);
		ctx.fillText('B', 160, 0);
	};

	NAtask.setTask({
		text:
			'На рисунке изображена диаграмма Эйлера для случайных событий $A$ и $B$ в некотором случайном опыте. '+
			'Точками показаны все равновозможные элементарные события опыта. ' + the_orderToFind.toZagl() +' вероятность события ',
        questions: [
            {
                text: '$A$',
                answers: numberOfCoordinateA/10,
            }, {
                text: '$B$',
                answers: numberOfCoordinateB/10,
            }, {
                text: '$A \\cap B$',
                answers: numberOfCoordinateAAndB/10,
            }, {
                text: '$A \\cup B$',
                answers: (numberOfCoordinateA+numberOfCoordinateB+numberOfCoordinateAAndB)/10,
            }, {
                text: '$\\overline{A} \\cap B$',
                answers: numberOfCoordinateB/10,
            }, {
                text: '$A \\cap \\overline{B}$',
                answers: numberOfCoordinateA/10,
            },{
                text: '$\\overline{A} \\cup B$',
                answers: (numberOfCoordinateB+numberOfCoordinateAAndB)/10,
            }, {
                text: '$A \\cup \\overline{B}$',
                answers: (numberOfCoordinateA+numberOfCoordinateAAndB)/10,
            }, {
                text: '$\\overline{A \\cap B}$',
                answers: (numberOfCoordinateA+numberOfCoordinateB+numberOfCoordinateNot)/10,
            }, {
                text: '$\\overline{A \\cup B}$',
                answers: numberOfCoordinateNot/10,
            }
        ][rand],
        postquestion: '.',
		authors: ['Александра Суматохина'],
		preference,
	});
	NAtask.modifiers.allDecimalsToStandard(/*true*/);
	NAtask.modifiers.addCanvasIllustration({
		width: 400,
		height: 400,
		paint,
	});
}, 2000);})();
//5338171
//Открытый банк заданий 51743B

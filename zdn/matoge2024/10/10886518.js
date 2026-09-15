(function() { 'use strict'; retryWhileError(function() {
	/* На рисунке изображено дерево случайного опыта. Найдите вероятность события B. */
	
	let [SA, SAB, SNAB] = arrayOfUniqueValues(3, 0.05, 0.95, 0.05);
    let [SNA, SANB, SNANB] = [SA, SAB, SNAB].map(prob => 1 - prob);

	let the_orderToFind = decor.orderToFind.iz(); // ["найдите","определите","вычислите"]

	let paint = function (ctx) {
            let w = 400;
            let h = 400;
            ctx.translate(w / 2, h / 2 + 70);
            ctx.scale(20, -20);
            ctx.lineWidth = 0.1;
            
            //SA
            ctx.drawLine(0, 10, -5, 4);
            //SNA
            ctx.drawLine(0, 10, 5, 4);
        	//SNAB
            ctx.drawLine(5, 4, 3, -1);
        	//SNANB
            ctx.drawLine(5, 4, 7, -1);
            //SAB
            ctx.drawLine(-5, 4, -7, -1);
            //SANB
            ctx.drawLine(-5, 4, -3, -1);

            ctx.font = "18px liberation_sans";
            ctx.scale(1 / 20, -1 / 20);
            ctx.lineWidth = 1;
            
            //SA
            ctx.signSegmentInMiddle(0, -12*20, -7*20, -6*20, SA.ts(), 15, 30);
            //SAB
            ctx.signSegmentInMiddle(-8*20, -4*20, -6*20, 1*20, SAB.ts(), 15, 30);
            //SANB
            ctx.signSegmentInMiddle(-4*20, -4*20, -2*20, 1*20, SANB.ts(), 15, 30);
            
            //SNA
            ctx.signSegmentInMiddle(0, -12*20, 5*20, -6*20, SNA.ts(), 15, 30);
            //SNAB
            ctx.signSegmentInMiddle(2*20, -4*20, 1*20, 1*20, SNAB.ts(), 15, 30);
            //SNANB
            ctx.signSegmentInMiddle(7*20, -4*20, 8*20, 1*20, SNANB.ts(), 15, 30);
            
            
            //S
            ctx.fillText('S', 0, -10.2*20);
            
            //A
            ctx.drawLine(5.2*20, -4.8 * 20, 5.9*20, -4.8 * 20);
            ctx.fillText('A', 5*20 + 5, -4*20);
            ctx.fillText('A', -5*20 - 15, -4*20);
            
            //B
            ctx.drawLine(7.6*20, 1.2 * 20, 6.9*20, 1.2 * 20);
            ctx.fillText('B', 7*20, 1*20 +20);
            ctx.fillText('B', 3*20, 1*20 +20);
            
            ctx.drawLine(-2.4*20, 1.2 * 20, -3.1*20, 1.2 * 20);
            ctx.fillText('B', -7*20, 1*20 +20);
            ctx.fillText('B', -3*20, 1*20 +20);
	};

	NAtask.setTask({
		text:
			'На рисунке изображено дерево случайного опыта. ' + the_orderToFind.toZagl() +' вероятность события ',
		questions: [{
			text: '$B$',
			answers: SA*SAB+SNA*SNAB,
		},{
			text: '$\\overline{B}$',
			answers: SA*SANB+SNA*SNANB,
		}
			],
		postquestion: '.',
        authors: ['Александра Суматохина'],
	});
	NAtask.modifiers.allDecimalsToStandard(/*true*/);
	NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint,
        });
}, 2000);})();
//10886518
//Открытый банк заданий A61D76

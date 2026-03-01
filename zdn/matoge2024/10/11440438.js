(function () {
    'use strict';
    retryWhileError(function () {
        /* На рисунке изображена диаграмма Эйлера для случайных событий A и B в некотором случайном опыте с равновозможными исходами. В каждой области указано, сколько исходов принадлежит этой области. Найдите вероятность события A. */

        let key = '11440438';
        let preference = ['probabilityA', 'probabilityB', 'probabilityAAndB', 'probabilityAOrB', 'probabilityNAAndB', 'probabilityAAndNB', 'probabilityNAOrB', 'probabilityAOrNB', 'probabilityNotAAndB', 'probabilityNotAOrB'];
        let rand = getSelectedPreferenceFromList(key, preference);

        let coordinateA = [sl(-6, -2.5, 0.5), sl(-3, 3)];
        let coordinateB = [sl(2.5, 6, 0.5), sl(-3.5, 3.5)];
        let coordinateAAndB = [sl(-0.6, -0.4, 0.2), sl(-1, 1, 0.5)];
        let coordinateNotAB = [sl(-8, 8, 0.5), sl(5, 8)];

        let totalProbility = sl(10, 100, 10);
        let copyTotalProbility = totalProbility;
        let min = totalProbility / 10;
        let max = totalProbility / 2;
        let probabilityA = sl(min, max);
        copyTotalProbility -= probabilityA;
        let probabilityB = slKrome(probabilityA, min, max);
        copyTotalProbility -= probabilityB;
        let probabilityAAndB = slKrome([probabilityA, probabilityB], min, max);
        copyTotalProbility -= probabilityAAndB;
        let probabilityNotAB = copyTotalProbility;

        genAssert(probabilityNotAB > 0, 'Вероятности слишком большые');

        let the_orderToFind = decor.orderToFind.iz(); // ["найдите","определите","вычислите"]

        let paint = function (ctx) {
            let w = 400;
            let h = 400;
            ctx.strokeRect(10, 10, w - 20, h - 20);
            ctx.translate(w / 2, h / 2 + 30);
            ctx.scale(20, -20);
            ctx.lineWidth = 0.1;

            ctx.fillStyle = om.transparentBrandColors[1];
            ctx.beginPath();
            ctx.ellipse(-4, 0, 5, 4.5, 0, 0, 2 * Math.PI);
            ctx.fill();

            ctx.fillStyle = om.transparentBrandColors[0];
            ctx.beginPath();
            ctx.ellipse(4, 0, 5, 4.5, 0, 0, 2 * Math.PI);
            ctx.fill();

            ctx.drawEllipse(-4, 0, 5, 4.5);
            ctx.drawEllipse(4, 0, 5, 4.5);

            ctx.fillStyle = "black";
            graph9AmarkCircles(ctx, [coordinateA], coordinateA.length, 0.2);
            graph9AmarkCircles(ctx, [coordinateB], coordinateB.length, 0.2);
            graph9AmarkCircles(ctx, [coordinateAAndB], coordinateAAndB.length, 0.2);
            graph9AmarkCircles(ctx, [coordinateNotAB], coordinateNotAB.length, 0.2);

            ctx.font = "15px liberation_sans";
            ctx.scale(1 / 20, -1 / 20);
            ctx.fillText('A', -170, 0);
            ctx.fillText('B', 160, 0);

            ctx.fillText(probabilityA.ts(), coordinateA[0] * 20, coordinateA[1] * (-20) - 5);
            ctx.fillText(probabilityB.ts(), coordinateB[0] * 20, coordinateB[1] * (-20) - 5);
            ctx.fillText(probabilityAAndB.ts(), coordinateAAndB[0] * 20, coordinateAAndB[1] * (-20) - 5);
            ctx.fillText(probabilityNotAB.ts(), coordinateNotAB[0] * 20, coordinateNotAB[1] * (-20) - 5);
        };

        NAtask.setTask({
            text:
                'На рисунке изображена диаграмма Эйлера для случайных событий $A$ и $B$ в некотором случайном опыте с равновозможными исходами. ' +
                'В каждой области указано, сколько исходов принадлежит этой области. ' + the_orderToFind.toZagl() + ' вероятность события ',
            questions: [
                {
                    text: '$A$',
                    answers: (probabilityA + probabilityAAndB) / totalProbility,
                }, {
                    text: '$B$',
                    answers: (probabilityB + probabilityAAndB) / totalProbility,
                }, {
                    text: '$A \\cap B$',
                    answers: probabilityAAndB / totalProbility,
                }, {
                    text: '$A \\cup B$',
                    answers: (probabilityA + probabilityB + probabilityAAndB) / totalProbility,
                }, {
                    text: '$\\overline{A} \\cap B$',
                    answers: probabilityB / totalProbility,
                }, {
                    text: '$A \\cap \\overline{B}$',
                    answers: probabilityA / totalProbility,
                }, {
                    text: '$\\overline{A} \\cup B$',
                    answers: (probabilityB + probabilityAAndB + probabilityNotAB) / totalProbility, // Все, кроме только A
                }, {
                    text: '$A \\cup \\overline{B}$',
                    answers: (probabilityA + probabilityAAndB + probabilityNotAB) / totalProbility, // Все, кроме только B
                }, {
                    text: '$\\overline{A \\cap B}$',
                    answers: (probabilityA + probabilityB + probabilityNotAB) / totalProbility,
                }, {
                    text: '$\\overline{A \\cup B}$',
                    answers: probabilityNotAB / totalProbility,
                }
            ][rand],
            postquestion: '.',
            authors: ['Александра Суматохина'],
            preference,
        });
        NAtask.modifiers.allDecimalsToStandard(/*true*/);
        NAtask.modifiers.assertSaneDecimals();
        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint,
        });
    }, 2000);
})();
//11440438
//Открытый банк заданий AE9136

(function () {
    'use strict';
    retryWhileError(function () {
        /* На рисунке изображена диаграмма Эйлера для случайных событий A и B в некотором случайном опыте. Точками показаны все элементарные события и около каждого указана его вероятность. Найдите вероятность события A. */

        let key = '1582477';
        let preference = ['probabilityA', 'probabilityB', 'probabilityAAndB', 'probabilityAOrB', 'probabilityNAAndB', 'probabilityAAndNB', 'probabilityNAOrB', 'probabilityAOrNB', 'probabilityNotAAndB', 'probabilityNotAOrB'];
        let rand = getSelectedPreferenceFromList(key, preference);

        let numberOfCoordinateA = sl(2, 3);
        let numberOfCoordinateB = slKrome(numberOfCoordinateA, 2, 3);
        let numberOfCoordinateAAndB = sl(1, 2);
        let numberOfCoordinateNot = sl(1, 2);

        let coordinateA = [arrayOfUniqueValues(numberOfCoordinateA, -6, -2.5, 0.5), arrayOfUniqueValues(numberOfCoordinateA, -3.5, 3.5)];
        coordinateA = coordinateA.T();
        let probabilityA = arrayOfUniqueValues(numberOfCoordinateA, 0.05, 0.3, 0.05);

        let coordinateB = [arrayOfUniqueValues(numberOfCoordinateB, 2.5, 6, 0.5), arrayOfUniqueValues(numberOfCoordinateB, -3.5, 3.5)];
        coordinateB = coordinateB.T();
        let probabilityB = arrayOfUniqueValues(numberOfCoordinateB, 0.05, 0.3, 0.05);

        let coordinateAAndB = [arrayOfUniqueValues(numberOfCoordinateAAndB, -0.6, -0.4, 0.2), arrayOfUniqueValues(numberOfCoordinateAAndB, -1, 1)];
        coordinateAAndB = coordinateAAndB.T();
        let probabilityAAndB = arrayOfUniqueValues(numberOfCoordinateAAndB, 0.05, 0.2, 0.05);

        let coordinateNotAB = [arrayOfUniqueValues(numberOfCoordinateNot, -8, 8, 0.5), arrayOfUniqueValues(numberOfCoordinateNot, 5, 8)];
        coordinateNotAB = coordinateNotAB.T();
        let deltaProb = 1 - (probabilityA.sum() + probabilityB.sum() + probabilityAAndB.sum());
        genAssert(deltaProb > 0.1, 'Вероятности слишком большые');
        let probabilityNotAB;
        if (numberOfCoordinateNot == 2) {
            probabilityNotAB = [sl(0.05, deltaProb - 0.05, 0.05)];
            probabilityNotAB.push(deltaProb - probabilityNotAB[0]);
        } else {
            probabilityNotAB = [deltaProb];
        }

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
            graph9AmarkCircles(ctx, coordinateA, coordinateA.length, 0.2);
            graph9AmarkCircles(ctx, coordinateB, coordinateB.length, 0.2);
            graph9AmarkCircles(ctx, coordinateAAndB, coordinateAAndB.length, 0.2);
            graph9AmarkCircles(ctx, coordinateNotAB, coordinateNotAB.length, 0.2);

            ctx.font = "15px liberation_sans";
            ctx.scale(1 / 20, -1 / 20);
            ctx.fillText('A', -170, 0);
            ctx.fillText('B', 160, 0);

            coordinateA.forEach((coord, i) => ctx.fillText(probabilityA[i].ts(), coord[0] * 20, coord[1] * (-20) - 5));
            coordinateB.forEach((coord, i) => ctx.fillText(probabilityB[i].ts(), coord[0] * 20, coord[1] * (-20) - 5));
            coordinateAAndB.forEach((coord, i) => ctx.fillText(probabilityAAndB[i].ts(), coord[0] * 20, coord[1] * (-20) - 5));
            coordinateNotAB.forEach((coord, i) => ctx.fillText(probabilityNotAB[i].ts(), coord[0] * 20, coord[1] * (-20) - 5));
        };

        NAtask.setTask({
            text:
                'На рисунке изображена диаграмма Эйлера для случайных событий $A$ и $B$ в некотором случайном опыте. ' +
                'Точками показаны все элементарные события и около каждого указана его вероятность. ' + the_orderToFind.toZagl() + ' вероятность события ',
            questions: [
                {
                    text: '$A$',
                    answers: probabilityA.sum(),
                }, {
                    text: '$B$',
                    answers: probabilityB.sum(),
                }, {
                    text: '$A \\cap B$',
                    answers: probabilityAAndB.sum(),
                }, {
                    text: '$A \\cup B$',
                    answers: probabilityA.sum() + probabilityB.sum() + probabilityAAndB.sum(),
                }, {
                    text: '$\\overline{A} \\cap B$',
                    answers: probabilityB.sum(),
                }, {
                    text: '$A \\cap \\overline{B}$',
                    answers: probabilityA.sum(),
                }, {
                    text: '$\\overline{A} \\cup B$',
                    answers: probabilityB.sum() + probabilityAAndB.sum(),
                }, {
                    text: '$A \\cup \\overline{B}$',
                    answers: probabilityA.sum() + probabilityAAndB.sum(),
                }, {
                    text: '$\\overline{A \\cap B}$',
                    answers: probabilityA.sum() + probabilityB.sum() + probabilityNotAB.sum(),
                }, {
                    text: '$\\overline{A \\cup B}$',
                    answers: probabilityNotAB.sum(),
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
    }, 2000);
})();
//1582477
//Открытый банк заданий 18258D

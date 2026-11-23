(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let rand = sl1();

        let side = sl(10, 20);
        const baseRange = [1, 20];
        let a = sl(...baseRange);

        const trp = new Trapezoid({
            lengths: {
                lengthAB: a,
                lengthBC: side,
                lengthCD: slKrome(a, ...baseRange),
                lengthDA: side,
            },
            supplementary: {
                calculateHeights: true,
            }
        });
        let bases = [trp.lengthAB, trp.lengthCD];
        let answ = (rand ? bases.minE() : bases.maxE()) / 2;

        trp.addVertexToConnectionMatrix([trp.segmentBC.middle(), trp.segmentDA.middle()], 'E');
        trp.connectVerticesInConnectionMatrix(
            [
                [0, 2],
                [4, 5]
            ]
        );

        let points = autoScale(trp.vertices);
        let letters = latbukv.slice(0, 4);

        let key = '27821';
        let preference = ['noLetters', 'withLetters'];
        let randLetters = getSelectedPreferenceFromList(key, preference);

        let paint1 = function (ctx) {
            ctx.translateToCenter();

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors.iz();

            ctx.lineWidth = 2;
            ctx.drawFigure(points, trp.connectionMatrix);

            if (randLetters == 1) {
                ctx.scale(1, -1);
                ctx.font = '20px liberation_sans';
                points.slice(0, 4).forEach((elem, i) => {
                    let label = labelPositionAwayFrom(elem, { x: 0, y: 0 }, 18);
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(letters[i], label.x, -label.y);
                });
            }
        };

        NAtask.setTask({
            text: `Основания трапеции равны $${trp.lengthAB}$ и $${trp.lengthCD}$. Найдите ${[`больший`, `меньший`][rand]} из отрезков, на которые делит среднюю линию этой трапеции одна из её диагоналей.`,
            answers: answ,
            authors: ['Александра Суматохина'],
            preference
        });
        NAtask.modifiers.allDecimalsToStandard(true);
        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });


    }, 2000);
})();
// https://ege.sdamgia.ru/problem?id=27821

(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let rand = sl1();

        let side = sl(10, 20);
        let a = sl(5, 20);

        const trp = new Trapezoid({
            lengths: {
                lengthAB: a,
                lengthBC: side,
                lengthCD: slKrome(a, 5, 20),
                lengthDA: side,
            },
            supplementary: {
                calculateHeights: true,
            }
        });
        let answ = [trp.lengthAB, trp.lengthCD];
        answ = (rand ? answ.minE() : answ.maxE()) / 2;

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
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors;

            ctx.lineWidth = 2;
            ctx.drawFigure(points, trp.connectionMatrix);

            ctx.strokeStyle = om.primaryBrandColors.iz();

            if (randLetters == 1) {
                ctx.scale(1, -1);
                ctx.font = "20px liberation_sans";
                points.slice(0, 4).forEach((elem, i) => {
                    let offsetX = (i == 0 || i == 3) ? -15 : 5;
                    let offsetY = (i < 2) ? 25 : -5;
                    ctx.fillText(letters[i], elem.x + offsetX, -elem.y + offsetY);
                });
            }
        };

        NAtask.setTask({
            text: `Основания трапеции равны $${trp.lengthAB}$ и $${trp.lengthCD}$. Найдите ${[`больший`, `меньший`][rand]} из отрезков, на которые делит среднюю линию этой трапеции одна из её диагоналей.`,
            answers: answ,
            authors: ['Александра Суматохина'],
            preference
        });

        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });

    }, 2000);
    NAtask.modifiers.allDecimalsToStandard(true);
})();
// https://ege.sdamgia.ru/problem?id=27821

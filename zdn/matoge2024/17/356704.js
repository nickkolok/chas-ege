(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let letters = latbukv.slice(0, 4);

        let AB = sl(3, 15);
        let CD = sl(2, AB - 1);

        let trp = new Trapezoid({
            lengths: {
                lengthAB: AB,
                lengthCD: CD,
            },
            height: sl(3, 10),
            angles: {
                angle: {
                    angleA: Math.PI / 3,
                },
            },
            supplementary: {
                calculateHeights: true,
            }
        });
        genAssert(trp.lengthHeightACD.isAlmostInteger(), 'Высота не целая');

        let points = autoScale(trp.vertices);

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors;

            ctx.lineWidth = 2;
            ctx.drawFigure(points, trp.connectionMatrix);

        };

        NAtask.setTask({
            text: `Основания трапеции равны $${trp.lengthAB}$ и $${trp.lengthCD}$, а высота равна $${trp.lengthHeightACD}$. Найдите среднюю линию этой трапеции.`,
            answers: 0.5 * (trp.lengthCD + trp.lengthAB),
            authors: ['Александра Суматохина'],
        });
        NAtask.modifiers.allDecimalsToStandard(true);
        NAtask.modifiers.variativeABC(letters);

        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });
    }, 2000);
})();
// https://oge.sdamgia.ru/problem?id=356704

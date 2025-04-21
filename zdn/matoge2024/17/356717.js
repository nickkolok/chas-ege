(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let side = sl(5, 20);
        let a = sl(5, 20);

        const trp = new Trapezoid({
            lengths: {
                lengthAB: a,
                lengthBC: side,
                lengthCD: slKrome(a, 5, 20),
                lengthDA: slKrome(side, 5, 20),
            },
            supplementary: {
                calculateHeights: true,
            }
        });
        genAssert(trp.lengthHeightACD.isAlmostInteger(), 'Высота не целая');
        genAssert(trp.angleAInDegrees != 90, 'Высота не целая');
        genAssert(trp.angleBInDegrees != 90, 'Высота не целая');

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
            text: `Основания трапеции равны $${[trp.lengthAB, trp.lengthCD].shuffleJoin('$ и $')}$, а высота равна $${trp.lengthHeightACD}$. Найдите площадь трапеции.`,
            answers: trp.area(),
            authors: ['Александра Суматохина'],
        });
        NAtask.modifiers.allDecimalsToStandard(true);

        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });
    }, 2000);
})();
// https://oge.sdamgia.ru/problem?id=356717

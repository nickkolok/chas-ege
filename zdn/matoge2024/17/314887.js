(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let a = sl(5, 50);
        let b = slKrome(a, 5, 50);
        let side = (a - b).abs() / Math.sqrt(2);
        genAssert(side > [a, b].minE() * 0.75);

        const trp = new Trapezoid({
            lengths: {
                lengthAB: a,
                lengthBC: side,
                lengthCD: b,
                lengthDA: side,
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
            text: `В равнобедренной трапеции основания равны $${trp.lengthAB}$ и $${trp.lengthCD}$, а один из углов между боковой стороной и основанием равен $45^\\circ$. Найдите площадь трапеции.`,
            answers: trp.area(),
            authors: ['Александра Суматохина'],
        });

        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });

    }, 2000);
    NAtask.modifiers.allDecimalsToStandard(true);
})();
// https://oge.sdamgia.ru/problem?id=314887

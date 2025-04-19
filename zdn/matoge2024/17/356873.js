(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let letters = latbukv.slice(0, 4);
        let height = sl(5, 20);

        let trp = new Trapezoid({
            lengths: {
                lengthAB: sl(5, 20),
                lengthCD: sl(5, 20),
            },
            height: height,
            angles: {
                angle: {
                    angleA: Math.PI / 2,
                },
            },
        });

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
            text: `Один из углов прямоугольной трапеции равен $${trp.angleCInDegrees.ceil()}^\\circ$. Найдите ${[`больший`, `меньший`][Number(trp.angleBInDegrees < trp.angleCInDegrees)]} угол этой трапеции. Ответ дайте в градусах.`,
            answers: 180 - trp.angleCInDegrees.ceil(),
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
// https://oge.sdamgia.ru/problem?id=356873

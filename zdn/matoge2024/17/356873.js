(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let height = sl(5, 20);
        let lengthAB = sl(5, 20);

        let trp = new Trapezoid({
            lengths: {
                lengthAB: lengthAB,
                lengthCD: slKrome(lengthAB, 5, 20),
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
            ctx.translateToCenter();

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors.iz();

            ctx.lineWidth = 2;
            ctx.drawFigure(points, trp.connectionMatrix);
        };

        NAtask.setTask({
            text: `Один из углов прямоугольной трапеции равен $${trp.angleCInDegrees.round()}^\\circ$. Найдите ${[`больший`, `меньший`][Number(trp.angleBInDegrees < trp.angleCInDegrees)]} угол этой трапеции. Ответ дайте в градусах.`,
            answers: trp.angleBInDegrees.round(),
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

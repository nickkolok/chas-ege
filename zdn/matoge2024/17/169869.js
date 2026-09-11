(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let rhombus = new Rhombus({
            length: sl(1, 50),
            angles: {
                angle: {
                    angleA: [30, 150].iz()
                },
                angleInDegree: true,
            },
        });

        let points = autoScale(rhombus.vertices);

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors;

            ctx.lineWidth = 2;
            ctx.drawFigure(points, rhombus.connectionMatrix);

        };

        NAtask.setTask({
            text: `Периметр ромба равен $${rhombus.perimeter}$, а один из углов равен $30^\\circ$. Найдите площадь ромба.`,
            answers: rhombus.area(),
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
// https://oge.sdamgia.ru/test?likes=169869

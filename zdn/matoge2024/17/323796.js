(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let height = sl(5, 20);
        let a = sl(10, 20);

        const trp = new Trapezoid({
            lengths: {
                lengthAB: a + 2 * height,
                lengthBC: height * (2).sqrt(),
                lengthCD: a,
                lengthDA: height * (2).sqrt(),
            },
            supplementary: {
                calculateHeights: true,
            }
        });
        genAssert(trp.lengthHeightACD.isAlmostInteger(), 'Высота не целая');
        trp.addVertexToConnectionMatrix(trp.heightCAB.pe, 'C');

        let points = autoScale(trp.vertices);

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors;

            ctx.lineWidth = 2;
            ctx.drawFigure(points, trp.connectionMatrix);

            ctx.strokeStyle = om.primaryBrandColors.iz();
            ctx.arcBetweenSegments([points[0].x, points[0].y, points[4].x, points[4].y, points[2].x, points[2].y], 15);
            ctx.arcBetweenSegments([points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y], 20);

            ctx.scale(1, -1);
            ctx.font = "20px liberation_sans";
            ctx.signSegmentInMiddle(points[4].x, -points[4].y, points[2].x, -points[2].y, height, 10, 20);
            ctx.signSegmentInMiddle(points[3].x, -points[3].y, points[2].x, -points[2].y, a, 10, 25);

            ctx.font = "16px liberation_sans";
            ctx.fillText(`${trp.angleBInDegrees.ts()}°`, -40 + points[1].x, -points[1].y - 5);
        };

        NAtask.setTask({
            text: `В равнобедренной трапеции известна высота, меньшее основание и угол при основании (см. рисунок). Найдите большее основание.`,
            answers: trp.lengthAB,
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
// https://oge.sdamgia.ru/test?pid=323796

(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let c = sl(3, 20);
        let height = sl(3, 20);

        let BC = (c.pow(2) + height.pow(2)).sqrt();
        genAssert(BC.isAlmostInteger(), "Вторая сторона параллелограмма тоже должна быть целой");

        let par = new Parallelogram({
            lengths: {
                lengthAB: c + sl(3, 10),
                lengthBC: BC
            },
            angles: {
                angle: {
                    angleA: Math.asin(height / BC)
                },
            },
            supplementary: {
                calculateHeights: true,
            }
        });

        par.addVertexToConnectionMatrix(par.heightDAB.pe, 'E');
        par.connectVerticesInConnectionMatrix(
            [3, 4]
        );

        let AH = par.pointA.distanceTo(par.heightDAB.pe)[0];

        let points = autoScale(par.vertices);

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors;

            ctx.lineWidth = 2;
            ctx.drawFigure(points, par.connectionMatrix);

            ctx.strokeStyle = om.primaryBrandColors.iz();
            ctx.arcBetweenSegments([points[3].x, points[3].y, points[4].x, points[4].y, points[1].x, points[1].y], 15, true);

            ctx.scale(1, -1);
            ctx.font = "16px liberation_sans";
            ctx.signSegmentInMiddle(points[0].x, -points[0].y, points[4].x, -points[4].y, c.ts(), 5, 20);
            ctx.signSegmentInMiddle(points[1].x, -points[1].y, points[4].x, -points[4].y, (par.lengthAB - c).ts(), 5, 20);
            ctx.signSegmentInMiddle(points[0].x, -points[0].y, points[3].x, -points[3].y, par.lengthDA.ts(), 5, 20);
            ctx.signSegmentInMiddle(points[3].x, -points[3].y, points[4].x, -points[4].y, height.ts(), 10, 25);
        };

        NAtask.setTask({
            text: `Найдите площадь параллелограмма, изображённого на рисунке.`,
            answers: par.area(),
            authors: ['Александра Суматохина'],
        });
        NAtask.modifiers.allDecimalsToStandard(true);

        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });
    }, 1000);
})();
// https://oge.sdamgia.ru/problem?id=65

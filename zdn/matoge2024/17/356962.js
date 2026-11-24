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
            supplementary: {
                calculateHeights: true,
            }
        });

        let angle = rhombus.angleAInDegrees;
        let randAngle = angle > 90;

        rhombus.addVertexToConnectionMatrix(angle > 90 ? rhombus.heightACD.pe : rhombus.heightDAB.pe, 'E');
        rhombus.connectVerticesInConnectionMatrix(
            randAngle ? [0, 4] : [3, 4]
        );

        let points = autoScale(rhombus.vertices);

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);
            ctx.rotate(-rhombus.angleAInRadians / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors;

            ctx.lineWidth = 2;
            ctx.drawFigure(points, rhombus.connectionMatrix);

            ctx.strokeStyle = om.primaryBrandColors.iz();
            if (randAngle) {
                ctx.arcBetweenSegments([points[0].x, points[0].y, points[4].x, points[4].y, points[2].x, points[2].y], 15);
            } else {
                ctx.arcBetweenSegments([points[3].x, points[3].y, points[4].x, points[4].y, points[1].x, points[1].y], 15, true);
            }

        };

        NAtask.setTask({
            text: `Сторона ромба равна $${rhombus.lengthAB}$, а один из углов этого ромба равен $150^\\circ$. Найдите высоту этого ромба.`,
            answers: rhombus.lengthHeightDAB,
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
// https://oge.sdamgia.ru/problem?id=356962

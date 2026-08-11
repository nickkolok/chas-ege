(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let AB = sl(15, 50);
        let CD = AB - sl(5, 8);

        let trp = new Trapezoid({
            lengths: {
                lengthAB: AB,
                lengthCD: CD,
            },
            height: sl(CD, AB + CD - 1),
            angles: {
                angle: {
                    angleD: Math.PI / 2,
                },
            },
        });
        genAssert(trp.lengthAB + trp.lengthCD == trp.lengthBC + trp.lengthDA);

        let bisector1 = bisectorIntersection({
            fP: trp.pointD,
            sP: trp.pointA,
            tP: trp.pointB
        }, [trp.segmentCD, trp.segmentBC])[0];

        let bisector2 = bisectorIntersection({
            fP: trp.pointA,
            sP: trp.pointD,
            tP: trp.pointC
        }, [trp.segmentAB, trp.segmentCD])[0];

        let o = bisector1.intersect(bisector2);
        genAssertNonempty(o);
        o = o[0];
        let points = autoScale(trp.vertices.concat(o));

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors;

            ctx.lineWidth = 2;
            ctx.drawFigure(points, trp.connectionMatrix);
            ctx.drawArc(points[4].x, points[4].y, points[3].x.abs(), 0, 2 * Math.PI);


            ctx.strokeStyle = om.primaryBrandColors.iz();
            ctx.arcBetweenSegments([points[1].x, points[1].y, points[0].x, points[0].y, points[3].x, points[3].y], 20);
        };

        NAtask.setTask({
            text: `Радиус окружности, вписанной в прямо угольную трапецию, равен $${trp.lengthDA / 2}$. Найдите высоту этой трапеции.`,
            answers: trp.lengthDA,
            authors: ['Александра Суматохина'],
        });
        NAtask.modifiers.allDecimalsToStandard(true);

        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });
    }, 10000);
})();
// https://oge.sdamgia.ru/problem?id=355387

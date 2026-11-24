(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let letters = latbukv.slice(0, 4).concat('');

        let par = new Parallelogram({
            lengths: {
                lengthAB: sl(10, 50),
                lengthBC: sl(10, 50),
            },
            angles: {
                angle: {
                    angleA: slKrome(90, 30, 150),
                },
                angleInDegree: true,
            },
        });

        let bisector = bisectorIntersection({
            fP: par.pointD,
            sP: par.pointA,
            tP: par.pointB
        }, [par.segmentCD])[0].pe;
        genAssert(bisector.x != par.pointC.x, 'Биссектриса совпала с диагональю');
        par.addVertexToConnectionMatrix(bisector, 'A');

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
            ctx.arcBetweenSegments([points[3].x, points[3].y, points[0].x, points[0].y, points[4].x, points[4].y], 20);
            ctx.arcBetweenSegments([points[1].x, points[1].y, points[0].x, points[0].y, points[4].x, points[4].y], 25);

            ctx.scale(1, -1);
            ctx.font = "20px liberation_sans";
            points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i < 2) ? 25 : -5)));
        };

        NAtask.setTask({
            text: `Найдите ${[`острый`, `тупой`][Number(par.angleAInDegrees > par.angleBInDegrees)]} угол параллелограмма $ABCD$, если биссектриса угла $A$ 
			образует со стороной $CD$ угол, равный $${par.angleAInDegrees / 2}^\\circ$. Ответ дайте в градусах.`,
            answers: par.angleAInDegrees,
            authors: ['Александра Суматохина'],
        });
        NAtask.modifiers.variativeABC(letters);
        NAtask.modifiers.allDecimalsToStandard(true);

        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });
    }, 2000);
})();
// https://oge.sdamgia.ru/problem?id=348573

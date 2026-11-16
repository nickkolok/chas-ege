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

        let circle = trp.inscribedCircle();
        genAssert(circle !== null);
        let points = autoScale(trp.vertices.concat(circle.pc));

        let paint1 = function (ctx) {

            ctx.translateToCenter();

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors.iz();

            ctx.lineWidth = 2;
            ctx.drawFigure(points, trp.connectionMatrix);
            let scale = Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y) / trp.lengthAB;
            new Circle(new Point(circle.pc.x * scale, circle.pc.y * scale), circle.r * scale).drawOnto(ctx);


            ctx.strokeStyle = om.primaryBrandColors.iz();
            ctx.arcBetweenSegments([points[1].x, points[1].y, points[0].x, points[0].y, points[3].x, points[3].y], 20);
        };

        NAtask.setTask({
            text: `Радиус окружности, вписанной в прямоугольную трапецию, равен $${trp.lengthDA / 2}$. Найдите высоту этой трапеции.`,
            answers: trp.lengthDA,
            authors: ['Александра Суматохина'],
        });
        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });

        NAtask.modifiers.allDecimalsToStandard(true);
    }, 10000);
})();
// https://oge.sdamgia.ru/problem?id=355387


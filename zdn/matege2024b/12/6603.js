(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let letters = latbukv.slice(0, 3).concat(['M', 'H']);

        let a = sl(5, 20);
        let sides = [a, a * (3).sqrt()].shuffle();

        let triangle = new Triangle({
            lengths: {
                lengthCA: sides[0],
                lengthBC: sides[1],
            },
            angles: {
                angle: Math.PI / 2,
            },
            supplementary: {
                calculateHeights: true,
                calculateMedians: true
            }
        });

        triangle.addVertexToConnectionMatrix(triangle.medianCEndPoint, 'C');
        triangle.addVertexToConnectionMatrix(triangle.heightCEndPoint, 'C');

        genAssert((triangle.medianCEndPoint.x - triangle.heightCEndPoint.x).abs() > 2, 'Высота и медиана сливаются');

        let answ = 0.75 * triangle.lengthAB;
        genAssertZ1000(answ);

        let rand = Number(triangle.lengthCA < triangle.lengthBC);

        let points = autoScale(triangle.vertices);

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors;

            ctx.lineWidth = 2;
            ctx.drawFigure(points, triangle.connectionMatrix);

            ctx.strokeStyle = om.primaryBrandColors.iz();
            ctx.arcBetweenSegments([points[0].x, points[0].y, points[4].x, points[4].y, points[2].x, points[2].y], 15);

            ctx.scale(1, -1);
            ctx.font = "20px liberation_sans";
            points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i != 2) ? 25 : -5)));
        };

        NAtask.setTask({
            text: `В треугольнике $ABC$ сторона $AB = ${triangle.lengthAB.pow(2).texsqrt(1)}$, $CM$ – медиана, $CH$ – высота, $${[`BC`, `CA`][rand]}=CM$. 
            Найдите длину отрезка $${[`A`, `B`][rand]}H$.`,
            answers: answ,
            authors: ['Александра Суматохина'],
        });
        NAtask.modifiers.variativeABC(letters);

        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });
    }, 1000);

})();
// https://base.mathege.ru/clones/?position=16&parent=6603

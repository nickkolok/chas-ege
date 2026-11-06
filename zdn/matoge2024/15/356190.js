(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        // Треугольник строится по заданному углу B (в ФИПИ углы от 97° до 177°),
        // окрестность прямого угла исключена, чтобы на чертеже было видно, острый угол или тупой
        let angleB = slKrome((x) => (x - 90).abs() < 5, 30, 177);
        let triangle = new Triangle({
            lengths: {
                lengthAB: sl(3, 8),
                lengthBC: sl(3, 8),
            },
            angles: {
                angle: angleB,
                angleInDegree: true,
            },
        });

        let points = autoScale(triangle.vertices);
        genAssert(160 - points[1].x > 20, 'Прямая из угла B не видна');
        let letters = latbukv.slice(0, 3);

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors;

            ctx.lineWidth = 2;
            ctx.drawFigure(points, triangle.connectionMatrix);
            
            ctx.drawLine(points[1].x, points[1].y, 160, points[1].y);

            ctx.scale(1, -1);
            ctx.font = "20px liberation_sans";
            points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i < points.length / 2) ? 25 : -5)));
        };

        NAtask.setTask({
            text: `В треугольнике $ABC$ угол $B$ равен $${angleB}^{\\circ}$. Найдите внешний угол при вершине $B$. Ответ дайте в градусах.`,
            answers: 180 - angleB,
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
//356190 356191 356192 356193 356194 356195 356196 356197 356198 356199 401728 402168 402557 402805 403735 403794 403886 404002 

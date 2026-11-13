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

        // Продолжение стороны AB за вершину B (для внешнего угла) — на 2/3 длины AB
        let [pA, pB] = triangle.vertices;
        let pE = {
            x: pB.x + (pB.x - pA.x) * 2 / 3,
            y: pB.y + (pB.y - pA.y) * 2 / 3,
        };
        // Центрируем всё по габаритам: autoScale масштабирует относительно начала координат,
        // и без этого плоский треугольник (угол B около 180°) прижимался к краю и был мелким
        let figure = triangle.vertices.concat([pE]);
        let xs = figure.map((p) => p.x);
        let ys = figure.map((p) => p.y);
        let shift = {
            x: -(Math.min(...xs) + Math.max(...xs)) / 2,
            y: -(Math.min(...ys) + Math.max(...ys)) / 2,
        };
        let scaled = autoScale(figure.map((p) => ({ x: p.x + shift.x, y: p.y + shift.y })));
        let points = scaled.slice(0, 3);
        let pointExt = scaled[3];
        let letters = om.latbukv.slice(0, 3);

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors.iz();

            ctx.lineWidth = 2;
            ctx.drawFigure(points, triangle.connectionMatrix);

            ctx.drawLine(points[1].x, points[1].y, pointExt.x, pointExt.y);

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

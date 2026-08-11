(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let side = sl(5, 10);

        let triangle = new Triangle({
            lengths: {
                lengthAB: sl(3, 7),
                lengthBC: side,
                lengthCA: side,
            },
        });
        genAssert(!triangle.lengthAB.isAlmostEqual(triangle.lengthBC), 'Основание не должно быть равно боковой стороне');
        let angleC = triangle.angleCInDegrees.ceil();
        genAssert(angleC != 90, 'B - прямой угол');

        let points = autoScale(triangle.vertices);
        let letters = om.latbukv.slice(0, 3);

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors;

            ctx.lineWidth = 2;
            ctx.drawFigure(points, triangle.connectionMatrix);

            ctx.strokeStyle = om.primaryBrandColors.iz();
            ctx.strokeInMiddleOfSegment(points[0].x, points[0].y, points[2].x, points[2].y, 10);
            ctx.strokeInMiddleOfSegment(points[1].x, points[1].y, points[2].x, points[2].y, 10);

            ctx.scale(1, -1);
            ctx.font = "20px liberation_sans";
            points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i < points.length / 2) ? 25 : -5)));
        };

        NAtask.setTask({
            text: `В треугольнике $ABC$ известно, что $AB=BC$, $\\angle ${letters.slice().permuteCyclic(-1).randomReverse().join('')} = ${angleC}^{\\circ}$. 
            Найдите угол $${[letters, letters.slice().permuteCyclic(1)].iz().randomReverse().join('')}$. Ответ дайте в градусах.`,
            answers: (180 - angleC) / 2,
            authors: ['Александра Суматохина'],
        });
        NAtask.modifiers.variativeABC(letters);

        NAtask.modifiers.allDecimalsToStandard(/*true*/);
        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });
    }, 1000);

})();
//348593 348764 349374 349429 349494 349965 350384 350413 351436 352625 352830 353070 401232 401647 401686 401738 402074 402375 402399 403048 403767 403880 404024

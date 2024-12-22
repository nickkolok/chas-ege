(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let letters = latbukv.slice(0, 3);

        let triangle = new Triangle({
            lengths: {
                lengthAB: sl(3, 20),
                lengthBC: sl(3, 20),
            },
            angles: {
                angle: Math.PI / 2,
            },
        });
        genAssert(![triangle.lengthAB, triangle.lengthBC, triangle.lengthCA].hasDubl(),
            'Все стороны треугольника должны быть разными');

        let radius = triangle.radiusOfCircumscribedCircle;
        genAssertZ1000(radius / 100);

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
            ctx.arcBetweenSegments([points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y], 20);

            ctx.scale(1, -1);
            ctx.font = "20px liberation_sans";
            points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i < points.length / 2) ? 25 : -5)));
        };

        NAtask.setTask({
            text: `В треугольнике $ABC$ известно, что 
			${[`$AB=${triangle.lengthAB}$`,
                `$BC=${triangle.lengthBC}$`,
                `угол $B$ равен $90^{\\circ}$`
            ].shuffleJoin(`, `)}. 
			Найдите радиус описанной окружности этого треугольника.`,
            answers: radius,
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
//340384 348615 348837 348945 348999 349061 349073 349084 349225 349434 349485 349522 349534 349686 349840 350189 350222 350449 350484 350778 350800 350837 351003 351161 351381 351955 352726 353141 353161 353310 392930 401727 402228 402647 402656 402789 402897 403013 404076 404087

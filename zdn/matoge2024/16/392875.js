(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let letters = latbukv.slice(0, 4).concat(``);
        let radius = sl(1, 20);

        let circle = new Circle(new Point(0, 0), radius);
        let pointA = new Point(-radius - sl(3, 7), sl(radius).pm());
        let pointC = new Point(radius + sl(3, 7), sl(radius).pm());

        let tan1 = circle.tangentsFromPoint(pointA, { segmentLength: radius * 3 });
        let tan2 = circle.tangentsFromPoint(pointC, { segmentLength: radius * 3 });

        let pointIntersect1 = tan1[1][1].intersect(tan2[0][1]);
        genAssertNonempty(pointIntersect1);

        let pointIntersect2 = tan1[0][1].intersect(tan2[1][1]);
        genAssertNonempty(pointIntersect2);

        let AB = new Segment(pointA, pointIntersect1[0]).length.ceil();
        let AD = new Segment(pointA, pointIntersect2[0]).length.ceil();
        let BC = new Segment(pointC, pointIntersect1[0]).length.ceil();
        let CD = AD + BC - AB;

        let connectionMatrix = [
            [1],
            [0, 1],
            [1, 0, 1],
        ];

        let points = autoScale([pointA.vertices[0], pointIntersect1[0], pointC.vertices[0], pointIntersect2[0], tan1[0][0]]);

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors;

            ctx.lineWidth = 2;
            ctx.drawFigure(points, connectionMatrix);

            let rad = new Point(0, 0).distanceTo(new Point(points[4].x, points[4].y))[0];
            ctx.drawArc(0, 0, rad, 0, 2 * Math.PI);
            ctx.strokeStyle = om.primaryBrandColors[1];

            ctx.scale(1, -1);
            ctx.font = "20px liberation_sans";
            points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i != 1) ? 25 : -5)));
        };

        NAtask.setTask({
            text: `Четырёхугольник $ABCD$ описан около окружности, $${[`AB=${AB}`, `BC=${BC}`, `AD=${AD}`].shuffleJoin(`$, $`)}$. Найдите $CD$.`,
            answers: CD,
            authors: ['Александра Суматохина'],
        });
        NAtask.modifiers.variativeABC(letters);
        NAtask.modifiers.allDecimalsToStandard(true);
        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });
    }, 1000);

})();
// https://oge.sdamgia.ru/problem?id=392875

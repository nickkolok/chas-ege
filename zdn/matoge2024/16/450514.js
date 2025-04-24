(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let rand = sl1();
        let delta = [90, 240][rand];

        let letters = latbukv.slice(0, 3).concat(``);

        let circle = new Circle(new Point(0, 0), sl(10,50));

		let A = sl(-90, 0);
        let AB = circle.chordByAngles(A, (A+delta)%360,{
            angleInDegrees: true
        });

        let PC = circle.pointOnCircle(sl(A+delta+30, 250)%360, {
            angleInDegrees: true
        });

        let connectionMatrix = [
            [1],
            [1, 1],
        ];
        
        let p = circle.pointOnCircle(90, {
            angleInDegrees: true
        });

        let points = autoScale([AB.ps, AB.pe, PC.vertices[0], p.vertices[0]]);

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors;

            ctx.lineWidth = 2;
            ctx.drawFigure(points, connectionMatrix);
            ctx.drawArc(0, 0, new Point(0, 0).distanceTo(new Point(points[2].x, points[2].y))[0], 0, 2 * Math.PI);

            ctx.scale(1, -1);
            ctx.font = "20px liberation_sans";
            points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i < 2) ? 25 : -5)));
        };

        NAtask.setTask({
            text: `В треугольнике $ABC$ угол $C$ равен $${[45,120][rand]}^\\circ$, $AB =${AB.length.pow(2).texsqrt(1)}$. Найдите радиус окружности, описанной около этого треугольника.`,
            answers: circle.r,
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
// https://oge.sdamgia.ru/problem?id=450514
// https://ege.sdamgia.ru/problem?id=541815

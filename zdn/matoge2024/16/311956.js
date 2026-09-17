(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let letters = latbukv.slice(0, 3).concat(`O`);

        let circle = new Circle(new Point(0, 0), 160);

        let a = sl(0, 100);
        let b = sl(300, 350);
        let PA = circle.pointOnCircle(a, {
            angleInDegrees: true
        });

        let PB = circle.pointOnCircle(b, {
            angleInDegrees: true
        });


        let PC = circle.pointOnCircle(sl((a + b) / 2 + 50, (a + b) / 2 - 50), {
            angleInDegrees: true
        });

        let angle = (a - b).abs();
        angle = [360 - angle, angle].minE();

        let connectionMatrix = [
            [1],
            [1, 1],
            [1, 1]
        ];

        let points = [PA.vertices[0], PB.vertices[0], PC.vertices[0], circle.pc];

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors;

            ctx.lineWidth = 2;
            ctx.drawFigure(points, connectionMatrix);
            ctx.drawArc(0, 0, 160, 0, 2 * Math.PI);

            ctx.scale(1, -1);
            ctx.font = "20px liberation_sans";
            points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i != 2) ? 25 : -5)));
        };

        NAtask.setTask({
            text: `Треугольник $ABC$ вписан в окружность с центром в точке $O$. 
			Точки $O$ и $C$ лежат в одной полуплоскости относительно прямой $AB$. 
			Найдите угол $ACB$, если угол $AOB$ равен $${angle}^\\circ$. Ответ дайте в градусах.`,
            answers: angle / 2,
            authors: ['Александра Суматохина'],
        });
        NAtask.modifiers.variativeABC(letters);
        NAtask.modifiers.allDecimalsToStandard(true);
        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });
    }, 20000);

})();
// https://oge.sdamgia.ru/test?likes=311956

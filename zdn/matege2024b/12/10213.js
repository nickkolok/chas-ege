(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let letters = latbukv.slice(0, 3).concat(`O`);
        let radius = sl(120, 165);

        let circle = new Circle(new Point(0, 0), radius);
        let pointC = new Point((180).pm(), sl(radius).pm());

        let tan = circle.tangentsFromPoint(pointC, { segmentLength: 250 });
        let angle = new Angle(tan[0][0], pointC.vertices[0], tan[1][0], circle.pc).angleInDegrees.ceil();

        let connectionMatrix = [
            [1],
            [0, 1],
            [1, 0, 1],
        ];

        let points = [tan[0][0], pointC.vertices[0], tan[1][0], circle.pc];

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors;

            ctx.lineWidth = 2;
            ctx.drawFigure(points, connectionMatrix);
            ctx.drawArc(0, 0, radius, 0, 2 * Math.PI);
            ctx.drawLine(points[0].x, points[0].y, tan[0][1].ps.x, tan[0][1].ps.y);
            ctx.drawLine(points[2].x, points[2].y, tan[1][1].ps.x, tan[1][1].ps.y);

            ctx.strokeStyle = om.primaryBrandColors[1];

            ctx.scale(1, -1);
            ctx.font = "20px liberation_sans";
            points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i != 2) ? 25 : -5)));
        };

        NAtask.setTask({
            text: `В угол $B$, равный $${angle}^\\circ$, вписана окружность с центром $O$, которая касается сторон угла в точках $A$ и $C$. Найдите угол $AOC$. Ответ дайте в градусах.`,
            answers: 180 - angle,
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
// https://base.mathege.ru/clones/?position=16&parent=10213

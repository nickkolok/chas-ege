(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let letters = latbukv.slice(0, 3).concat('O');

        let circle = new Circle(new Point(0, 0), 160);

        // Центральный угол AOB генерируется напрямую: в ФИПИ он от 27° до 173°.
        // Хорда AB — внизу, C — в верхней части окружности, как на чертеже ФИПИ:
        // не дальше 60° от верхней точки и не ближе 25° к A и B, поэтому C на большей дуге,
        // а O и C лежат по одну сторону от прямой AB
        let angle = sl(10, 175);
        let mid = sl(240, 300);
        let PA = circle.pointOnCircle(mid - angle / 2, {
            angleInDegrees: true
        });

        let PB = circle.pointOnCircle(mid + angle / 2, {
            angleInDegrees: true
        });

        let maxShiftC = Math.min(60, 180 - angle / 2 - 25);
        let PC = circle.pointOnCircle(mid + 180 + sl(-maxShiftC, maxShiftC), {
            angleInDegrees: true
        });

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
            ctx.strokeStyle = om.secondaryBrandColors.iz();

            ctx.lineWidth = 2;
            ctx.drawFigure(points, connectionMatrix);
            circle.drawOnto(ctx);

            ctx.scale(1, -1);
            ctx.font = "20px liberation_sans";
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            // Вершины — снаружи окружности, на продолжении радиуса
            points.slice(0, 3).forEach((elem, i) => ctx.fillText(letters[i], elem.x * 1.1, -elem.y * 1.1));
            // Центр — с той стороны от O, где подпись дальше всего от отрезков чертежа
            let distanceToSegment = (p, p1, p2) => {
                let dx = p2.x - p1.x;
                let dy = p2.y - p1.y;
                let t = Math.min(1, Math.max(0, ((p.x - p1.x) * dx + (p.y - p1.y) * dy) / (dx * dx + dy * dy)));
                return Math.hypot(p.x - p1.x - t * dx, p.y - p1.y - t * dy);
            };
            let segments = [[0, 1], [0, 2], [1, 2], [0, 3], [1, 3]].map(([i, j]) => [points[i], points[j]]);
            let labelPosition = [...Array(12).keys()]
                .map(k => ({ x: 20 * Math.cos(k * Math.PI / 6), y: 20 * Math.sin(k * Math.PI / 6) }))
                .map(p => ({ p, gap: segments.map(([p1, p2]) => distanceToSegment(p, p1, p2)).minE() }))
                .sort((l1, l2) => l2.gap - l1.gap)[0].p;
            ctx.fillText(letters[3], labelPosition.x, -labelPosition.y);
        };

        NAtask.setTask({
            text: `Треугольник $ABC$ вписан в окружность с центром в точке $O$. Точки $O$ и $C$ лежат в одной полуплоскости относительно прямой $AB$. Найдите угол $ACB$, если угол $AOB$ равен $${angle}^\\circ$. Ответ дайте в градусах.`,
            answers: angle / 2,
            authors: ['Александра Суматохина'],
        });
        NAtask.modifiers.variativeABC(letters);
        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });
        NAtask.modifiers.allDecimalsToStandard(true);
    }, 20000);

})();
// https://oge.sdamgia.ru/test?likes=311956

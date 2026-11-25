(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let letters = latbukv.slice(0, 3).concat('O');

        let circle = new Circle(new Point(0, 0), 160);

        // Центральный угол AOB генерируется напрямую: в ФИПИ он от 27° до 173°, здесь расширен до 10°–175°.
        // Хорда AB — внизу, C — в верхней части окружности, как на чертеже ФИПИ:
        // не дальше 60° от верхней точки и не ближе 25° к A и B, поэтому C на большей дуге,
        // а O и C лежат по одну сторону от прямой AB.
        let angle = sl(10, 175);
        let mid = sl(240, 300);
        let PA = circle.pointOnCircle(mid - angle / 2, {
            angleInDegrees: true
        });

        let PB = circle.pointOnCircle(mid + angle / 2, {
            angleInDegrees: true
        });

        let maxShiftC = 60;
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
            ctx.translateToCenter();

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors.iz();

            ctx.lineWidth = 2;
            ctx.drawFigure(points, connectionMatrix);
            circle.drawOnto(ctx);

            ctx.scale(1, -1);
            ctx.font = '20px liberation_sans';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            // Вершины — снаружи окружности, на продолжении радиуса
            points.slice(0, 3).forEach((elem, i) => {
                let label = labelPositionAwayFrom(elem, circle.pc, 16);
                ctx.fillText(letters[i], label.x, -label.y);
            });
            // Центр — с той стороны от O, где подпись дальше всего от отрезков чертежа
            let segments = segmentsFromConnectionMatrix(points, connectionMatrix);
            let labelPosition = labelPositionAwayFromSegments(circle.pc, segments, 20);
            ctx.fillText(letters[3], labelPosition.x, -labelPosition.y);
        };

        NAtask.setTask({
            text: `Треугольник $ABC$ вписан в окружность с центром в точке $O$. Точки $O$ и $C$ лежат в одной полуплоскости относительно прямой $AB$. Найдите угол $ACB$, если угол $AOB$ равен $${angle}^\\circ$. Ответ дайте в градусах.`,
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
// ФИПИ 0B92BF 20B8B4 074CAF 3A4AAE 7533C8 DE7F8E 473A79 9DA99C D00D8E 24D584

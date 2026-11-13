(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let letters = om.latbukv.slice(0, 3);

        let circle = new Circle(new Point(0, 0), 160);

        let PA = circle.pointOnCircle(180, {
            angleInDegrees: true
        });

        let PB = circle.pointOnCircle(0, {
            angleInDegrees: true
        });

        let angleC = sl(16, 164);
        let PC = circle.pointOnCircle(angleC, {
            angleInDegrees: true
        });

        let connectionMatrix = [
            [1],
            [1, 1],
        ];

        let points = [PA.vertices[0], PB.vertices[0], PC.vertices[0]];

        let paint = function (ctx) {
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors.iz();

            ctx.lineWidth = 2;
            ctx.drawFigure(points, connectionMatrix);
            circle.drawOnto(ctx);

            // Центр окружности, как на чертеже ФИПИ
            let textColor = ctx.fillStyle;
            ctx.fillStyle = om.secondaryBrandColors.iz();
            ctx.beginPath();
            ctx.arc(circle.pc.x, circle.pc.y, 4, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = textColor;

            ctx.scale(1, -1);
            ctx.font = "20px liberation_sans";
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            // Подпись — снаружи окружности, на продолжении радиуса
            const labelDistance = 30;
            points.forEach((elem, i) => {
                const labelPos = labelPositionAwayFrom(elem, circle.pc, labelDistance);
                ctx.fillText(letters[i], labelPos.x, -labelPos.y);
            });
        };

        NAtask.setTask({
            text: `Центр окружности, описанной около треугольника $ABC$, лежит на стороне $AB$. Найдите угол $ABC$, если угол $BAC$ равен $${angleC / 2}^\\circ$. Ответ дайте в градусах.`,
            answers: 90 - angleC / 2,
            authors: ['Александра Суматохина'],
        });
        NAtask.modifiers.variativeABC(letters);
        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint,
        });
        NAtask.modifiers.allDecimalsToStandard(true);
    }, 1000);

})();
// https://math-oge.sdamgia.ru/problem?id=348379

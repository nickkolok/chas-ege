(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let letters = ['m', 'n'];
        let radius = 160;

        let angleA = sl(91, 120);
        let angleB = sl(60, angleA - 20);

        let connectionMatrix = [[0], [0], [0], [1, 1, 1, 1], [0], [0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 1], [0, 0, 0, 0, 1]];

        let points = [
            { x: -radius, y: 0.75 * radius },
            { x: radius, y: 0.75 * radius },
            calculateEndpointLineAtAngle(0, 0.75 * radius, -angleA * Math.PI / 180, 2 * radius),
            calculateEndpointLineAtAngle(0, 0.75 * radius, -angleB * Math.PI / 180, 2 * radius),
            { x: 0, y: 0.75 * radius },   //M
            { x: -radius, y: -0.75 * radius },
            { x: radius, y: -0.75 * radius },
            calculateEndpointLineAtAngle(0, 0.75 * radius, -angleA * Math.PI / 180 + Math.PI, 2 * radius),
            calculateEndpointLineAtAngle(0, 0.75 * radius, -angleB * Math.PI / 180 + Math.PI, 2 * radius),
        ];

        let pointTwo = [points[5], points[6], points[3], points[4]].mt_coordinatesOfIntersectionOfTwoSegments();
        let pointThree = calculateEndpointLineAtAngle(0, 0.75 * radius, ((-angleB - (angleA - angleB) / 2) * Math.PI) / 180, 40);

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors;

            ctx.lineWidth = 2;
            ctx.drawFigure(points, connectionMatrix);

            ctx.scale(1, -1);
            ctx.font = "20px liberation_sans";
            [points[0], points[5]].forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y - 15));

            ctx.fillText(1, points[4].x + 15, -points[4].y - 7);
            ctx.fillText(2, pointTwo.x - 25, -pointTwo.y - 7);
            ctx.fillText(3, pointThree.x - 5, -pointThree.y);
        };

        NAtask.setTask({
            text: `Прямые m и n параллельны (см. рисунок). Найдите величину угла $3$, если $\\angle 1= ${180 - angleA}^\\circ$, $\\angle 2= ${angleB}^\\circ$ . Ответ дайте в градусах.`,
            answers: angleA - angleB,
            authors: ['Александра Суматохина'],
        });

        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });
    }, 2000);
    NAtask.modifiers.allDecimalsToStandard(true);
})();
// https://base.mathege.ru/clones/?position=16&parent=10717

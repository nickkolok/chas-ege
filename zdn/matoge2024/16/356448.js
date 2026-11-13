(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let key = '356448';
        let preference = ['angleB', 'angleC']; // какой угол требуется найти
        let rand = getSelectedPreferenceFromList(key, preference);

        let letters = om.latbukv.slice(0, 4);

        let circle = new Circle(new Point(0, 0), 170);

        // Равнобедренная трапеция строится по дугам (в градусах):
        // боковые стороны AB и CD стягивают равные дуги arcLeg, основание BC — дугу arcBC,
        // тогда AD || BC, а вписанный угол A равен половине дуги BCD = arcBC + arcLeg.
        // Каждая дуга не меньше minArc, чтобы вершины не сливались;
        // угол A не берётся из окрестности 90°, где трапеция вырождается в прямоугольник
        // (при 90° ровно, т. е. arcBCD = 180°, основания равны).
        let minArc = 25;
        let arcBCD = slKrome((x) => (x - 180).abs() < 10, 60, 300);
        let arcLeg = sl(minArc, Math.min(arcBCD - minArc, 360 - arcBCD - minArc));
        let arcBC = arcBCD - arcLeg;

        let phiA = sl(0, 359);
        let phiB = phiA + arcLeg;
        let phiC = phiB + arcBC;
        let phiD = phiC + arcLeg;

        let AB = circle.chordByAngles(phiA, phiB, {
            angleInDegrees: true
        });

        let CD = circle.chordByAngles(phiC, phiD, {
            angleInDegrees: true
        });

        let angleA = arcBCD / 2;

        let connectionMatrix = [
            [1],
            [0, 1],
            [1, 0, 1],
        ];

        let points = [AB.ps, AB.pe, CD.ps, CD.pe];

        let paint = function (ctx) {
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
            // Подпись — снаружи окружности, на продолжении радиуса
            const labelDistance = 25;
            points.forEach((elem, i) => {
                const labelPos = labelPositionAwayFrom(elem, circle.pc, labelDistance);
                ctx.fillText(letters[i], labelPos.x, -labelPos.y);
            });
        };

        NAtask.setTask({
            text: `Угол $A$ трапеции $ABCD$ с основаниями $AD$ и $BC$, вписанной в окружность, равен $${angleA}^\\circ$. Найдите угол $${['B', 'C'][rand]}$ этой трапеции. Ответ дайте в градусах.`,
            answers: 180 - angleA,
            authors: ['Александра Суматохина'],
            preference: preference,
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
// https://math-oge.sdamgia.ru/problem?id=356448

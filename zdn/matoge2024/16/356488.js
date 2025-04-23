(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let key = '356518';
        let preference = ['radius', 'side'];
        let rand = getListedPreference(key, preference.map((pref, index) => ({
            preference: pref,
            preferenceValue: index
        })), sl(preference.length - 1));

        let circle = new Circle(new Point(0, 0), sl(1, 20) * [1, (3).sqrt()][rand]);

        let AB = circle.chordByAngles(90, 210, {
            angleInDegrees: true
        });

        let C = circle.pointOnCircle(330, {
            angleInDegrees: true
        });

        let connectionMatrix = [
            [1],
            [1, 1],
        ];

        let points = autoScale([AB.ps, AB.pe, C]);

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors;

            ctx.lineWidth = 2;
            ctx.drawFigure(points, connectionMatrix);
            ctx.drawArc(0, 0, new Point(0, 0).distanceTo(new Point(points[0].x, points[0].y))[0], 0, 2 * Math.PI);
        };

        NAtask.setTask({
            text: ``,
            questions: [
                [{
                    text: `Сторона равностороннего треугольника равна $${AB.length.pow(2).texsqrt(1)}$. Найдите радиус окружности, описанной около этого треугольника.`,
                    answers: circle.r
                }, {
                    text: `Радиус окружности, описанной около равностороннего треугольника, равен $${circle.r.pow(2).texsqrt(1)}$. Найдите длину стороны этого треугольника.`,
                    answers: AB.length
                }][rand]
            ],
            authors: ['Александра Суматохина'],
        });
        NAtask.modifiers.allDecimalsToStandard(true);
        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });
    }, 1000);

})();
// https://oge.sdamgia.ru/test?likes=356488
// https://oge.sdamgia.ru/problem?id=356533

(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let key = '356518';
        let preference = ['side', 'radius'];
        let rand = getListedPreference(key, preference.map((pref, index) => ({
            preference: pref,
            preferenceValue: index
        })), sl(preference.length - 1));

        let a = sl(1, 50) * [1, (3).sqrt()][rand];

        let triangle = new Triangle({
            lengths: {
                lengthAB: a,
                lengthBC: a,
                lengthCA: a,
            },
            supplementary: {
                calculateBisectors: true,
            }
        });
        if (!rand) {
            genAssertZ1000(triangle.radiusOfInscribedCircle.pow(2));
        }

        let intersectPoint = triangle.bisectorA.intersect(triangle.bisectorB);

        let points = autoScale(triangle.vertices.concat(intersectPoint));

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors;

            ctx.lineWidth = 2;
            ctx.drawFigure(points, triangle.connectionMatrix);
            ctx.drawArc(points[3].x, points[3].y, (points[3].y - points[0].y).abs(), 0, 2 * Math.PI);
        };

        NAtask.setTask({
            text: ``,

            questions: [
                [{
                    text: `Радиус окружности, вписанной в равносторонний треугольник, равен $${triangle.radiusOfInscribedCircle.pow(2).texsqrtfrac(1)}$. Найдите длину стороны этого треугольника.`,
                    answers: a,
                }, {
                    text: `Сторона равностороннего треугольника равна $${a.pow(2).texsqrt(1)}$. Найдите радиус окружности, вписанной в этот треугольник.`,
                    answers: triangle.radiusOfInscribedCircle,
                }][rand]
            ],
            authors: ['Александра Суматохина'],
            preference
        });

        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });
    }, 2000);
    NAtask.modifiers.allDecimalsToStandard(true);
})();
// https://oge.sdamgia.ru/problem?id=356518
// https://ege.sdamgia.ru/test?likes=27909

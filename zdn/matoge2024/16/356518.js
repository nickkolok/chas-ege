(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);

        let key = '356518';
        let preference = ['side', 'radius', 'distance'];
        let rand = getSelectedPreferenceFromList(key, preference);

        // distance: сторона целая, как в ФИПИ (от 1 до 30)
        let sqrt3 = (3).sqrt();
        let a = rand == 2 ? sl(1, 30) : (rand == 0 ? sl(3, 48, 3) : sl(sqrt3, 50 * sqrt3, sqrt3));

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

        let intersectPoint = triangle.bisectorIntersectionPoint;

        // distance: на чертеже описанная окружность, она должна поместиться целиком
        let circumscribedCircleBounds = [];
        if (rand == 2) {
            let center = intersectPoint;
            let R = triangle.radiusOfCircumscribedCircle;
            circumscribedCircleBounds = [[R, 0], [-R, 0], [0, R], [0, -R]].map(([dx, dy]) => new Point(center.x + dx, center.y + dy));
        }

        // При стороне 1 фигура упиралась бы в maxScale = 100 по умолчанию и выходила крошечной
        let points = autoScale(triangle.vertices.concat(intersectPoint, circumscribedCircleBounds), undefined, [], {
            maxScale: rand == 2 ? 400 : 100,
        });

        let paint1 = function (ctx) {

            ctx.translateToCenter();

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors.iz();

            ctx.lineWidth = 2;
            ctx.drawFigure(points, triangle.connectionMatrix);
            if (rand == 2) {
                // Как на чертеже ФИПИ: описанная окружность, центр O и перпендикуляр из O к стороне AB
                let foot = { x: (points[0].x + points[1].x) / 2, y: (points[0].y + points[1].y) / 2 };
                new Circle(new Point(points[3].x, points[3].y), Math.hypot(points[0].x - points[3].x, points[0].y - points[3].y)).drawOnto(ctx);
                ctx.drawLine(points[3].x, points[3].y, foot.x, foot.y);
                ctx.arcBetweenSegments([points[3].x, points[3].y, foot.x, foot.y, points[1].x, points[1].y], 10, true);
                ctx.fillStyle = om.secondaryBrandColors.iz();
                ctx.beginPath();
                ctx.arc(points[3].x, points[3].y, 3, 0, 2 * Math.PI);
                ctx.fill();
                ctx.scale(1, -1);
                ctx.font = '20px liberation_sans';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('O', points[3].x, -points[3].y - 18);
            } else {
                let inradiusOnCanvas = (points[3].y - points[0].y).abs(); // AB горизонтальна.
                new Circle(new Point(points[3].x, points[3].y), inradiusOnCanvas).drawOnto(ctx);
            }
        };

        // distance: расстояние от центра до стороны a·√3/6 — несократимая дробь с √3 в числителе
        let distanceTex = function () {
            // nod — библиотечный НОД (lib/number.js).
            let numerator = a / a.nod(6);
            let denominator = 6 / a.nod(6);
            let tex = (numerator == 1 ? '' : numerator) + '\\sqrt{3}';
            return denominator == 1 ? tex : '\\frac{' + tex + '}{' + denominator + '}';
        };

        NAtask.setTask({
            text: ``,

            // Текст строится только для выбранного варианта: иначе ошибка в тексте
            // другого варианта отбраковывает и выбранный
            questions: [
                [() => ({
                    text: `Радиус окружности, вписанной в равносторонний треугольник, равен $${distanceTex()}$. Найдите длину стороны этого треугольника.`,
                    answers: a,
                }), () => ({
                    text: `Сторона равностороннего треугольника равна $${a.pow(2).round().texsqrt(1)}$. Найдите радиус окружности, вписанной в этот треугольник.`,
                    answers: triangle.radiusOfInscribedCircle,
                }), () => ({
                    text: `В окружность с центром в точке $O$ вписан равносторонний треугольник. Расстояние от точки $O$ до сторон треугольника равно $${distanceTex()}$. Найдите сторону треугольника.`,
                    answers: a,
                })][rand]()
            ],
            authors: ['Александра Суматохина'],
            preference
        });

        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });
        NAtask.modifiers.allDecimalsToStandard(true);
    }, 2000);
})();
// https://oge.sdamgia.ru/problem?id=356518
// https://ege.sdamgia.ru/test?likes=27909
// ФИПИ (distance): 7EA942, B37007, D51D7A, 139758, 7991E8, F58589, 40FA58, 13AAC3, CB2F35, 95A838


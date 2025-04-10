(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let side = sl(5, 10);
        let letters = latbukv.slice(0, 3).concat('M');

        let key = "10116";
        let preference = ['side', 'median'];

        let rand = getListedPreference(key, preference.map((pref, index) => ({
            preference: pref,
            preferenceValue: index
        })), sl(preference.length - 1));

        let triangle = new Triangle({
            lengths: {
                lengthAB: side * (3).sqrt(),
                lengthBC: side,
                lengthCA: side,
            },
            supplementary: {
                calculateHeights: true,
            }
        });

        triangle.addVertexToConnectionMatrix(triangle.heightCEndPoint, 'C');

        let points = autoScale(triangle.vertices);

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors;

            ctx.lineWidth = 2;
            ctx.drawFigure(points, triangle.connectionMatrix);

            ctx.drawLine(points[1].x, points[1].y, 160, points[1].y);

            ctx.strokeStyle = om.primaryBrandColors.iz();
            ctx.arcBetweenSegments([points[2].x, points[2].y, points[1].x, points[1].y, 160, points[1].y], 15);

            ctx.arcBetweenSegments([points[0].x, points[0].y, points[3].x, points[3].y, points[2].x, points[2].y], 15);

            ctx.scale(1, -1);
            ctx.font = "20px liberation_sans";
            points.forEach((elem, i) => ctx.fillText(letters[i], elem.x, -elem.y + ((i != 2) ? 25 : -5)));
        };

        NAtask.setTask({
            text: ``,
            questions: [[{
                text: `В равнобедренном треугольнике $ABC$ внешний угол при основании равен $150^\\circ$, а
					медиана $CM$, проведённая к основанию, равна $${triangle.heightCLength}$. 
					Найдите боковую сторону треугольника $ABC$.`,
                answers: triangle.lengthCA,
            }, {
                text: `В треугольнике $ABC$ известно, что $AC=BC=${triangle.lengthCA}$, внешний угол при вершине $B$ равен $150^\\circ$. Найдите длину медианы $CM$.`,
                answers: triangle.heightCLength,
            }
            ][rand]],
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
// https://base.mathege.ru/clones/?position=16&parent=10116
// https://base.mathege.ru/clones?position=&parent=10117

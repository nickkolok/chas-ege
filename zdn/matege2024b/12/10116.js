(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let letters = latbukv.slice(0, 3).concat('M');

        let key = "10116";
        let preference = ['side', 'median'];

        let rand = getSelectedPreferenceFromList(key, preference);

        // Как в ФИПИ: в задаче на боковую сторону дана медиана — целая, от 16 до 77;
        // в задаче на медиану дана боковая сторона — чётная, от 14 до 44, и медиана тоже целая
        let side = (rand == 0) ? sl(20, 160, 2) : sl(10, 50, 2);

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

            ctx.translateToCenter();

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors.iz();

            ctx.lineWidth = 2;
            ctx.drawFigure(points, triangle.connectionMatrix);

            let rayEnd = ctx.drawLineAtAngle(points[1].x, points[1].y, 0, 35);

            ctx.strokeStyle = om.primaryBrandColors.iz();
            ctx.arcBetweenSegments([points[2].x, points[2].y, points[1].x, points[1].y, rayEnd.x, rayEnd.y], 15);

            ctx.arcBetweenSegments([points[0].x, points[0].y, points[3].x, points[3].y, points[2].x, points[2].y], 15);

            ctx.signVertices(points, letters, {above: [2]});
        };

        NAtask.setTask({
            text: ``,
            questions: [[{
                text: `В равнобедренном треугольнике $ABC$ внешний угол при основании равен $150^\\circ$, а медиана $CM$, проведённая к основанию, равна $${triangle.heightCLength}$. Найдите боковую сторону треугольника $ABC$.`,
                answers: triangle.lengthCA,
            }, {
                text: `В треугольнике $ABC$ известно, что $AC=BC=${triangle.lengthCA}$, внешний угол при вершине $B$ равен $150^\\circ$. Найдите длину медианы $CM$.`,
                answers: triangle.heightCLength,
            }
            ][rand]],
            preference: [preference],
            authors: ['Александра Суматохина'],
        });
        NAtask.modifiers.variativeABC(letters);

        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });
        NAtask.modifiers.allDecimalsToStandard(true);
    }, 1000);

})();
// https://base.mathege.ru/clones/?position=16&parent=10116
// https://base.mathege.ru/clones?position=&parent=10117
// ФИПИ 24534B 105A0B B4517A 011FB3 E3EDBF C89011 432329 F167DA 1C9156 CD1157 F48AAE B58BA3 81FDAD 129492 AE6B96 0F23E9 246631 9ABE30 7BE18B E58283 DF2A9F A79932 D80986 52D70F FC9CC3

(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let key = '356399';
        let preference = ['radius', 'area', 'diagonal'];

        let rand = getSelectedPreferenceFromList(key, preference);

        let square = new Square({
            length: sl(5, 50) * (rand === 2 ? 2 * (2).sqrt() : 1),
            supplementary: {
                calculateDiagonals: true,
            }
        });

        if (rand === 2) {
            square.connectVerticesInConnectionMatrix([
                [[0, 2], [1, 3]].iz(),
            ]);
        }

        let radius = square.inscribedCircle().r;

        let vertex = autoScale(square.vertices);

        let paint1 = function (ctx) {

            ctx.translateToCenter();

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors.iz();

            ctx.lineWidth = 2;
            ctx.drawFigure(vertex, square.connectionMatrix);
            let circle = square.inscribedCircle();
            let scale = Math.abs((vertex[1].x - vertex[0].x) / (square.pointB.x - square.pointA.x));
            circle.scale(scale, scale).drawOnto(ctx);

        };

        NAtask.setTask({
            text: ``,
            questions:[[{
                text:`Сторона квадрата равна $${square.lengthAB}$. Найдите радиус окружности, вписанной в этот квадрат.`,
                answers:radius,
            },{
                text:`Найдите площадь квадрата, описанного около окружности радиуса $${radius}$.`,
                answers:square.area(),
            },{
                text:`Радиус вписанной в квадрат окружности равен $${radius.pow(2).round().texsqrt(1)}$. Найдите диагональ этого квадрата.`,
                answers:square.lengthDiagonalAC,
            }][rand]],
            authors: ['Александра Суматохина'],
            preference,
        });
        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });

        NAtask.modifiers.allDecimalsToStandard(true);

    }, 2000);
})();
// https://oge.sdamgia.ru/problem?id=356399
// https://oge.sdamgia.ru/problem?id=353229
// https://oge.sdamgia.ru/problem?id=356369


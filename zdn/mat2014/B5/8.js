(function () {
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let key = '8';
        let preference = ['area', 'diagonal'];

        let rand = getListedPreference(key, preference.map((pref, index) => ({
            preference: pref,
            preferenceValue: index
        })), sl(preference.length - 1));

        let question = ['площадь', 'диагональ'];

        let square = new Square({
            length: sl(5, 50),
            supplementary: {
                calculateDiagonals: true,
            }
        });
        square.connectVerticesInConnectionMatrix([
            [[0, 2], [1, 3]].iz(),
        ]);

        let vertex = autoScale(square.vertices);

        let paint1 = function (ctx) {
            let h = 400;
            let w = 400;

            ctx.translate(w / 2, h / 2);

            ctx.scale(1, -1);
            ctx.strokeStyle = om.secondaryBrandColors;

            ctx.lineWidth = 2;
            ctx.drawFigure(vertex, square.connectionMatrix);

        };

        NAtask.setTask({
            text: question[rand].toZagl() + ' квадрата равна $' + [square.area(), square.lengthDiagonalAC.pow(2).texsqrt(1)][rand] + '$. Найдите его ' + question[1 - rand] + '.',
            answers: [square.area(), square.lengthDiagonalAC][1 - rand],
            authors: ['Александра Суматохина'],
            preference,
        });
        NAtask.modifiers.allDecimalsToStandard();
        NAtask.modifiers.multiplyAnswerBySqrt(13);

        NAtask.modifiers.addCanvasIllustration({
            width: 400,
            height: 400,
            paint: paint1,
        });

    }, 2000);
})();
// https://oge.sdamgia.ru/test?likes=356728
